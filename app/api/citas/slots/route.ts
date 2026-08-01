import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { availableSlots } from '@/lib/db/schema'
import { eq, and, gte, lte, asc } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const month = searchParams.get('month') // "YYYY-MM"

  try {
    let slots

    if (month) {
      const startDate = `${month}-01`
      const [year, m] = month.split('-').map(Number)
      const lastDay = new Date(year, m, 0).getDate()
      const endDate = `${month}-${String(lastDay).padStart(2, '0')}`

      slots = await db
        .select()
        .from(availableSlots)
        .where(
          and(
            gte(availableSlots.date, startDate),
            lte(availableSlots.date, endDate),
            eq(availableSlots.isBooked, false)
          )
        )
        .orderBy(asc(availableSlots.date), asc(availableSlots.time))
    } else {
      const today = new Date().toISOString().split('T')[0]
      slots = await db
        .select()
        .from(availableSlots)
        .where(
          and(
            gte(availableSlots.date, today),
            eq(availableSlots.isBooked, false)
          )
        )
        .orderBy(asc(availableSlots.date), asc(availableSlots.time))
    }

    return NextResponse.json({ slots })
  } catch (error) {
    console.error('[v0] Error fetching slots:', error)
    return NextResponse.json({ error: 'Error al obtener los horarios disponibles' }, { status: 500 })
  }
}
