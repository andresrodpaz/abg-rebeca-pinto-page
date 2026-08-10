import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { appointments, availableSlots } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { site } from '@/lib/site'
import { initAppTables } from '@/lib/db/init'

const BANK_DETAILS = `Titular: Rebeca Andreina Pinto Camacho
IBAN: ES46 2100 2202 6002 0055 8272 (Caixabank)
Concepto: Consulta + nombre completo
Importe: 50 €

Bizum: 687 20 24 99`

export async function POST(request: NextRequest) {
  try {
    await initAppTables()
    const body = await request.json()
    const { slotId, slotDate, slotTime, clientName, clientEmail, clientPhone, migratorySituation, message } = body

    if ((!slotId && (!slotDate || !slotTime)) || !clientName || !clientEmail || !clientPhone || !migratorySituation) {
      return NextResponse.json({ error: 'Faltan datos obligatorios para agendar la cita.' }, { status: 400 })
    }

    let actualSlot: { id: number; date: string; time: string; isBooked: boolean } | undefined

    // 1. Try finding slot in DB by DB ID if slotId < 900000
    if (slotId && typeof slotId === 'number' && slotId < 900000) {
      try {
        const [found] = await db
          .select()
          .from(availableSlots)
          .where(eq(availableSlots.id, slotId))
        actualSlot = found
      } catch (dbErr) {
        console.error('[citas] Error querying slot by ID:', dbErr)
      }
    }

    // 2. Try by date + time
    const targetDate = slotDate || body.date
    const targetTime = slotTime || body.time

    if (!actualSlot && targetDate && targetTime) {
      try {
        const [found] = await db
          .select()
          .from(availableSlots)
          .where(and(eq(availableSlots.date, targetDate), eq(availableSlots.time, targetTime)))
        actualSlot = found
      } catch (dbErr) {
        console.error('[citas] Error querying slot by date/time:', dbErr)
      }
    }

    // 3. If slot exists in DB and is booked, reject
    if (actualSlot && actualSlot.isBooked) {
      return NextResponse.json({ error: 'Este horario ya ha sido reservado. Por favor, elige otro.' }, { status: 409 })
    }

    let finalSlotId: number

    if (actualSlot) {
      finalSlotId = actualSlot.id
      try {
        await db
          .update(availableSlots)
          .set({ isBooked: true })
          .where(eq(availableSlots.id, actualSlot.id))
      } catch (dbErr) {
        console.error('[citas] Error marking slot as booked:', dbErr)
      }
    } else {
      // Create new slot record in DB for synthetic/dynamically generated slot
      if (!targetDate || !targetTime) {
        return NextResponse.json({ error: 'No se pudo identificar la fecha u hora de la cita' }, { status: 400 })
      }
      try {
        const [insertedSlot] = await db
          .insert(availableSlots)
          .values({
            date: targetDate,
            time: targetTime,
            isBooked: true,
          })
          .returning()
        actualSlot = insertedSlot
        finalSlotId = insertedSlot.id
      } catch (dbErr) {
        console.error('[citas] Error inserting new slot:', dbErr)
        actualSlot = { id: 999999, date: targetDate, time: targetTime, isBooked: true }
        finalSlotId = 999999
      }
    }

    // Create appointment record in DB
    let appointmentId = Date.now()
    try {
      const [appointment] = await db
        .insert(appointments)
        .values({
          slotId: finalSlotId,
          clientName,
          clientEmail,
          clientPhone,
          migratorySituation,
          message: message || '',
          status: 'pending',
        })
        .returning()
      if (appointment) {
        appointmentId = appointment.id
        console.log(`[citas] SUCCESS: Cita creada en base de datos. ID: ${appointmentId}, Cliente: ${clientName}, Fecha: ${actualSlot?.date} a las ${actualSlot?.time}`)
      }
    } catch (dbErr) {
      console.error('[citas] Error creating appointment record:', dbErr)
    }

    // Helper for formatting dates nicely in Spanish
    const formatDateEs = (dateStr: string) => {
      try {
        const [y, m, d] = dateStr.split('-').map(Number)
        return new Date(y, m - 1, d).toLocaleDateString('es-ES', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      } catch {
        return dateStr
      }
    }

    const formattedDate = formatDateEs(actualSlot.date)
    const formattedTime = `${actualSlot.time.slice(0, 5)} h`

    // ── Automatic WhatsApp notification to Rebeca ────────────────────────────
    // This URL is returned to the confirmation page and auto-opened so Rebeca
    // receives an instant WhatsApp self-message with all the booking details.
    const rebecaNotifyLines = [
      '🔔 NUEVA RESERVA DE CITA',
      '',
      `Cliente: ${clientName}`,
      `Fecha: ${formattedDate}`,
      `Hora: ${formattedTime}`,
      `Tramite: ${migratorySituation}`,
      `Tel: ${clientPhone}`,
      `Email: ${clientEmail}`,
      ...(message ? ['', `Nota: ${message}`] : []),
    ]
    const rebecaNotifyUrl = `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(rebecaNotifyLines.join('\n'))}`

    // ── WhatsApp message from the client's perspective ───────────────────────
    const waLines = [
      `Hola Rebeca, acabo de solicitar una cita a través de tu web.`,
      ``,
      `Mi nombre es ${clientName} y he reservado el ${formattedDate} a las ${formattedTime}.`,
      `Mi consulta es sobre: ${migratorySituation}.`,
      ...(message ? [``, `Te cuento un poco más: ${message}`] : []),
      ``,
      `Te mando el comprobante de pago en cuanto lo realice. ¡Gracias!`,
    ]
    const waUrl = `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(waLines.join('\n'))}`

    return NextResponse.json({
      success: true,
      appointmentId,
      slot: { date: actualSlot.date, time: actualSlot.time },
      bankDetails: BANK_DETAILS,
      whatsappUrl: waUrl,
      // Auto-notification: confirmation page should open this automatically
      rebecaNotifyUrl,
    })
  } catch (error) {
    console.error('[citas] Error creating appointment:', error)
    return NextResponse.json({ error: 'Error al crear la cita. Por favor, inténtalo de nuevo.' }, { status: 500 })
  }
}
