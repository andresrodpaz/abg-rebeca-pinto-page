import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { appointments, availableSlots } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { Resend } from 'resend'
import { site } from '@/lib/site'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const BANK_DETAILS = `Titular: Rebeca Pinto Camacho
IBAN: ES00 0000 0000 0000 0000 0000
Concepto: Consulta + tu nombre completo
Importe: 50 €

También puedes realizar el pago por Bizum al número: ${site.phone.display}`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slotId, slotDate, slotTime, clientName, clientEmail, clientPhone, migratorySituation, message } = body

    if ((!slotId && (!slotDate || !slotTime)) || !clientName || !clientEmail || !clientPhone || !migratorySituation) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 })
    }

    let actualSlot: { id: number; date: string; time: string; isBooked: boolean } | undefined

    // 1. Try by DB ID if slotId < 900000
    if (slotId && typeof slotId === 'number' && slotId < 900000) {
      const [found] = await db
        .select()
        .from(availableSlots)
        .where(eq(availableSlots.id, slotId))
      actualSlot = found
    }

    // 2. Try by date + time
    if (!actualSlot && slotDate && slotTime) {
      const [found] = await db
        .select()
        .from(availableSlots)
        .where(and(eq(availableSlots.date, slotDate), eq(availableSlots.time, slotTime)))
      actualSlot = found
    }

    // 3. If slot exists in DB and is booked, reject
    if (actualSlot && actualSlot.isBooked) {
      return NextResponse.json({ error: 'Este horario ya ha sido reservado. Por favor, elige otro.' }, { status: 409 })
    }

    let finalSlotId: number

    if (actualSlot) {
      finalSlotId = actualSlot.id
      await db
        .update(availableSlots)
        .set({ isBooked: true })
        .where(eq(availableSlots.id, actualSlot.id))
    } else {
      // Create new slot record in DB for synthetic/dynamically generated slot
      const targetDate = slotDate || body.date
      const targetTime = slotTime || body.time
      if (!targetDate || !targetTime) {
        return NextResponse.json({ error: 'No se pudo identificar la fecha u hora de la cita' }, { status: 400 })
      }
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
    }

    // Create appointment
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

    // Build WhatsApp confirmation URL with personalized details
    const waMessage = `¡Hola Rebeca! He reservado una consulta legal a través de la web:\n\n👤 Nombre: ${clientName}\n📅 Cita: ${formattedDate} a las ${formattedTime}\n📌 Asunto: ${migratorySituation}\n💼 Servicio: Asesoría de 60 minutos (50 €)\n\nQuedo a la espera de confirmar el pago por transferencia o Bizum. ¡Muchas gracias!`
    const waUrl = `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(waMessage)}`

    // Send confirmation email via Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: `Rebeca Pinto Camacho <noreply@rebecapintocamacho.es>`,
          to: clientEmail,
          subject: `Solicitud de cita — ${actualSlot.date} a las ${actualSlot.time.slice(0, 5)} h`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #F3E9DD;">
              <div style="background: #8B5A62; padding: 28px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: #B8923B; font-size: 22px; margin: 0; letter-spacing: 0.04em;">Rebeca Pinto Camacho</h1>
                <p style="color: #F3E9DD; font-size: 11px; margin: 6px 0 0; letter-spacing: 3px; text-transform: uppercase;">Abogada · Extranjería</p>
              </div>
              <div style="background: white; padding: 36px; border-radius: 0 0 10px 10px; border: 1px solid #E8DDD0;">
                <h2 style="color: #262626; font-size: 20px; margin-bottom: 6px; letter-spacing: -0.01em;">Solicitud de cita recibida</h2>
                <p style="color: #6B5F55; font-size: 14px; line-height: 1.7; margin-bottom: 6px;">Hola <strong>${clientName}</strong>,</p>
                <p style="color: #6B5F55; font-size: 14px; line-height: 1.7; margin-bottom: 24px;">
                  Hemos recibido tu solicitud de cita. Tu reserva quedará <strong>confirmada una vez recibamos el pago</strong> de la consulta.
                </p>

                <div style="background: #F3E9DD; border-left: 3px solid #B8923B; padding: 18px; margin-bottom: 24px; border-radius: 4px;">
                  <strong style="color: #262626; font-size: 12px; text-transform: uppercase; letter-spacing: 0.10em;">Datos de tu cita</strong>
                  <table style="margin-top: 10px; font-size: 14px; color: #6B5F55; line-height: 2; border-collapse: collapse;">
                    <tr><td style="padding-right: 20px; color: #262626; font-weight: 600; white-space: nowrap;">Fecha:</td><td>${actualSlot.date}</td></tr>
                    <tr><td style="padding-right: 20px; color: #262626; font-weight: 600;">Hora:</td><td>${actualSlot.time.slice(0, 5)} h</td></tr>
                    <tr><td style="padding-right: 20px; color: #262626; font-weight: 600;">Duración:</td><td>60 minutos</td></tr>
                    <tr><td style="padding-right: 20px; color: #262626; font-weight: 600;">Asunto:</td><td>${migratorySituation}</td></tr>
                  </table>
                </div>

                <div style="background: #8B5A62; padding: 22px 24px; border-radius: 8px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between;">
                  <div>
                    <p style="color: #B8923B; font-size: 11px; margin: 0 0 4px; letter-spacing: 0.12em; text-transform: uppercase; font-family: system-ui, sans-serif;">Servicio</p>
                    <p style="color: #F3E9DD; font-size: 15px; margin: 0; font-weight: 600;">Asesoría de 60 minutos</p>
                  </div>
                  <div style="text-align: right;">
                    <p style="color: #B8923B; font-size: 30px; margin: 0; font-weight: 700; letter-spacing: -0.02em;">50 €</p>
                  </div>
                </div>

                <div style="background: #262626; padding: 22px 24px; border-radius: 8px; margin-bottom: 24px;">
                  <h3 style="color: #B8923B; font-size: 13px; margin: 0 0 14px; letter-spacing: 0.10em; text-transform: uppercase; font-family: system-ui, sans-serif;">Datos de pago</h3>
                  <pre style="color: #F3E9DD; font-family: 'Courier New', monospace; font-size: 13px; margin: 0; white-space: pre-wrap; line-height: 1.8;">${BANK_DETAILS}</pre>
                </div>

                <div style="text-align: center; margin-bottom: 28px;">
                  <a href="${waUrl}" target="_blank"
                    style="display: inline-block; background: linear-gradient(135deg, #25D366, #128C7E); color: white; text-decoration: none; font-family: system-ui, sans-serif; font-size: 14px; font-weight: 600; padding: 14px 28px; border-radius: 10px;">
                    ✓ Confirmar cita por WhatsApp
                  </a>
                  <p style="color: #9E9085; font-size: 12px; margin: 10px 0 0; font-family: system-ui, sans-serif;">
                    Haz clic para enviarnos la confirmación directamente por WhatsApp
                  </p>
                </div>

                <p style="color: #6B5F55; font-size: 13px; line-height: 1.7; margin-bottom: 24px;">
                  Una vez recibido el pago, recibirás la confirmación definitiva de la cita. Si tienes cualquier pregunta, no dudes en contactarme.
                </p>
                <p style="color: #6B5F55; font-size: 13px; margin: 0;">
                  Un saludo cordial,<br/>
                  <strong style="color: #8B5A62;">Rebeca Pinto Camacho</strong><br/>
                  Abogada de Extranjería
                </p>
              </div>
              <p style="text-align: center; color: #9E9085; font-size: 11px; margin-top: 20px; font-family: system-ui, sans-serif;">
                ${site.address.full} · ${site.email}
              </p>
            </div>
          `,
        })
      } catch (emailError) {
        console.error('[citas] Error sending confirmation email:', emailError)
      }
    }

    return NextResponse.json({
      success: true,
      appointmentId: appointment.id,
      slot: { date: actualSlot.date, time: actualSlot.time },
      bankDetails: BANK_DETAILS,
      whatsappUrl: waUrl,
    })
  } catch (error) {
    console.error('[citas] Error creating appointment:', error)
    return NextResponse.json({ error: 'Error al crear la cita. Por favor, inténtalo de nuevo.' }, { status: 500 })
  }
}
