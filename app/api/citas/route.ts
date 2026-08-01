import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { appointments, availableSlots } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const BANK_DETAILS = `
Titular: Rebeca Pinto Camacho
IBAN: ES00 0000 0000 0000 0000 0000
Concepto: Consulta + tu nombre completo
Importe: 50 €

También puedes realizar el pago por Bizum al número: 600 000 000
`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slotId, clientName, clientEmail, clientPhone, migratorySituation, message } = body

    if (!slotId || !clientName || !clientEmail || !clientPhone || !migratorySituation) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 })
    }

    // Check slot is still available
    const [slot] = await db
      .select()
      .from(availableSlots)
      .where(eq(availableSlots.id, slotId))

    if (!slot) {
      return NextResponse.json({ error: 'El horario seleccionado no existe' }, { status: 404 })
    }
    if (slot.isBooked) {
      return NextResponse.json({ error: 'Este horario ya ha sido reservado. Por favor, elige otro.' }, { status: 409 })
    }

    // Mark slot as booked
    await db
      .update(availableSlots)
      .set({ isBooked: true })
      .where(eq(availableSlots.id, slotId))

    // Create appointment
    const [appointment] = await db
      .insert(appointments)
      .values({
        slotId,
        clientName,
        clientEmail,
        clientPhone,
        migratorySituation,
        message: message || '',
        status: 'pending',
      })
      .returning()

    // Send confirmation email via Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Rebeca Pinto Camacho <noreply@rebecapintocamacho.es>',
          to: clientEmail,
          subject: `Cita confirmada para el ${slot.date} a las ${slot.time}`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #F9F6F0;">
              <div style="background: #6B1A20; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="color: #E8C878; font-size: 22px; margin: 0;">Rebeca Pinto Camacho</h1>
                <p style="color: #F9F6F0; font-size: 12px; margin: 4px 0 0; letter-spacing: 2px; text-transform: uppercase;">Abogada · Extranjería</p>
              </div>
              <div style="background: white; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #E8DDD0;">
                <h2 style="color: #1A1A18; font-size: 20px; margin-bottom: 8px;">Solicitud de cita recibida</h2>
                <p style="color: #6B5F55; font-size: 14px; line-height: 1.6;">Hola <strong>${clientName}</strong>,</p>
                <p style="color: #6B5F55; font-size: 14px; line-height: 1.6;">
                  Hemos recibido tu solicitud de cita. Tu reserva quedará confirmada una vez recibamos el pago de la consulta.
                </p>

                <div style="background: #F9F6F0; border-left: 3px solid #E8C878; padding: 16px; margin: 24px 0; border-radius: 4px;">
                  <strong style="color: #1A1A18; font-size: 14px;">Datos de tu cita:</strong>
                  <p style="margin: 8px 0 0; color: #6B5F55; font-size: 14px;">
                    Fecha: <strong>${slot.date}</strong><br/>
                    Hora: <strong>${slot.time}</strong><br/>
                    Asunto: <strong>${migratorySituation}</strong>
                  </p>
                </div>

                <div style="background: #6B1A20; padding: 20px; border-radius: 6px; margin: 24px 0;">
                  <h3 style="color: #E8C878; font-size: 16px; margin: 0 0 12px;">Datos de pago</h3>
                  <pre style="color: #F9F6F0; font-family: 'Courier New', monospace; font-size: 13px; margin: 0; white-space: pre-wrap;">${BANK_DETAILS}</pre>
                </div>

                <p style="color: #6B5F55; font-size: 13px; line-height: 1.6;">
                  Una vez recibido el pago, recibirás la confirmación definitiva de la cita. Si tienes cualquier pregunta, no dudes en contactarme.
                </p>
                <p style="color: #6B5F55; font-size: 13px; margin-top: 24px;">
                  Un saludo cordial,<br/>
                  <strong style="color: #6B1A20;">Rebeca Pinto Camacho</strong><br/>
                  Abogada de Extranjería
                </p>
              </div>
            </div>
          `,
        })
      } catch (emailError) {
        console.error('[v0] Error sending confirmation email:', emailError)
        // Don't fail the whole request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      appointmentId: appointment.id,
      slot: { date: slot.date, time: slot.time },
      bankDetails: BANK_DETAILS,
    })
  } catch (error) {
    console.error('[v0] Error creating appointment:', error)
    return NextResponse.json({ error: 'Error al crear la cita. Por favor, inténtalo de nuevo.' }, { status: 500 })
  }
}
