import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { site } from '@/lib/site'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(req: NextRequest) {
  try {
    const { name, phone, situation, message } = await req.json()

    if (!name || !phone || !situation) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    if (resend) {
      await resend.emails.send({
        from: 'web@rebecapintocamacho.es',
        to: site.email,
        subject: `Nueva consulta de ${name}`,
        html: `
          <h2>Nueva consulta desde la web</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Situación migratoria:</strong> ${situation}</p>
          <p><strong>Mensaje:</strong> ${message || '(sin mensaje)'}</p>
        `,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contacto] Error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
