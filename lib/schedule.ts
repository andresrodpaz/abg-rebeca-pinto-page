import { db } from '@/lib/db'
import { availableSlots } from '@/lib/db/schema'
import { and, gte, lte, asc } from 'drizzle-orm'
import fs from 'fs'
import path from 'path'

export interface ScheduleConfig {
  startHour: string // e.g. "09:00"
  endHour: string   // e.g. "18:00"
  slotDurationMinutes: number // 30
  activeDays: number[] // [1, 2, 3, 4, 5] (1=Mon, 5=Fri)
  disabledDates: string[] // ["YYYY-MM-DD"]
  disabledSlots: { date: string; time: string }[]
}

const CONFIG_FILE = path.join(process.cwd(), 'data', 'schedule-config.json')

export const DEFAULT_CONFIG: ScheduleConfig = {
  startHour: '09:00',
  endHour: '18:00',
  slotDurationMinutes: 30,
  activeDays: [1, 2, 3, 4, 5], // Lunes a Viernes
  disabledDates: [],
  disabledSlots: [],
}

export function getScheduleConfig(): ScheduleConfig {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf8')
      return { ...DEFAULT_CONFIG, ...JSON.parse(data) }
    }
  } catch (e) {
    console.error('[schedule] Error reading schedule config file:', e)
  }
  return DEFAULT_CONFIG
}

export function saveScheduleConfig(config: Partial<ScheduleConfig>): ScheduleConfig {
  const current = getScheduleConfig()
  const updated = { ...current, ...config }
  try {
    const dir = path.dirname(CONFIG_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(updated, null, 2), 'utf8')
  } catch (e) {
    console.error('[schedule] Error saving schedule config file:', e)
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
  const config = getScheduleConfig()
  const [year, month] = monthStr.split('-').map(Number)
  const daysInMonth = new Date(year, month, 0).getDate()

  const startDate = `${monthStr}-01`
  const endDate = `${monthStr}-${String(daysInMonth).padStart(2, '0')}`

  // Fetch booked slots and custom slots from DB
  let dbSlots: { id: number; date: string; time: string; isBooked: boolean }[] = []
  try {
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
