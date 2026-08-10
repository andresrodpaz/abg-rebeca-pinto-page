import { db } from '@/lib/db'
import { availableSlots, settings } from '@/lib/db/schema'
import { and, gte, lte, asc, eq } from 'drizzle-orm'
import { initAppTables } from '@/lib/db/init'

export interface ScheduleConfig {
  startHour: string // e.g. "09:00"
  endHour: string   // e.g. "18:00"
  slotDurationMinutes: number // 30
  activeDays: number[] // [1, 2, 3, 4, 5] (1=Mon, 5=Fri)
  disabledDates: string[] // ["YYYY-MM-DD"]
  disabledSlots: { date: string; time: string }[]
  generalDisabledSlots?: string[] // specific times to skip generally (e.g., ["10:30"])
}

export const DEFAULT_CONFIG: ScheduleConfig = {
  startHour: '09:00',
  endHour: '18:00',
  slotDurationMinutes: 30,
  activeDays: [1, 2, 3, 4, 5], // Lunes a Viernes
  disabledDates: [],
  disabledSlots: [],
  generalDisabledSlots: [],
}

export async function getScheduleConfig(): Promise<ScheduleConfig> {
  try {
    await initAppTables()
    const [row] = await db.select().from(settings).where(eq(settings.key, 'schedule_config'))
    if (row?.value) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(row.value) }
    }
  } catch (e) {
    console.error('[schedule] Error reading schedule config from DB:', e)
  }
  return DEFAULT_CONFIG
}

export async function saveScheduleConfig(config: Partial<ScheduleConfig>): Promise<ScheduleConfig> {
  const current = await getScheduleConfig()
  
  // Si cambia la hora de inicio o fin, reseteamos los generalDisabledSlots para evitar inconsistencias
  if ((config.startHour && config.startHour !== current.startHour) || 
      (config.endHour && config.endHour !== current.endHour) ||
      (config.slotDurationMinutes && config.slotDurationMinutes !== current.slotDurationMinutes)) {
    config.generalDisabledSlots = []
  }

  const updated = { ...current, ...config }
  
  try {
    await initAppTables()
    
    // Check if exists
    const [exists] = await db.select().from(settings).where(eq(settings.key, 'schedule_config'))
    
    if (exists) {
      await db.update(settings).set({ value: JSON.stringify(updated) }).where(eq(settings.key, 'schedule_config'))
    } else {
      await db.insert(settings).values({ key: 'schedule_config', value: JSON.stringify(updated) })
    }
  } catch (e) {
    console.error('[schedule] Error saving schedule config to DB:', e)
  }
  return updated
}

/**
 * Generates array of time strings in HH:MM format between startHour and endHour
 * spaced by durationMinutes (default 30).
 */
export function generateTimes(startHour: string, endHour: string, durationMinutes: number = 30): string[] {
  const times: string[] = []
  const [startH, startM] = startHour.split(':').map(Number)
  const [endH, endM] = endHour.split(':').map(Number)

  let currentMin = startH * 60 + (startM || 0)
  const endMin = endH * 60 + (endM || 0)

  while (currentMin + durationMinutes <= endMin) {
    const h = Math.floor(currentMin / 60)
    const m = currentMin % 60
    times.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    currentMin += durationMinutes
  }
  return times
}

export interface SlotItem {
  id: number
  date: string
  time: string
  isBooked: boolean
}

/**
 * Gets or dynamically generates available 30-minute slots for a given month (YYYY-MM).
 */
export async function getAvailableSlotsForMonth(monthStr: string): Promise<SlotItem[]> {
  const config = await getScheduleConfig()
  const [year, month] = monthStr.split('-').map(Number)
  const daysInMonth = new Date(year, month, 0).getDate()

  const startDate = `${monthStr}-01`
  const endDate = `${monthStr}-${String(daysInMonth).padStart(2, '0')}`

  // Fetch booked slots and custom slots from DB
  let dbSlots: { id: number; date: string; time: string; isBooked: boolean }[] = []
  try {
    await initAppTables()
    dbSlots = await db
      .select({
        id: availableSlots.id,
        date: availableSlots.date,
        time: availableSlots.time,
        isBooked: availableSlots.isBooked,
      })
      .from(availableSlots)
      .where(and(gte(availableSlots.date, startDate), lte(availableSlots.date, endDate)))
      .orderBy(asc(availableSlots.date), asc(availableSlots.time))
  } catch (e) {
    console.error('[schedule] Error fetching slots from DB:', e)
  }

  const dbSlotsMap = new Map<string, { id: number; isBooked: boolean }>()
  for (const s of dbSlots) {
    dbSlotsMap.set(`${s.date}_${s.time.slice(0, 5)}`, { id: s.id, isBooked: s.isBooked })
  }

  const times = generateTimes(config.startHour, config.endHour, config.slotDurationMinutes || 30)
    .filter(t => !config.generalDisabledSlots?.includes(t)) // Filter out globally disabled times
  
  const result: SlotItem[] = []
  let syntheticIdCounter = 900000

  const todayStr = new Date().toISOString().split('T')[0]
  const now = new Date()
  const currentHHMM = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

  for (let d = 1; d <= daysInMonth; d++) {
    const dayStr = String(d).padStart(2, '0')
    const dateStr = `${monthStr}-${dayStr}`

    // Skip past days
    if (dateStr < todayStr) continue

    // Check if day is disabled by admin
    if (config.disabledDates.includes(dateStr)) continue

    // Check if day-of-week is active (Date.getDay(): 0=Sun, 1=Mon, ..., 6=Sat)
    const dateObj = new Date(year, month - 1, d)
    let dayOfWeek = dateObj.getDay()
    if (dayOfWeek === 0) dayOfWeek = 7 // Mon=1..Fri=5, Sat=6, Sun=7

    if (!config.activeDays.includes(dayOfWeek) && !config.activeDays.includes(dateObj.getDay())) {
      continue
    }

    for (const timeStr of times) {
      // Skip past times today
      if (dateStr === todayStr && timeStr <= currentHHMM) continue

      // Skip disabled specific slots
      if (config.disabledSlots.some(ds => ds.date === dateStr && ds.time === timeStr)) {
        continue
      }

      const key = `${dateStr}_${timeStr}`
      const existing = dbSlotsMap.get(key)

      if (existing) {
        if (!existing.isBooked) {
          result.push({
            id: existing.id,
            date: dateStr,
            time: timeStr,
            isBooked: false,
          })
        }
      } else {
        syntheticIdCounter++
        result.push({
          id: syntheticIdCounter,
          date: dateStr,
          time: timeStr,
          isBooked: false,
        })
      }
    }
  }

  return result
}
