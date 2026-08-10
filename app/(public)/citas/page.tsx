"use client"

import { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Clock, CheckCircle, AlertCircle, Loader2, CalendarDays, Sparkles } from 'lucide-react'
import { site } from '@/lib/site'


const SITUATIONS = [
  'Arraigo Social',
  'Arraigo Sociolaboral',
  'Arraigo Familiar',
  'Arraigo Socioformativo',
  'Arraigo de Segunda Oportunidad',
  'Visado de Estudios',
  'Visado de Trabajo por Cuenta Ajena',
  'Visado de Trabajo por Cuenta Propia',
  'Visado de Reagrupación Familiar',
  'Visado de Residencia No Lucrativa',
  'Visado de Nómada Digital',
  'Visado de Investigador',
  'Visado de Emprendedor',
  'Residencia Temporal',
  'Residencia de Larga Duración',
  'Nacionalidad española',
  'Renovación de residencia',
  'TIE / NIE',
  'Otra consulta de extranjería',
]

type Slot = {
  id: number
  date: string
  time: string
  isBooked: boolean
}

type Step = 'calendar' | 'form' | 'confirmation'

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const d = new Date(year, month, 1).getDay()
  return d === 0 ? 6 : d - 1
}

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

const STEP_LABELS = ['Fecha', 'Datos', 'Confirmación']

