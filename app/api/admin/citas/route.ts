import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { appointments, availableSlots } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { initAppTables } from '@/lib/db/init'

async function getAdminSession() {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    return session ?? null
  } catch {
    return null
  }
}

export async function GET() {
  const session = await getAdminSession()
  if (!session?.user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    await initAppTables()

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
        slotDate: availableSlots.date,
        slotTime: availableSlots.time,
      })
      .from(appointments)
      .leftJoin(availableSlots, eq(appointments.slotId, availableSlots.id))
      .orderBy(desc(appointments.id))

    return NextResponse.json({ appointments: rows })
  } catch (e: any) {
    console.error('[admin/citas] Error fetching appointments:', e)
    const errorMsg = e.stack || e.message || String(e)
    const pgError = e.detail || e.routine || ''
    return NextResponse.json({ error: 'Error del servidor', details: `${errorMsg} | ${pgError}` }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getAdminSession()
  if (!session?.user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
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
    console.error('[admin/citas] Error updating appointment:', e)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession()
  if (!session?.user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
    }

    // Find appointment to get slotId before deleting
    const [appt] = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id))

    // Free the slot so it becomes bookable again
    if (appt?.slotId) {
      await db
        .update(availableSlots)
        .set({ isBooked: false })
        .where(eq(availableSlots.id, appt.slotId))
    }

    // Remove the appointment
    await db.delete(appointments).where(eq(appointments.id, id))

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('[admin/citas] Error deleting appointment:', e)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
