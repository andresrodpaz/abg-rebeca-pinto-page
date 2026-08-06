import { NextRequest, NextResponse } from 'next/server'
import { getAvailableSlotsForMonth } from '@/lib/schedule'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  let month = searchParams.get('month') // "YYYY-MM"

  if (!month) {
    const today = new Date()
    month = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
  }

  try {
    const slots = await getAvailableSlotsForMonth(month)
    return NextResponse.json({ slots })
  } catch (error) {
    console.error('[citas/slots] Error fetching slots:', error)
    return NextResponse.json({ error: 'Error al obtener los horarios disponibles' }, { status: 500 })
  }
}
