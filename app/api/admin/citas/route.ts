import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { appointments, availableSlots } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { headers } from 'next/headers'

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user
}

export async function GET() {
  try {
    await requireAdmin()

    const rows = await db
      .select({
        id: appointments.id,
        slotId: appointments.slotId,
        clientName: appointments.clientName,
        clientEmail: appointments.clientEmail,
        clientPhone: appointments.clientPhone,
        migratorySituation: appointments.migratorySituation,
        message: appointments.message,
        status: appointments.status,
        createdAt: appointments.createdAt,
        slotDate: availableSlots.date,
        slotTime: availableSlots.time,
      })
      .from(appointments)
      .leftJoin(availableSlots, eq(appointments.slotId, availableSlots.id))
      .orderBy(desc(appointments.createdAt))

    return NextResponse.json({ appointments: rows })
  } catch (e) {
    const err = e as Error
    if (err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    console.error('[v0] Error fetching admin appointments:', e)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAdmin()

    const { id, status } = await request.json()

    if (!id || !['confirmed', 'cancelled', 'pending'].includes(status)) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
    }

    await db
      .update(appointments)
      .set({ status })
      .where(eq(appointments.id, id))

    return NextResponse.json({ success: true })
  } catch (e) {
    const err = e as Error
    if (err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    console.error('[v0] Error updating appointment:', e)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
