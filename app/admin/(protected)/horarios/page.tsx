'use client'

import { ConfirmModal } from '@/components/confirm-modal'

import { useState, useEffect, useCallback } from 'react'
import {
  Clock,
  Save,
  Calendar,
  Check,
  AlertCircle,
  Loader2,
  Sparkles,
  Sliders,
  CalendarX,
  Plus,
  Trash2,
  Sun,
  Sunset,
  Zap
} from 'lucide-react'

interface ScheduleConfig {
  startHour: string
  endHour: string
  slotDurationMinutes: number
  activeDays: number[]
  disabledDates: string[]
  disabledSlots: { date: string; time: string }[]
}

const WEEKDAYS = [
  { id: 1, label: 'Lunes', short: 'Lun' },
  { id: 2, label: 'Martes', short: 'Mar' },
  { id: 3, label: 'Miércoles', short: 'Mié' },
  { id: 4, label: 'Jueves', short: 'Jue' },
  { id: 5, label: 'Viernes', short: 'Vie' },
  { id: 6, label: 'Sábado', short: 'Sáb' },
  { id: 0, label: 'Domingo', short: 'Dom' },
]

export default function HorariosAdminPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [newDisabledDate, setNewDisabledDate] = useState('')

  const [form, setForm] = useState({
    startHour: '09:00',
    endHour: '18:00',
    slotDurationMinutes: 30,
    activeDays: [1, 2, 3, 4, 5],
    disabledDates: [] as string[],
  })

  const fetchConfig = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/horarios?t=${Date.now()}`, {
        cache: 'no-store'
      })
      const data = await res.json()
      if (data.config) {
        setForm({
          startHour: data.config.startHour || '09:00',
          endHour: data.config.endHour || '18:00',
          slotDurationMinutes: data.config.slotDurationMinutes || 30,
          activeDays: data.config.activeDays || [1, 2, 3, 4, 5],
          disabledDates: data.config.disabledDates || [],
        })
      }
    } catch {
      setMessage({ text: 'Error al cargar la configuración de horarios', type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchConfig()
  }, [fetchConfig])

  const triggerSave = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirm(true)
  }

  const handleSave = async () => {
    setShowConfirm(false)
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch('/api/admin/horarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage({
          text: 'Configuración de horarios guardada. Los bloques de reserva en la web pública se han actualizado.',
          type: 'success',
        })
      } else {
        setMessage({ text: data.error || 'Error al guardar', type: 'error' })
      }
    } catch {
      setMessage({ text: 'Error de conexión al guardar', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const toggleDay = (dayId: number) => {
    setForm(f => {
      const exists = f.activeDays.includes(dayId)
      const activeDays = exists ? f.activeDays.filter(d => d !== dayId) : [...f.activeDays, dayId]
      return { ...f, activeDays }
    })
  }

  const applyPreset = (start: string, end: string, duration = 30) => {
    setForm(f => ({ ...f, startHour: start, endHour: end, slotDurationMinutes: duration }))
  }

  const addDisabledDate = () => {
    if (!newDisabledDate) return
    if (form.disabledDates.includes(newDisabledDate)) return
    setForm(f => ({ ...f, disabledDates: [...f.disabledDates, newDisabledDate].sort() }))
    setNewDisabledDate('')
  }

  const removeDisabledDate = (dateToRemove: string) => {
    setForm(f => ({ ...f, disabledDates: f.disabledDates.filter(d => d !== dateToRemove) }))
  }

  // Calculate preview blocks
  const morningTimes: string[] = []
  const afternoonTimes: string[] = []

  if (form.startHour && form.endHour) {
    const [sh, sm] = form.startHour.split(':').map(Number)
    const [eh, em] = form.endHour.split(':').map(Number)
    let cur = sh * 60 + (sm || 0)
    const end = eh * 60 + (em || 0)
    const step = Number(form.slotDurationMinutes) || 30

    while (cur + step <= end) {
      const h = Math.floor(cur / 60)
      const m = cur % 60
      const formatted = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      if (h < 14) {
        morningTimes.push(formatted)
      } else {
        afternoonTimes.push(formatted)
      }
      cur += step
    }
  }

  return (
    <div className="max-w-5xl space-y-8">
      {/* Header */}
      <div className="border-b border-border/60 pb-6">
        <h1 className="font-serif text-3xl font-bold text-charcoal">Horarios de Atención</h1>
        <p className="text-warm-gray text-sm mt-1">
          Define el rango horario de consulta presencial/online y la duración de los bloques de reserva.
        </p>
      </div>

      {/* Success/Error Toast Message */}
      {message && (
        <div
          className={`p-4 rounded-2xl text-sm font-sans flex items-center justify-between gap-3 border shadow-xs animate-in fade-in slide-in-from-top-2 ${
            message.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-3">
            {message.type === 'success' ? (
              <Check className="w-5 h-5 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
          <button
            onClick={() => setMessage(null)}
            className="text-xs opacity-70 hover:opacity-100 underline"
          >
            Cerrar
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24 bg-white border border-border rounded-2xl">
          <Loader2 className="w-8 h-8 animate-spin text-garnet" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left / Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Presets */}
            <div className="bg-white border border-border/80 rounded-2xl p-6 shadow-2xs space-y-3">
              <span className="text-xs font-semibold text-warm-gray uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-gold" /> Plantillas Rápidas de Horario
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => applyPreset('09:00', '18:00', 30)}
                  className="px-4 py-3 rounded-xl border border-border bg-cream-dark/30 hover:border-garnet/40 hover:bg-cream-dark text-left transition-all group"
                >
                  <p className="text-xs font-bold text-charcoal group-hover:text-garnet">Jornada Completa</p>
                  <p className="text-[11px] text-warm-gray mt-0.5">09:00 - 18:00 h (30m)</p>
                </button>

                <button
                  type="button"
                  onClick={() => applyPreset('09:00', '14:00', 30)}
                  className="px-4 py-3 rounded-xl border border-border bg-cream-dark/30 hover:border-garnet/40 hover:bg-cream-dark text-left transition-all group"
                >
                  <p className="text-xs font-bold text-charcoal group-hover:text-garnet">Turno Mañanas</p>
                  <p className="text-[11px] text-warm-gray mt-0.5">09:00 - 14:00 h (30m)</p>
                </button>

                <button
                  type="button"
                  onClick={() => applyPreset('08:30', '15:00', 60)}
                  className="px-4 py-3 rounded-xl border border-border bg-cream-dark/30 hover:border-garnet/40 hover:bg-cream-dark text-left transition-all group"
                >
                  <p className="text-xs font-bold text-charcoal group-hover:text-garnet">Intensiva 60 min</p>
                  <p className="text-[11px] text-warm-gray mt-0.5">08:30 - 15:00 h (60m)</p>
                </button>
              </div>
            </div>

            {/* Main Configuration Form */}
            <div className="bg-white border border-border/80 rounded-2xl p-6 md:p-8 shadow-2xs space-y-6">
              <h2 className="font-serif text-xl font-bold text-charcoal flex items-center gap-2 border-b border-border/60 pb-4">
                <Sliders className="w-5 h-5 text-garnet" />
                Configurar Horario y Días Laborables
              </h2>

              <form onSubmit={triggerSave} className="space-y-6">
                {/* Hours Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wider">
                      Hora de Apertura / Inicio
                    </label>
                    <select
                      value={form.startHour}
                      onChange={e => setForm(f => ({ ...f, startHour: e.target.value }))}
                      className="w-full px-4 py-3 border border-border rounded-xl bg-cream-dark/30 text-charcoal font-sans text-sm font-medium focus:outline-none focus:ring-2 focus:ring-garnet"
                    >
                      {['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'].map(t => (
                        <option key={t} value={t}>
                          {t} hrs
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wider">
                      Hora de Cierre / Fin
                    </label>
                    <select
                      value={form.endHour}
                      onChange={e => setForm(f => ({ ...f, endHour: e.target.value }))}
                      className="w-full px-4 py-3 border border-border rounded-xl bg-cream-dark/30 text-charcoal font-sans text-sm font-medium focus:outline-none focus:ring-2 focus:ring-garnet"
                    >
                      {['14:00', '15:00', '16:00', '17:00', '18:00', '18:30', '19:00', '19:30', '20:00'].map(t => (
                        <option key={t} value={t}>
                          {t} hrs
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Duration Picker */}
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wider">
                    Intervalo de los Bloques de Cita
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { minutes: 30, title: '30 Minutos (Recomendado)', sub: 'Genera bloques cada 30 min' },
                      { minutes: 60, title: '60 Minutos', sub: 'Genera bloques cada hora' },
                    ].map(item => (
                      <button
                        key={item.minutes}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, slotDurationMinutes: item.minutes }))}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          form.slotDurationMinutes === item.minutes
                            ? 'border-garnet bg-garnet/10 text-garnet ring-1 ring-garnet/20'
                            : 'border-border bg-white text-warm-gray hover:border-garnet/30'
                        }`}
                      >
                        <p className="text-xs font-bold">{item.title}</p>
                        <p className="text-[11px] opacity-80 mt-0.5">{item.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weekday Selector */}
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wider">
                    Días Activos para Citas
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {WEEKDAYS.map(w => {
                      const isActive = form.activeDays.includes(w.id)
                      return (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => toggleDay(w.id)}
                          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                            isActive
                              ? 'border-garnet bg-garnet text-cream shadow-2xs'
                              : 'border-border bg-cream-dark/30 text-warm-gray hover:border-garnet/40'
                          }`}
                        >
                          {w.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Blocked / Holiday Dates Section */}
                <div className="pt-4 border-t border-border/60 space-y-4">
                  <div>
                    <span className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <CalendarX className="w-4 h-4 text-rose-600" /> Días Inhabilitados (Festivos / Vacaciones)
                    </span>
                    <p className="text-xs text-warm-gray">Añade fechas específicas en las que el despacho estará cerrado.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={newDisabledDate}
                      onChange={e => setNewDisabledDate(e.target.value)}
                      className="px-3.5 py-2 border border-border rounded-xl bg-cream-dark/30 text-xs font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-garnet"
                    />
                    <button
                      type="button"
                      onClick={addDisabledDate}
                      disabled={!newDisabledDate}
                      className="inline-flex items-center gap-1 px-4 py-2 bg-charcoal text-cream text-xs font-semibold rounded-xl hover:bg-black transition-colors disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" /> Bloquear Fecha
                    </button>
                  </div>

                  {form.disabledDates.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {form.disabledDates.map(dateStr => (
                        <span
                          key={dateStr}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-full text-xs font-medium"
                        >
                          {dateStr}
                          <button
                            type="button"
                            onClick={() => removeDisabledDate(dateStr)}
                            className="hover:text-rose-900"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <div className="pt-6 border-t border-border flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-garnet text-cream text-sm font-semibold rounded-xl hover:bg-garnet-dark transition-all shadow-md disabled:opacity-60"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-gold" />}
                    {saving ? 'Guardando Cambios…' : 'Guardar Configuración'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right / Live Preview Column */}
          <div className="space-y-6">
            <div className="bg-white border border-border/80 rounded-2xl p-6 shadow-2xs space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold" />
                  Vista Previa de Horarios
                </h3>
                <p className="text-xs text-warm-gray mt-1">
                  Bloques que se mostrarán en el selector de la web pública:
                </p>
              </div>

              {/* Morning Blocks */}
              {morningTimes.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-charcoal uppercase tracking-wider flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-amber-500" /> Turno Mañana ({morningTimes.length})
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {morningTimes.map(t => (
                      <div
                        key={t}
                        className="px-3 py-2 bg-cream-dark/40 border border-border/70 rounded-xl text-xs font-semibold text-charcoal text-center"
                      >
                        {t} h
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Afternoon Blocks */}
              {afternoonTimes.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border/60">
                  <span className="text-[11px] font-bold text-charcoal uppercase tracking-wider flex items-center gap-1">
                    <Sunset className="w-3.5 h-3.5 text-orange-500" /> Turno Tarde ({afternoonTimes.length})
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {afternoonTimes.map(t => (
                      <div
                        key={t}
                        className="px-3 py-2 bg-cream-dark/40 border border-border/70 rounded-xl text-xs font-semibold text-charcoal text-center"
                      >
                        {t} h
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-border text-xs text-warm-gray flex items-center justify-between font-medium">
                <span>Total por día laborable:</span>
                <span className="font-bold text-garnet text-sm">
                  {morningTimes.length + afternoonTimes.length} bloques
                </span>
              </div>
            </div>

            {/* Sincronización Realtime Box */}
            <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5 text-xs text-amber-900 leading-relaxed font-sans space-y-1.5">
              <span className="font-bold flex items-center gap-1.5 text-amber-950">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Actualización Automática
              </span>
              <p>
                Cualquier cambio guardado afectará inmediatamente al calendario de reservas en la web pública para todos los días laborales habilitados.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleSave}
        title="Guardar Configuración"
        message="Vas a aplicar esta configuración de horarios en tu web. ¿Estás seguro de que quieres continuar?"
        confirmText="Guardar"
        cancelText="Cancelar"
        variant="warning"
        isLoading={saving}
      />
    </div>
  )
}