export default function CitasPage() {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [step, setStep] = useState<Step>('calendar')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ bankDetails: string; slot: { date: string; time: string }; whatsappUrl?: string; rebecaNotifyUrl?: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    migratorySituation: '',
    message: '',
  })

  const fetchSlots = useCallback(async (year: number, month: number) => {
    setLoading(true)
    const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`
    try {
      const res = await fetch(`/api/citas/slots?month=${monthStr}`)
      const data = await res.json()
      setSlots(data.slots ?? [])
    } catch {
      setSlots([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSlots(viewYear, viewMonth)
  }, [viewYear, viewMonth, fetchSlots])

  const availableDates = new Set(slots.map(s => s.date))

  const goToPrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
    setSelectedDate(null)
    setSelectedSlot(null)
  }
  const goToNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
    setSelectedDate(null)
    setSelectedSlot(null)
  }

  const slotsForDate = selectedDate ? slots.filter(s => s.date === selectedDate) : []

  const handleDateClick = (dateStr: string) => {
    if (!availableDates.has(dateStr)) return
    setSelectedDate(dateStr)
    setSelectedSlot(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSlot) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/citas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotId: selectedSlot.id,
          slotDate: selectedSlot.date,
          slotTime: selectedSlot.time,
          ...form,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Error al enviar la solicitud.')
        return
      }
      setResult({
        bankDetails: data.bankDetails,
        slot: data.slot,
        whatsappUrl: data.whatsappUrl,
        rebecaNotifyUrl: data.rebecaNotifyUrl,
      })
      setStep('confirmation')
      // Auto-open WhatsApp notification for Rebeca when a new booking arrives
      if (data.rebecaNotifyUrl) {
        setTimeout(() => {
          window.open(data.rebecaNotifyUrl, '_blank', 'noopener,noreferrer')
        }, 800)
      }
    } catch {
      setError('Error de conexión. Por favor, inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)
  const todayStr = today.toISOString().split('T')[0]

  const stepIndex = step === 'calendar' ? 0 : step === 'form' ? 1 : 2

  return (
    <main className="min-h-screen bg-cream py-16 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(160deg, oklch(0.97 0.012 85) 0%, oklch(0.94 0.018 80) 100%)' }}>
      <div className="max-w-4xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <span
            className="inline-flex items-center text-xs tracking-[0.18em] uppercase font-sans font-medium mb-4"
            style={{ color: 'oklch(0.76 0.10 80)' }}
          >
            Reserva online
          </span>
          <h1 className="display-lg text-charcoal text-3xl md:text-4xl mt-1 mb-5">
            Agendar consulta
          </h1>
          <div
            className="mx-auto mb-5"
            style={{ width: '2.5rem', height: '2px', background: 'linear-gradient(90deg, transparent, oklch(0.76 0.10 80), transparent)' }}
          />
          <p className="text-warm-gray text-sm max-w-md mx-auto leading-relaxed font-sans">
            Elige un día y hora disponibles. Pronto te contactaremos por WhatsApp con los datos bancarios para confirmar la cita con el pago de la consulta (50&nbsp;€).
          </p>
        </div>

        {/* ── Step indicator ── */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {STEP_LABELS.map((label, i) => {
            const isCompleted = stepIndex > i
            const isActive = stepIndex === i
            return (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300"
                    style={{
                      background: isCompleted
                        ? 'linear-gradient(135deg, oklch(0.76 0.10 80), oklch(0.68 0.12 75))'
                        : isActive
                          ? 'linear-gradient(135deg, oklch(0.32 0.12 15), oklch(0.42 0.12 15))'
                          : 'white',
                      color: isCompleted
                        ? 'oklch(0.22 0.005 0)'
                        : isActive
                          ? 'oklch(0.97 0.012 85)'
                          : 'oklch(0.55 0.008 50)',
                      boxShadow: isActive
                        ? '0 0 0 4px oklch(0.32 0.12 15 / 0.12), 0 4px 12px oklch(0.32 0.12 15 / 0.25)'
                        : isCompleted
                          ? '0 2px 8px oklch(0.76 0.10 80 / 0.35)'
                          : 'inset 0 0 0 1.5px oklch(0.88 0.015 80)',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    {isCompleted ? '✓' : i + 1}
                  </div>
                  <span
                    className="text-xs font-sans tracking-wide"
                    style={{ color: isActive ? 'oklch(0.32 0.12 15)' : 'oklch(0.55 0.008 50)', fontWeight: isActive ? 600 : 400 }}
                  >
                    {label}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className="w-16 sm:w-24 h-px mx-2 mb-5 transition-all duration-500"
                    style={{ background: stepIndex > i ? 'linear-gradient(90deg, oklch(0.76 0.10 80), oklch(0.68 0.12 75))' : 'oklch(0.88 0.015 80)' }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* ══════════════════════════════════════
            STEP 1 — CALENDAR
        ══════════════════════════════════════ */}
        {step === 'calendar' && (
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'white',
              boxShadow: '0 4px 6px -1px oklch(0.32 0.12 15 / 0.06), 0 20px 60px -10px oklch(0.32 0.12 15 / 0.12), 0 0 0 1px oklch(0.88 0.015 80)',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[oklch(0.94_0.010_80)]">

              {/* ── Calendar panel ── */}
              <div className="p-7 md:p-9">
                {/* Month navigation */}
                <div className="flex items-center justify-between mb-7">
                  <button
                    onClick={goToPrevMonth}
                    className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 group"
                    style={{ background: 'oklch(0.95 0.010 80)' }}
                    aria-label="Mes anterior"
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'oklch(0.32 0.12 15)'; (e.currentTarget.querySelector('svg') as SVGElement).style.color = 'oklch(0.97 0.012 85)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'oklch(0.95 0.010 80)'; (e.currentTarget.querySelector('svg') as SVGElement).style.color = 'oklch(0.55 0.008 50)' }}
                  >
                    <ChevronLeft className="w-4 h-4 transition-colors" style={{ color: 'oklch(0.55 0.008 50)' }} />
                  </button>

                  <div className="text-center">
                    <h2 className="font-serif text-xl font-semibold" style={{ color: 'oklch(0.22 0.005 0)', letterSpacing: '-0.02em' }}>
                      {MONTH_NAMES[viewMonth]}
                    </h2>
                    <span className="text-xs font-sans" style={{ color: 'oklch(0.55 0.008 50)', letterSpacing: '0.08em' }}>{viewYear}</span>
                  </div>

                  <button
                    onClick={goToNextMonth}
                    className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
                    style={{ background: 'oklch(0.95 0.010 80)' }}
                    aria-label="Mes siguiente"
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'oklch(0.32 0.12 15)'; (e.currentTarget.querySelector('svg') as SVGElement).style.color = 'oklch(0.97 0.012 85)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'oklch(0.95 0.010 80)'; (e.currentTarget.querySelector('svg') as SVGElement).style.color = 'oklch(0.55 0.008 50)' }}
                  >
                    <ChevronRight className="w-4 h-4 transition-colors" style={{ color: 'oklch(0.55 0.008 50)' }} />
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 mb-3">
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => (
                    <div
                      key={d}
                      className="text-center text-[10px] font-sans font-semibold py-1"
                      style={{ color: 'oklch(0.70 0.008 50)', letterSpacing: '0.12em' }}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days grid */}
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-44 gap-3">
                    <Loader2 className="w-6 h-6 animate-spin" style={{ color: 'oklch(0.32 0.12 15)' }} />
                    <span className="text-xs font-sans" style={{ color: 'oklch(0.55 0.008 50)' }}>Cargando disponibilidad…</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDay }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1
                      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                      const isAvailable = availableDates.has(dateStr)
                      const isPast = dateStr < todayStr
                      const isSelected = selectedDate === dateStr
                      const isToday = dateStr === todayStr

                      if (isSelected) {
                        return (
                          <button
                            key={day}
                            onClick={() => handleDateClick(dateStr)}
                            className="relative aspect-square flex items-center justify-center text-sm font-semibold rounded-full transition-all duration-200 font-sans"
                            style={{
                              background: 'linear-gradient(135deg, oklch(0.32 0.12 15), oklch(0.42 0.12 15))',
                              color: 'oklch(0.97 0.012 85)',
                              boxShadow: '0 4px 14px oklch(0.32 0.12 15 / 0.35)',
                              transform: 'scale(1.08)',
                            }}
                            aria-label={`${day} de ${MONTH_NAMES[viewMonth]}`}
                            aria-pressed={true}
                          >
                            {day}
                          </button>
                        )
                      }

                      if (isAvailable && !isPast) {
                        return (
                          <button
                            key={day}
                            onClick={() => handleDateClick(dateStr)}
                            className="relative aspect-square flex flex-col items-center justify-center text-sm font-medium rounded-full transition-all duration-200 cursor-pointer font-sans group"
                            style={{ color: 'oklch(0.32 0.12 15)' }}
                            onMouseEnter={e => {
                              const el = e.currentTarget as HTMLButtonElement
                              el.style.background = 'oklch(0.32 0.12 15 / 0.1)'
                              el.style.transform = 'scale(1.05)'
                            }}
                            onMouseLeave={e => {
                              const el = e.currentTarget as HTMLButtonElement
                              el.style.background = 'transparent'
                              el.style.transform = 'scale(1)'
                            }}
                            aria-label={`${day} de ${MONTH_NAMES[viewMonth]}`}
                            aria-pressed={false}
                          >
                            {day}
                            <span
                              className="absolute bottom-1 w-1 h-1 rounded-full"
                              style={{ background: 'oklch(0.76 0.10 80)' }}
                            />
                            {isToday && (
                              <span
                                className="absolute inset-0 rounded-full"
                                style={{ boxShadow: 'inset 0 0 0 1.5px oklch(0.76 0.10 80 / 0.6)' }}
                              />
                            )}
                          </button>
                        )
                      }

                      return (
                        <div
                          key={day}
                          className="aspect-square flex items-center justify-center text-sm font-sans"
                          style={{
                            color: isToday && !isPast ? 'oklch(0.50 0.008 50)' : 'oklch(0.70 0.006 50 / 0.45)',
                            position: 'relative',
                          }}
                        >
                          {day}
                          {isToday && !isPast && (
                            <span
                              className="absolute inset-0 rounded-full"
                              style={{ boxShadow: 'inset 0 0 0 1.5px oklch(0.76 0.10 80 / 0.5)' }}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Legend */}
                <div className="flex gap-5 mt-6 pt-5 border-t text-xs font-sans" style={{ borderColor: 'oklch(0.93 0.010 80)' }}>
                  <span className="flex items-center gap-2" style={{ color: 'oklch(0.55 0.008 50)' }}>
                    <span
                      className="flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-semibold"
                      style={{ color: 'oklch(0.32 0.12 15)', position: 'relative' }}
                    >
                      <span className="w-1 h-1 rounded-full absolute -bottom-0.5" style={{ background: 'oklch(0.76 0.10 80)' }} />
                      8
                    </span>
                    Disponible
                  </span>
                  <span className="flex items-center gap-2" style={{ color: 'oklch(0.55 0.008 50)' }}>
                    <span className="text-[oklch(0.70_0.006_50_/_0.45)]">—</span>
                    Sin horario
                  </span>
                </div>
              </div>

              {/* ── Time slots panel ── */}
              <div className="p-7 md:p-9" style={{ background: 'linear-gradient(180deg, oklch(0.99 0.006 85) 0%, white 100%)' }}>
                {!selectedDate ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12 gap-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ background: 'oklch(0.32 0.12 15 / 0.06)' }}
                    >
                      <CalendarDays className="w-7 h-7" style={{ color: 'oklch(0.32 0.12 15 / 0.35)' }} />
                    </div>
                    <div>
                      <p className="font-serif text-base font-semibold mb-1" style={{ color: 'oklch(0.32 0.12 15)' }}>
                        Selecciona una fecha
                      </p>
                      <p className="text-xs font-sans leading-relaxed max-w-[160px]" style={{ color: 'oklch(0.55 0.008 50)' }}>
                        Los puntos dorados indican días con disponibilidad
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <h3 className="font-serif text-base font-semibold capitalize mb-0.5" style={{ color: 'oklch(0.22 0.005 0)' }}>
                        {formatDate(selectedDate)}
                      </h3>
                      <p className="text-xs font-sans" style={{ color: 'oklch(0.55 0.008 50)' }}>
                        {slotsForDate.length} horario{slotsForDate.length !== 1 ? 's' : ''} disponible{slotsForDate.length !== 1 ? 's' : ''}
                      </p>
                    </div>

                    {/* Price info banner */}
                    <div
                      className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 mb-4"
                      style={{
                        background: 'linear-gradient(135deg, oklch(0.638 0.112 68 / 0.10), oklch(0.638 0.112 68 / 0.06))',
                        border: '1px solid oklch(0.638 0.112 68 / 0.30)',
                      }}
                    >
                      <span style={{ fontSize: '1.1rem' }}>⏱</span>
                      <div>
                        <p className="text-xs font-sans font-semibold" style={{ color: 'oklch(0.30 0.005 0)' }}>
                          Asesoría de 60 minutos
                        </p>
                        <p className="text-xs font-sans" style={{ color: 'oklch(0.638 0.112 68)' }}>
                          <strong>50 €</strong> · Pago por transferencia o Bizum
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {slotsForDate.map(slot => {
                        const isChosen = selectedSlot?.id === slot.id
                        return (
                          <button
                            key={slot.id}
                            onClick={() => setSelectedSlot(slot)}
                            className="flex flex-col items-center justify-center gap-1 py-3 px-3 rounded-xl font-sans transition-all duration-200"
                            style={{
                              background: isChosen
                                ? 'linear-gradient(135deg, oklch(0.46 0.066 6), oklch(0.56 0.058 6))'
                                : 'white',
                              color: isChosen ? 'oklch(0.936 0.022 71)' : 'oklch(0.30 0.005 0)',
                              boxShadow: isChosen
                                ? '0 4px 14px oklch(0.46 0.066 6 / 0.30)'
                                : '0 1px 3px oklch(0.22 0.005 0 / 0.08), inset 0 0 0 1px oklch(0.88 0.015 80)',
                              transform: isChosen ? 'scale(1.03)' : 'scale(1)',
                            }}
                            onMouseEnter={e => {
                              if (!isChosen) {
                                const el = e.currentTarget as HTMLButtonElement
                                el.style.boxShadow = '0 4px 12px oklch(0.46 0.066 6 / 0.12), inset 0 0 0 1px oklch(0.46 0.066 6 / 0.4)'
                                el.style.transform = 'scale(1.02)'
                              }
                            }}
                            onMouseLeave={e => {
                              if (!isChosen) {
                                const el = e.currentTarget as HTMLButtonElement
                                el.style.boxShadow = '0 1px 3px oklch(0.22 0.005 0 / 0.08), inset 0 0 0 1px oklch(0.88 0.015 80)'
                                el.style.transform = 'scale(1)'
                              }
                            }}
                          >
                            <span className="flex items-center gap-1.5 text-sm font-medium">
                              <Clock className="w-3.5 h-3.5" style={{ opacity: isChosen ? 0.85 : 0.5 }} />
                              {slot.time.slice(0, 5)} h
                            </span>
                            <span
                              className="text-[10px] font-sans"
                              style={{ opacity: isChosen ? 0.85 : 0.55 }}
                            >
                              60 min · 50 €
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    {selectedSlot && (
                      <button
                        onClick={() => setStep('form')}
                        className="mt-6 w-full py-3.5 text-sm font-sans font-semibold rounded-xl transition-all duration-200"
                        style={{
                          background: 'linear-gradient(135deg, oklch(0.76 0.10 80), oklch(0.68 0.12 75))',
                          color: 'oklch(0.22 0.005 0)',
                          boxShadow: '0 4px 14px oklch(0.76 0.10 80 / 0.40)',
                          letterSpacing: '0.02em',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 20px oklch(0.76 0.10 80 / 0.45)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px oklch(0.76 0.10 80 / 0.40)' }}
                      >
                        Continuar →
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            STEP 2 — FORM
        ══════════════════════════════════════ */}
        {step === 'form' && selectedSlot && (
          <div
            className="rounded-2xl p-7 md:p-10 max-w-2xl mx-auto"
            style={{
              background: 'white',
              boxShadow: '0 4px 6px -1px oklch(0.32 0.12 15 / 0.06), 0 20px 60px -10px oklch(0.32 0.12 15 / 0.12), 0 0 0 1px oklch(0.88 0.015 80)',
            }}
          >
            {/* Selected slot summary */}
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 mb-5"
              style={{
                background: 'linear-gradient(135deg, oklch(0.46 0.066 6 / 0.05), oklch(0.638 0.112 68 / 0.06))',
                border: '1px solid oklch(0.46 0.066 6 / 0.12)',
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'oklch(0.46 0.066 6)', boxShadow: '0 2px 8px oklch(0.46 0.066 6 / 0.30)' }}
              >
                <CalendarDays className="w-4 h-4" style={{ color: 'oklch(0.936 0.022 71)' }} />
              </div>
              <div>
                <p className="text-xs font-sans" style={{ color: 'oklch(0.55 0.008 50)' }}>Cita seleccionada</p>
                <p className="text-sm font-semibold font-sans capitalize" style={{ color: 'oklch(0.22 0.005 0)' }}>
                  {formatDate(selectedSlot.date)} · {selectedSlot.time.slice(0, 5)} h
                </p>
              </div>
              <button
                onClick={() => { setStep('calendar'); setSelectedSlot(null) }}
                className="ml-auto text-xs font-sans font-medium transition-colors"
                style={{ color: 'oklch(0.46 0.066 6)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.textDecoration = 'underline' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.textDecoration = 'none' }}
              >
                Cambiar
              </button>
            </div>

            {/* Price summary */}
            <div
              className="flex items-center gap-4 rounded-xl px-5 py-4 mb-8"
              style={{
                background: 'linear-gradient(135deg, oklch(0.638 0.112 68 / 0.08), oklch(0.638 0.112 68 / 0.04))',
                border: '1.5px solid oklch(0.638 0.112 68 / 0.35)',
              }}
            >
              <div className="flex-1">
                <p className="text-xs font-sans font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'oklch(0.638 0.112 68)', letterSpacing: '0.10em' }}>Servicio</p>
                <p className="text-sm font-sans font-semibold" style={{ color: 'oklch(0.22 0.005 0)' }}>Asesoría de 60 minutos</p>
                <p className="text-xs font-sans mt-0.5" style={{ color: 'oklch(0.55 0.008 50)' }}>Pago por transferencia bancaria o Bizum</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-serif text-2xl font-bold" style={{ color: 'oklch(0.46 0.066 6)', letterSpacing: '-0.02em' }}>50 €</p>
                <p className="text-[10px] font-sans" style={{ color: 'oklch(0.55 0.008 50)' }}>IVA incluido</p>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold mb-6" style={{ color: 'oklch(0.22 0.005 0)', letterSpacing: '-0.02em' }}>
              Tus datos
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Input helper styles */}
              <style>{`
                .citas-input {
                  width: 100%;
                  padding: 0.7rem 1rem;
                  border: 1.5px solid oklch(0.88 0.015 80);
                  border-radius: 0.75rem;
                  font-size: 0.875rem;
                  font-family: var(--font-inter), system-ui, sans-serif;
                  color: oklch(0.22 0.005 0);
                  background: oklch(0.99 0.006 85);
                  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
                  outline: none;
                }
                .citas-input:focus {
                  border-color: oklch(0.32 0.12 15);
                  background: white;
                  box-shadow: 0 0 0 3px oklch(0.32 0.12 15 / 0.10);
                }
                .citas-input::placeholder {
                  color: oklch(0.70 0.006 50);
                }
                .citas-label {
                  display: block;
                  font-size: 0.8125rem;
                  font-family: var(--font-inter), system-ui, sans-serif;
                  font-weight: 600;
                  color: oklch(0.30 0.005 0);
                  margin-bottom: 0.4rem;
                  letter-spacing: 0.01em;
                }
              `}</style>

              <div>
                <label htmlFor="clientName" className="citas-label">
                  Nombre completo <span style={{ color: 'oklch(0.32 0.12 15)' }}>*</span>
                </label>
                <input
                  id="clientName"
                  type="text"
                  required
                  value={form.clientName}
                  onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))}
                  className="citas-input"
                  placeholder="Tu nombre y apellidos"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="clientEmail" className="citas-label">
                    Email <span style={{ color: 'oklch(0.32 0.12 15)' }}>*</span>
                  </label>
                  <input
                    id="clientEmail"
                    type="email"
                    required
                    value={form.clientEmail}
                    onChange={e => setForm(f => ({ ...f, clientEmail: e.target.value }))}
                    className="citas-input"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div>
                  <label htmlFor="clientPhone" className="citas-label">
                    Teléfono <span style={{ color: 'oklch(0.32 0.12 15)' }}>*</span>
                  </label>
                  <input
                    id="clientPhone"
                    type="tel"
                    required
                    value={form.clientPhone}
                    onChange={e => setForm(f => ({ ...f, clientPhone: e.target.value }))}
                    className="citas-input"
                    placeholder="600 000 000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="migratorySituation" className="citas-label">
                  Situación migratoria <span style={{ color: 'oklch(0.32 0.12 15)' }}>*</span>
                </label>
                <select
                  id="migratorySituation"
                  required
                  value={form.migratorySituation}
                  onChange={e => setForm(f => ({ ...f, migratorySituation: e.target.value }))}
                  className="citas-input"
                >
                  <option value="">Selecciona tu situación…</option>
                  {SITUATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="citas-label">
                  Cuéntame brevemente tu caso{' '}
                  <span style={{ color: 'oklch(0.55 0.008 50)', fontWeight: 400 }}>(opcional)</span>
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="citas-input"
                  style={{ resize: 'none' }}
                  placeholder="Cualquier detalle que quieras compartir antes de la cita…"
                />
              </div>

              {error && (
                <div
                  className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm font-sans"
                  style={{ background: 'oklch(0.97 0.015 25)', border: '1px solid oklch(0.85 0.08 25)', color: 'oklch(0.40 0.14 25)' }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              <div
                className="text-xs font-sans leading-relaxed px-4 py-3 rounded-xl"
                style={{ background: 'oklch(0.936 0.022 71)', color: 'oklch(0.45 0.008 50)' }}
              >
                Al enviar este formulario aceptas nuestra{' '}
                <a href="/politica-privacidad" style={{ color: 'oklch(0.46 0.066 6)', textDecorationLine: 'underline' }}>
                  política de privacidad
                </a>.
                Pronto te contactaremos por <strong>WhatsApp</strong> con los datos bancarios para confirmar la cita (importe: <strong>50&nbsp;€</strong>).
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep('calendar')}
                  className="flex-1 py-3 text-sm font-sans font-semibold rounded-xl transition-all duration-200"
                  style={{
                    border: '1.5px solid oklch(0.88 0.015 80)',
                    color: 'oklch(0.30 0.005 0)',
                    background: 'white',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'oklch(0.32 0.12 15 / 0.4)'; (e.currentTarget as HTMLButtonElement).style.background = 'oklch(0.97 0.012 85)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'oklch(0.88 0.015 80)'; (e.currentTarget as HTMLButtonElement).style.background = 'white' }}
                >
                  ← Volver
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 text-sm font-sans font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{
                    background: 'linear-gradient(135deg, oklch(0.32 0.12 15), oklch(0.42 0.12 15))',
                    color: 'oklch(0.97 0.012 85)',
                    boxShadow: '0 4px 14px oklch(0.32 0.12 15 / 0.30)',
                  }}
                  onMouseEnter={e => { if (!submitting) { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 20px oklch(0.32 0.12 15 / 0.35)' } }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px oklch(0.32 0.12 15 / 0.30)' }}
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? 'Enviando…' : 'Solicitar cita'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ══════════════════════════════════════
            STEP 3 — CONFIRMATION
        ══════════════════════════════════════ */}
        {step === 'confirmation' && result && (
          <div
            className="rounded-2xl p-7 md:p-10 max-w-2xl mx-auto"
            style={{
              background: 'white',
              boxShadow: '0 4px 6px -1px oklch(0.32 0.12 15 / 0.06), 0 20px 60px -10px oklch(0.32 0.12 15 / 0.12), 0 0 0 1px oklch(0.88 0.015 80)',
            }}
          >
            {/* Success icon + headline */}
            <div className="text-center mb-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.52 0.15 145), oklch(0.45 0.13 145))',
                  boxShadow: '0 6px 20px oklch(0.52 0.15 145 / 0.30)',
                }}
              >
                <CheckCircle className="w-7 h-7" style={{ color: 'white' }} />
              </div>
              <h2 className="font-serif text-2xl font-semibold mb-1" style={{ color: 'oklch(0.22 0.005 0)', letterSpacing: '-0.02em' }}>
                Solicitud recibida
              </h2>
              <p className="text-sm font-sans" style={{ color: 'oklch(0.55 0.008 50)' }}>
                <span className="capitalize font-medium" style={{ color: 'oklch(0.22 0.005 0)' }}>{formatDate(result.slot.date)}</span>
                {' '}a las{' '}
                <span className="font-medium" style={{ color: 'oklch(0.22 0.005 0)' }}>{result.slot.time.slice(0, 5)} h</span>
              </p>
            </div>

            {/* Step-by-step payment guide */}
            <div
              className="rounded-xl p-1 mb-6"
              style={{ background: 'oklch(0.97 0.008 80)', border: '1px solid oklch(0.90 0.012 80)' }}
            >
              <p
                className="text-xs font-sans font-semibold uppercase tracking-wider px-4 pt-4 pb-2"
                style={{ color: 'oklch(0.55 0.008 50)', letterSpacing: '0.12em' }}
              >
                Para confirmar tu cita
              </p>
              {[
                { n: '1', text: 'Realiza el pago de 50 € por transferencia o Bizum (datos abajo).' },
                { n: '2', text: 'Envía el comprobante a Rebeca por WhatsApp.' },
                { n: '3', text: 'Recibirás la confirmación definitiva de tu cita.' },
              ].map(({ n, text }) => (
                <div key={n} className="flex items-start gap-3 px-4 py-3">
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-sans mt-0.5"
                    style={{ background: 'oklch(0.32 0.12 15)', color: 'oklch(0.97 0.012 85)' }}
                  >
                    {n}
                  </span>
                  <p className="text-sm font-sans leading-relaxed" style={{ color: 'oklch(0.30 0.005 0)' }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* Bank details */}
            <div
              className="rounded-xl p-5 mb-6"
              style={{ background: 'linear-gradient(135deg, oklch(0.24 0.10 15), oklch(0.30 0.12 15))' }}
            >
              <p className="text-xs font-sans font-semibold uppercase tracking-widest mb-4" style={{ color: 'oklch(0.638 0.112 68)', letterSpacing: '0.14em' }}>
                Datos de pago
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  ['Titular', 'Rebeca Pinto Camacho'],
                  ['IBAN', 'ES00 0000 0000 0000 0000 0000'],
                  ['Concepto', 'Consulta + tu nombre'],
                  ['Importe', '50 €'],
                  ['Bizum', '687 20 24 99'],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-4">
                    <span className="text-xs font-sans shrink-0" style={{ color: 'oklch(0.97 0.012 85 / 0.45)' }}>{label}</span>
                    <span className="text-sm font-sans font-medium text-right" style={{ color: 'oklch(0.97 0.012 85 / 0.90)' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={result?.whatsappUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-sans font-semibold mb-4 transition-colors duration-150"
              style={{ background: '#25D366', color: 'white' }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Enviar comprobante por WhatsApp
            </a>

            <div className="text-center">
              <a
                href="/"
                className="text-sm font-sans transition-colors duration-200"
                style={{ color: 'oklch(0.60 0.008 50)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'oklch(0.32 0.12 15)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'oklch(0.60 0.008 50)' }}
              >
                ← Volver al inicio
              </a>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
