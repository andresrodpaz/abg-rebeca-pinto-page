'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Phone,
  Mail,
  MessageSquare,
  RefreshCw,
  Search,
  Calendar,
  Filter,
  User,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Eye,
  X
} from 'lucide-react'

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

const STATUS_CONFIG: Record<string, { label: string; badgeClass: string; icon: any }> = {
  pending: {
    label: 'Pendiente',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-300/60 ring-1 ring-amber-500/20',
    icon: Clock,
  },
  confirmed: {
    label: 'Confirmada',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300/60 ring-1 ring-emerald-500/20',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Cancelada',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-300/60 ring-1 ring-rose-500/20',
    icon: XCircle,
  },
}

function formatDateEs(dateStr: string | null) {
  if (!dateStr) return 'Fecha por acordar'
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<AppointmentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<number | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAppt, setSelectedAppt] = useState<AppointmentRow | null>(null)

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
      if (selectedAppt && selectedAppt.id === id) {
        setSelectedAppt(prev => (prev ? { ...prev, status } : null))
      }
    } finally {
      setUpdating(null)
    }
  }

  // Filter and search logic
  const filteredAppointments = appointments.filter(a => {
    const matchesFilter = filter === 'all' ? true : a.status === filter
    const matchesSearch =
      a.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.clientPhone.includes(searchTerm) ||
      a.migratorySituation.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const counts = {
    all: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  }

  const generateWhatsAppLink = (appt: AppointmentRow) => {
    const cleanPhone = appt.clientPhone.replace(/\D/g, '')
    const fullPhone = cleanPhone.startsWith('34') ? cleanPhone : `34${cleanPhone}`
    const dateFormatted = appt.slotDate ? formatDateEs(appt.slotDate) : 'la fecha seleccionada'
    const timeFormatted = appt.slotTime ? `${appt.slotTime.slice(0, 5)} h` : ''
    const text = encodeURIComponent(
      `Hola ${appt.clientName}, te escribo del despacho de la Abogada Rebeca Pinto Camacho respecto a tu solicitud de cita para ${appt.migratorySituation} el ${dateFormatted} a las ${timeFormatted}. ¿En qué podemos ayudarte?`
    )
    return `https://wa.me/${fullPhone}?text=${text}`
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-3xl font-bold text-charcoal tracking-tight">Gestión de Citas</h1>
            <span className="bg-garnet/10 text-garnet text-xs font-semibold px-2.5 py-0.5 rounded-full border border-garnet/20">
              Despacho Rebeca Pinto
            </span>
          </div>
          <p className="text-warm-gray text-sm mt-1">
            Revisa, confirma y gestiona las solicitudes de consultas presenciales y online (50€ — 60 min).
          </p>
        </div>

        <button
          onClick={fetchAppointments}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-border text-charcoal text-sm font-medium rounded-xl hover:bg-cream-dark hover:border-garnet/30 transition-all shadow-2xs self-start md:self-auto"
        >
          <RefreshCw className={`w-4 h-4 text-garnet ${loading ? 'animate-spin' : ''}`} />
          <span>Actualizar Citas</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            key: 'all',
            label: 'Total Citas',
            count: counts.all,
            bg: 'bg-white',
            borderColor: filter === 'all' ? 'border-garnet ring-2 ring-garnet/20' : 'border-border',
            textColor: 'text-charcoal',
            subText: 'Todas las solicitudes',
          },
          {
            key: 'pending',
            label: 'Pendientes',
            count: counts.pending,
            bg: 'bg-amber-50/50',
            borderColor: filter === 'pending' ? 'border-amber-600 ring-2 ring-amber-500/20' : 'border-amber-200/80',
            textColor: 'text-amber-900',
            subText: 'Por confirmar pago',
          },
          {
            key: 'confirmed',
            label: 'Confirmadas',
            count: counts.confirmed,
            bg: 'bg-emerald-50/50',
            borderColor: filter === 'confirmed' ? 'border-emerald-600 ring-2 ring-emerald-500/20' : 'border-emerald-200/80',
            textColor: 'text-emerald-900',
            subText: 'Citas programadas',
          },
          {
            key: 'cancelled',
            label: 'Canceladas',
            count: counts.cancelled,
            bg: 'bg-rose-50/50',
            borderColor: filter === 'cancelled' ? 'border-rose-600 ring-2 ring-rose-500/20' : 'border-rose-200/80',
            textColor: 'text-rose-900',
            subText: 'Citas descartadas',
          },
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key as any)}
            className={`p-5 rounded-2xl border text-left transition-all hover:shadow-md cursor-pointer ${item.bg} ${item.borderColor}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-warm-gray uppercase tracking-wider">{item.label}</span>
              {item.key === 'pending' && counts.pending > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              )}
            </div>
            <div className={`text-3xl font-serif font-bold mt-2 ${item.textColor}`}>{item.count}</div>
            <p className="text-[11px] text-warm-gray/80 mt-1 font-sans">{item.subText}</p>
          </button>
        ))}
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white border border-border/80 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Box */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-gray/60" />
          <input
            type="text"
            placeholder="Buscar por cliente, email, teléfono o trámite..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-cream-dark/30 border border-border rounded-xl text-sm font-sans text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-garnet"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-warm-gray hover:text-charcoal"
            >
              Borrar
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs text-warm-gray font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Estado:
          </span>
          {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filter === st
                  ? 'bg-garnet text-cream shadow-2xs'
                  : 'bg-cream-dark/40 text-warm-gray hover:bg-cream-dark hover:text-charcoal'
              }`}
            >
              {st === 'all' ? 'Todas' : STATUS_CONFIG[st]?.label} ({counts[st]})
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-border/80 rounded-2xl">
          <Loader2 className="w-9 h-9 animate-spin text-garnet mb-3" />
          <p className="text-sm font-medium text-warm-gray">Cargando la lista de citas...</p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="text-center py-20 bg-white border border-border/80 rounded-2xl p-8">
          <div className="w-12 h-12 rounded-full bg-cream-dark flex items-center justify-center mx-auto text-warm-gray mb-3">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-charcoal">No se encontraron citas</h3>
          <p className="text-xs text-warm-gray mt-1 max-w-sm mx-auto">
            {searchTerm
              ? `Ninguna cita coincide con "${searchTerm}". Revisa la búsqueda o limpia el filtro.`
              : 'No hay solicitudes registradas con este estado.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map(appt => {
            const statusInfo = STATUS_CONFIG[appt.status] || STATUS_CONFIG.pending
            const StatusIcon = statusInfo.icon

            return (
              <div
                key={appt.id}
                className="bg-white border border-border/90 rounded-2xl p-5 md:p-6 shadow-2xs hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Info Column */}
                  <div className="flex-1 space-y-3">
                    {/* Header line: Name & Status */}
                    <div className="flex items-start justify-between sm:justify-start sm:items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-garnet/10 text-garnet font-bold flex items-center justify-center text-sm border border-garnet/20 shrink-0">
                          {appt.clientName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-serif text-xl font-bold text-charcoal leading-tight">
                            {appt.clientName}
                          </h3>
                          <p className="text-[11px] text-warm-gray">Ref #{appt.id} · Creada el {new Date(appt.createdAt).toLocaleDateString('es-ES')}</p>
                        </div>
                      </div>

                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.badgeClass}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusInfo.label}
                      </span>
                    </div>

                    {/* Contact & Date row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs">
                      {/* Date & Hour Pill */}
                      <div className="bg-cream-dark/50 border border-border/60 rounded-xl p-3 flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-garnet shrink-0" />
                        <div>
                          <p className="text-[10px] text-warm-gray uppercase font-semibold">Cita Programada</p>
                          <p className="font-medium text-charcoal">
                            {appt.slotDate ? formatDateEs(appt.slotDate) : 'Pendiente'}
                          </p>
                          {appt.slotTime && (
                            <span className="inline-block mt-0.5 text-[11px] font-bold text-garnet">
                              Hora: {appt.slotTime.slice(0, 5)} h (60 min)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Phone Pill */}
                      <div className="bg-cream-dark/50 border border-border/60 rounded-xl p-3 flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[10px] text-warm-gray uppercase font-semibold">Teléfono / WhatsApp</p>
                          <a href={`tel:${appt.clientPhone}`} className="font-medium text-charcoal hover:text-garnet block truncate">
                            {appt.clientPhone}
                          </a>
                          <a
                            href={generateWhatsAppLink(appt)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:underline mt-0.5"
                          >
                            Contactar WhatsApp <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      {/* Email Pill */}
                      <div className="bg-cream-dark/50 border border-border/60 rounded-xl p-3 flex items-center gap-2.5 sm:col-span-2 lg:col-span-1">
                        <Mail className="w-4 h-4 text-garnet shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[10px] text-warm-gray uppercase font-semibold">Email de Contacto</p>
                          <a href={`mailto:${appt.clientEmail}`} className="font-medium text-charcoal hover:text-garnet block truncate">
                            {appt.clientEmail}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Situation Tag */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs text-warm-gray font-medium">Asunto:</span>
                      <span className="bg-garnet/10 text-garnet font-semibold text-xs px-3 py-1 rounded-full border border-garnet/20">
                        {appt.migratorySituation}
                      </span>
                    </div>

                    {/* Message box */}
                    {appt.message && (
                      <div className="bg-cream-dark/30 border border-border/60 rounded-xl p-3 text-xs text-warm-gray flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-garnet/60 shrink-0 mt-0.5" />
                        <p className="italic text-charcoal/90 leading-relaxed">"{appt.message}"</p>
                      </div>
                    )}
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-stretch gap-2 border-t lg:border-t-0 lg:border-l border-border/60 pt-4 lg:pt-0 lg:pl-6 shrink-0 justify-end">
                    <button
                      onClick={() => setSelectedAppt(appt)}
                      className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-cream-dark text-charcoal text-xs font-semibold rounded-xl hover:bg-cream-dark/80 transition-colors border border-border"
                    >
                      <Eye className="w-3.5 h-3.5 text-garnet" /> Detalle
                    </button>

                    {appt.status !== 'confirmed' && (
                      <button
                        onClick={() => updateStatus(appt.id, 'confirmed')}
                        disabled={updating === appt.id}
                        className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-700 text-white text-xs font-semibold rounded-xl hover:bg-emerald-800 transition-colors shadow-2xs disabled:opacity-60"
                      >
                        {updating === appt.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                        Confirmar
                      </button>
                    )}

                    {appt.status !== 'cancelled' && (
                      <button
                        onClick={() => updateStatus(appt.id, 'cancelled')}
                        disabled={updating === appt.id}
                        className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-rose-600 text-white text-xs font-semibold rounded-xl hover:bg-rose-700 transition-colors shadow-2xs disabled:opacity-60"
                      >
                        {updating === appt.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                        Cancelar
                      </button>
                    )}

                    {appt.status !== 'pending' && (
                      <button
                        onClick={() => updateStatus(appt.id, 'pending')}
                        disabled={updating === appt.id}
                        className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-border text-warm-gray text-xs font-semibold rounded-xl hover:bg-cream-dark transition-colors disabled:opacity-60"
                      >
                        <Clock className="w-3.5 h-3.5" /> Pendiente
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal Detail View */}
      {selectedAppt && (
        <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-border rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative space-y-6">
            <button
              onClick={() => setSelectedAppt(null)}
              className="absolute top-4 right-4 p-2 text-warm-gray hover:text-charcoal rounded-full hover:bg-cream-dark transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-garnet text-cream font-bold text-lg flex items-center justify-center shadow-xs">
                {selectedAppt.clientName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal">{selectedAppt.clientName}</h3>
                <span className="text-xs text-warm-gray">Referencia de Cita #{selectedAppt.id}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs font-sans border-t border-b border-border py-4">
              <div>
                <span className="text-warm-gray uppercase font-semibold">Cita:</span>
                <p className="text-sm font-semibold text-charcoal mt-0.5">
                  {selectedAppt.slotDate ? formatDateEs(selectedAppt.slotDate) : 'Sin fecha asignada'} — {selectedAppt.slotTime?.slice(0, 5)} h
                </p>
                <p className="text-garnet font-medium">Asesoría de 60 minutos — 50€</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-warm-gray uppercase font-semibold">Teléfono:</span>
                  <p className="text-sm font-semibold text-charcoal mt-0.5">{selectedAppt.clientPhone}</p>
                </div>
                <div>
                  <span className="text-warm-gray uppercase font-semibold">Email:</span>
                  <p className="text-sm font-semibold text-charcoal truncate mt-0.5">{selectedAppt.clientEmail}</p>
                </div>
              </div>

              <div>
                <span className="text-warm-gray uppercase font-semibold">Situación Migratoria / Trámite:</span>
                <p className="text-sm font-semibold text-garnet mt-0.5">{selectedAppt.migratorySituation}</p>
              </div>

              {selectedAppt.message && (
                <div>
                  <span className="text-warm-gray uppercase font-semibold">Mensaje o Comentario:</span>
                  <p className="text-xs bg-cream-dark p-3 rounded-xl text-charcoal mt-1 leading-relaxed">
                    {selectedAppt.message}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <a
                href={generateWhatsAppLink(selectedAppt)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 text-white text-xs font-semibold rounded-xl hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" /> Abrir WhatsApp
              </a>

              <button
                onClick={() => setSelectedAppt(null)}
                className="px-5 py-2.5 bg-cream-dark text-charcoal text-xs font-semibold rounded-xl hover:bg-cream-dark/80 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
