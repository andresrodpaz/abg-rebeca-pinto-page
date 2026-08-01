'use client'

import { useState, useEffect, useCallback } from 'react'
import { CheckCircle, XCircle, Clock, Loader2, Phone, Mail, MessageSquare, RefreshCw } from 'lucide-react'

type AppointmentRow = {
  id: number
  clientName: string
  clientEmail: string
  clientPhone: string
  migratorySituation: string
  message: string | null
  status: string
  createdAt: string
  slotDate: string | null
  slotTime: string | null
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending:   { label: 'Pendiente',   color: 'bg-amber-100 text-amber-700 border-amber-200' },
  confirmed: { label: 'Confirmada',  color: 'bg-green-100 text-green-700 border-green-200' },
  cancelled: { label: 'Cancelada',   color: 'bg-red-100 text-red-700 border-red-200' },
}

function formatDateEs(dateStr: string | null) {
  if (!dateStr) return '—'
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-ES', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  })
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<AppointmentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<number | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')

  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/citas')
      const data = await res.json()
      setAppointments(data.appointments ?? [])
    } catch {
      setAppointments([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  const updateStatus = async (id: number, status: string) => {
    setUpdating(id)
    try {
      await fetch('/api/admin/citas', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      setAppointments(prev =>
        prev.map(a => (a.id === id ? { ...a, status } : a))
      )
    } finally {
      setUpdating(null)
    }
  }

  const filtered = filter === 'all' ? appointments : appointments.filter(a => a.status === filter)

  const counts = {
    all: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl text-charcoal font-semibold">Citas</h1>
          <p className="text-warm-gray text-sm mt-1">Gestiona las solicitudes de consulta</p>
        </div>
        <button
          onClick={fetchAppointments}
          className="flex items-center gap-2 px-4 py-2 border border-border text-charcoal text-sm rounded-lg hover:bg-cream-dark transition-colors"
          aria-label="Actualizar"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Actualizar</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-3 rounded-xl border text-left transition-all ${
              filter === s
                ? 'border-garnet bg-garnet text-cream shadow-sm'
                : 'border-border bg-white text-charcoal hover:border-garnet/30'
            }`}
          >
            <div className={`text-2xl font-serif font-semibold ${filter === s ? 'text-cream' : 'text-charcoal'}`}>
              {counts[s]}
            </div>
            <div className={`text-xs mt-0.5 ${filter === s ? 'text-cream/70' : 'text-warm-gray'}`}>
              {s === 'all' ? 'Total' : STATUS_CONFIG[s]?.label}
            </div>
          </button>
        ))}
      </div>

      {/* Table / Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-garnet" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-warm-gray text-sm">
          No hay citas {filter !== 'all' ? `con estado "${STATUS_CONFIG[filter]?.label}"` : ''}.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map(appt => (
            <div
              key={appt.id}
              className="bg-white border border-border rounded-xl p-5 md:p-6 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                {/* Client info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h2 className="font-serif text-lg text-charcoal font-semibold">{appt.clientName}</h2>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_CONFIG[appt.status]?.color}`}>
                      {appt.status === 'pending' && <Clock className="w-3 h-3" />}
                      {appt.status === 'confirmed' && <CheckCircle className="w-3 h-3" />}
                      {appt.status === 'cancelled' && <XCircle className="w-3 h-3" />}
                      {STATUS_CONFIG[appt.status]?.label ?? appt.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-warm-gray mb-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-garnet/60 shrink-0" />
                      <a href={`mailto:${appt.clientEmail}`} className="hover:text-garnet truncate">{appt.clientEmail}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-garnet/60 shrink-0" />
                      <a href={`tel:${appt.clientPhone}`} className="hover:text-garnet">{appt.clientPhone}</a>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="bg-cream-dark text-charcoal px-2.5 py-1 rounded-full">
                      {appt.migratorySituation}
                    </span>
                    {appt.slotDate && (
                      <span className="bg-garnet/8 text-garnet px-2.5 py-1 rounded-full font-semibold">
                        {formatDateEs(appt.slotDate)} · {appt.slotTime?.slice(0, 5)} h
                      </span>
                    )}
                  </div>

                  {appt.message && (
                    <div className="flex items-start gap-2 mt-3 text-sm text-warm-gray bg-cream-dark rounded-lg px-3 py-2">
                      <MessageSquare className="w-3.5 h-3.5 text-warm-gray/50 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{appt.message}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                  {appt.status !== 'confirmed' && (
                    <button
                      onClick={() => updateStatus(appt.id, 'confirmed')}
                      disabled={updating === appt.id}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60"
                    >
                      {updating === appt.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                      Confirmar
                    </button>
                  )}
                  {appt.status !== 'cancelled' && (
                    <button
                      onClick={() => updateStatus(appt.id, 'cancelled')}
                      disabled={updating === appt.id}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60"
                    >
                      {updating === appt.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                      Cancelar
                    </button>
                  )}
                  {appt.status !== 'pending' && (
                    <button
                      onClick={() => updateStatus(appt.id, 'pending')}
                      disabled={updating === appt.id}
                      className="flex items-center gap-1.5 px-3.5 py-2 border border-border text-charcoal text-xs font-semibold rounded-lg hover:bg-cream-dark transition-colors disabled:opacity-60"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      Pendiente
                    </button>
                  )}
                </div>
              </div>

              <p className="mt-3 text-xs text-warm-gray/50 border-t border-border pt-3">
                Recibida el {new Date(appt.createdAt).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })} · Ref #{appt.id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
