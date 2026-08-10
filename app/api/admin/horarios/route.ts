import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getScheduleConfig, saveScheduleConfig, ScheduleConfig } from '@/lib/schedule'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user
}

export async function GET() {
  try {
    await requireAdmin()
    const config = getScheduleConfig()
    return NextResponse.json({ config }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    })
  } catch (e) {
    const err = e as Error
    if (err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    console.error('[admin/horarios] Error:', e)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
    const body = await request.json()

    // Validate if action is to disable/enable a date or specific slot
    const { startHour, endHour, slotDurationMinutes, activeDays, disabledDates, action, date, time } = body

    const current = getScheduleConfig()

    if (action === 'toggleDate' && date) {
      const newDisabledDates = current.disabledDates.includes(date)
        ? current.disabledDates.filter(d => d !== date)
        : [...current.disabledDates, date]
      const updated = saveScheduleConfig({ disabledDates: newDisabledDates })
      return NextResponse.json({ success: true, config: updated })
    }

    if (action === 'toggleSlot' && date && time) {
      const exists = current.disabledSlots.some(ds => ds.date === date && ds.time === time)
      const disabledSlots = exists
        ? current.disabledSlots.filter(ds => !(ds.date === date && ds.time === time))
        : [...current.disabledSlots, { date, time }]
      const updated = saveScheduleConfig({ disabledSlots })
      return NextResponse.json({ success: true, config: updated })
    }

    // Save main config
    const updateData: Partial<ScheduleConfig> = {}
    if (startHour) updateData.startHour = startHour
    if (endHour) updateData.endHour = endHour
    if (slotDurationMinutes) updateData.slotDurationMinutes = Number(slotDurationMinutes)
    if (Array.isArray(activeDays)) updateData.activeDays = activeDays
    if (Array.isArray(disabledDates)) updateData.disabledDates = disabledDates

    const updated = saveScheduleConfig(updateData)
    return NextResponse.json({ success: true, config: updated })
  } catch (e) {
    const err = e as Error
    if (err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    console.error('[admin/horarios] Error updating schedule:', e)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
