'use client'

import { useState, useEffect, useCallback } from 'react'
import { ConfirmModal } from '@/components/confirm-modal'
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
  ArrowUpRight,
  Eye,
  X,
  Trash2,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Bell,
} from 'lucide-react'

// Rebeca's own WhatsApp number (E.164 without +)
const REBECA_WA = '34687202499'

// ── Real bank details ────────────────────────────────────────────────────────
const IBAN = 'ES46 2100 2202 6002 0055 8272'
const BANCO = 'Caixabank'
const TITULAR = 'Rebeca Andreina Pinto Camacho'
const BIZUM = '687202499'
const BIZUM_DISPLAY = '687 20 24 99'

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

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: any }> = {
  pending: {
    label: 'Pendiente',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: Clock,
  },
  confirmed: {
    label: 'Confirmada',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Cancelada',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    icon: XCircle,
  },
}

// ── Date helpers ─────────────────────────────────────────────────────────────
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

function formatCreatedAt(raw: string | null): string {
  if (!raw) return '—'
  try {
    const normalised = raw.replace(' ', 'T')
    const d = new Date(normalised)
    if (isNaN(d.getTime())) return '—'
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return '—'
  }
}

// ── WhatsApp URL builders ────────────────────────────────────────────────────
function clientWaNum(appt: AppointmentRow) {
  const clean = appt.clientPhone.replace(/\D/g, '')
  return clean.startsWith('34') ? clean : `34${clean}`
}

function waGreet(appt: AppointmentRow) {
  const date = appt.slotDate ? formatDateEs(appt.slotDate) : 'la fecha acordada'
  const time = appt.slotTime ? ` a las ${appt.slotTime.slice(0, 5)} h` : ''
  const text = [
    `Hola ${appt.clientName}, te contacto del despacho de la Abogada Rebeca Pinto Camacho.`,
    '',
    `He revisado tu solicitud de cita para el ${date}${time} sobre: ${appt.migratorySituation}.`,
    '',
    '¿Tienes alguna pregunta antes de tu consulta? Estoy aquí para ayudarte.',
  ].join('\n')
  return `https://wa.me/${clientWaNum(appt)}?text=${encodeURIComponent(text)}`
}

function waConfirmPayment(appt: AppointmentRow) {
  const date = appt.slotDate ? formatDateEs(appt.slotDate) : 'la fecha acordada'
  const time = appt.slotTime ? `${appt.slotTime.slice(0, 5)} h` : ''
  const text = [
    `Hola ${appt.clientName},`,
    '',
    'Te confirmo tu cita en el despacho de Rebeca Pinto Camacho:',
    `Fecha: ${date}`,
    ...(time ? [`Hora: ${time}`] : []),
    `Consulta: ${appt.migratorySituation}`,
    '',
    'Para que quede confirmada, realiza el pago de *50 €*:',
    '',
    `Banco: ${BANCO}`,
    `Titular: ${TITULAR}`,
    `IBAN: ${IBAN}`,
    `Bizum: ${BIZUM_DISPLAY}`,
    `Concepto: Consulta ${appt.clientName}`,
    '',
    'Envíame el comprobante cuando lo tengas y confirmo definitivamente tu cita. ¡Gracias!',
  ].join('\n')
  return `https://wa.me/${clientWaNum(appt)}?text=${encodeURIComponent(text)}`
}

function waPaymentOnly(appt: AppointmentRow) {
  const text = [
    `Hola ${appt.clientName},`,
    '',
    'Aquí tienes los datos para realizar el pago de la consulta *50 €*:',
    '',
    `Banco: ${BANCO}`,
    `Titular: ${TITULAR}`,
    `IBAN: ${IBAN}`,
    `Bizum: ${BIZUM_DISPLAY}`,
    `Concepto: Consulta ${appt.clientName}`,
    '',
    'Envíame el comprobante de pago cuando lo realices. ¡Gracias!',
  ].join('\n')
  return `https://wa.me/${clientWaNum(appt)}?text=${encodeURIComponent(text)}`
}

function waNotifyRebeca(appt: AppointmentRow) {
  const date = appt.slotDate ? formatDateEs(appt.slotDate) : 'Sin fecha'
  const time = appt.slotTime ? `${appt.slotTime.slice(0, 5)} h` : '-'
  const text = [
    'NUEVA RESERVA DE CITA',
    '',
    `Cliente: ${appt.clientName}`,
    `Fecha: ${date}`,
    `Hora: ${time}`,
    `Tramite: ${appt.migratorySituation}`,
    `Tel: ${appt.clientPhone}`,
    `Email: ${appt.clientEmail}`,
    ...(appt.message ? ['', `Nota: ${appt.message}`] : []),
  ].join('\n')
  return `https://wa.me/${REBECA_WA}?text=${encodeURIComponent(text)}`
}

function mailtoClient(appt: AppointmentRow) {
  const date = appt.slotDate ? formatDateEs(appt.slotDate) : 'la fecha acordada'
  const time = appt.slotTime ? ` a las ${appt.slotTime.slice(0, 5)} h` : ''
  const subject = encodeURIComponent('Confirmación de cita — Rebeca Pinto Camacho')
  const body = encodeURIComponent(
    [
      `Hola ${appt.clientName},`,
      '',
      `Te confirmo tu cita el ${date}${time} sobre: ${appt.migratorySituation}.`,
      '',
      'Para confirmarla, realiza el pago de 50 €:',
      '',
      `Banco: ${BANCO}`,
      `Titular: ${TITULAR}`,
      `IBAN: ${IBAN}`,
      `Bizum: ${BIZUM_DISPLAY}`,
      `Concepto: Consulta ${appt.clientName}`,
      '',
      'Envíame el comprobante de pago y te confirmaré definitivamente la cita.',
      '',
      'Un saludo,',
      'Rebeca Pinto Camacho',
      'Abogada — Extranjería, Residencia y Nacionalidad',
      `Tel: ${BIZUM_DISPLAY}`,
    ].join('\n')
  )
  return `mailto:${appt.clientEmail}?subject=${subject}&body=${body}`
}

// ── Appointment Card ─────────────────────────────────────────────────────────
function AppointmentCard({
  appt,
  updating,
  deleting,
  onView,
  onRequestAction,
}: {
  appt: AppointmentRow
  updating: number | null
  deleting: number | null
  onView: () => void
  onRequestAction: (action: 'confirm' | 'cancel' | 'delete' | 'pending', appt: AppointmentRow) => void
}) {
  const statusInfo = STATUS_CONFIG[appt.status] || STATUS_CONFIG.pending
  const StatusIcon = statusInfo.icon
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="bg-white rounded-2xl border border-border/60 shadow-sm hover:shadow-lg hover:border-garnet/25 transition-all duration-200 overflow-hidden">
      <div className="flex">
        {/* Status bar */}
        <div
          className={`w-1.5 shrink-0 ${
            appt.status === 'confirmed'
              ? 'bg-emerald-500'
              : appt.status === 'cancelled'
              ? 'bg-rose-500'
              : 'bg-amber-400'
          }`}
        />

        <div className="flex-1 p-4 sm:p-5">
          {/* Top row */}
          <div className="flex flex-wrap items-start gap-3 justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-garnet to-garnet-dark text-cream font-serif font-bold text-base flex items-center justify-center shrink-0 shadow-md shadow-garnet/20">
                {appt.clientName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-lg font-bold text-charcoal leading-tight truncate">
                  {appt.clientName}
                </h3>
                <p className="text-[11px] text-warm-gray font-sans mt-0.5">
                  Ref&nbsp;#{appt.id} · Recibida el {formatCreatedAt(appt.createdAt)}
                </p>
              </div>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border shadow-sm shrink-0 ${statusInfo.bg} ${statusInfo.color} ${statusInfo.border}`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              {statusInfo.label}
            </span>
          </div>

          {/* Info pills */}
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-sans">
            <div className="flex items-center gap-1.5 bg-cream-dark border border-border rounded-lg px-2.5 py-1.5">
              <Calendar className="w-3.5 h-3.5 text-garnet shrink-0" />
              <span className="text-charcoal font-medium">
                {appt.slotDate ? formatDateEs(appt.slotDate) : 'Fecha pendiente'}
                {appt.slotTime && (
                  <span className="text-garnet font-bold"> · {appt.slotTime.slice(0, 5)} h</span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-garnet text-cream rounded-lg px-2.5 py-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cream shrink-0" />
              <span className="font-semibold">{appt.migratorySituation}</span>
            </div>
          </div>

          {/* Expandable trigger */}
          <button
            onClick={() => setExpanded(e => !e)}
            className="mt-3 flex items-center gap-1 text-[11px] text-warm-gray hover:text-garnet font-sans font-medium transition-colors"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {expanded ? 'Ocultar detalles' : 'Ver contacto y acciones'}
          </button>

          {expanded && (
            <div className="mt-3 pt-3 border-t border-border/40 space-y-3 font-sans">
              {/* Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${appt.clientPhone}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cream-dark border border-border text-charcoal hover:text-garnet hover:border-garnet/40 hover:bg-garnet/5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-garnet shrink-0" />
                  <span className="truncate font-medium">{appt.clientPhone}</span>
                </a>
                <a
                  href={`mailto:${appt.clientEmail}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cream-dark border border-border text-charcoal hover:text-garnet hover:border-garnet/40 hover:bg-garnet/5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-garnet shrink-0" />
                  <span className="truncate font-medium">{appt.clientEmail}</span>
                </a>
              </div>

              {/* Message */}
              {appt.message && (
                <div className="flex gap-2 bg-cream-dark border border-border rounded-xl p-3 text-xs text-charcoal/80">
                  <MessageSquare className="w-3.5 h-3.5 text-garnet shrink-0 mt-0.5" />
                  <p className="italic leading-relaxed">"{appt.message}"</p>
                </div>
              )}

              {/* Quick actions */}
              <div className="flex flex-wrap gap-1.5">
                <a
                  href={waGreet(appt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-white shadow-sm transition-transform hover:scale-[1.03]"
                  style={{ background: '#25D366' }}
                >
                  Saludar
                </a>
                <a
                  href={waConfirmPayment(appt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-white shadow-sm transition-transform hover:scale-[1.03]"
                  style={{ background: '#128C7E' }}
                >
                  Confirmar + datos pago
                </a>
                <a
                  href={waPaymentOnly(appt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 transition-colors"
                >
                  <CreditCard className="w-3 h-3" /> Enviar datos de pago
                </a>
                <a
                  href={mailtoClient(appt)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-garnet text-cream shadow-sm hover:bg-garnet-dark transition-colors"
                >
                  <Mail className="w-3 h-3" /> Email
                </a>
                <a
                  href={waNotifyRebeca(appt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-amber-500 text-white shadow-sm hover:bg-amber-400 transition-colors"
                >
                  <Bell className="w-3 h-3" /> Notificarme
                </a>
              </div>

              {/* Status + delete actions */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
                <button
                  onClick={onView}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white text-charcoal border border-border hover:border-garnet/40 hover:text-garnet transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-garnet" /> Detalle
                </button>

                {appt.status !== 'confirmed' && (
                  <button
                    onClick={() => onRequestAction('confirm', appt)}
                    disabled={updating === appt.id}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-600 text-white shadow-sm hover:bg-emerald-500 transition-colors disabled:opacity-60"
                  >
                    {updating === appt.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                    Confirmar
                  </button>
                )}

                {appt.status !== 'cancelled' && (
                  <button
                    onClick={() => onRequestAction('cancel', appt)}
                    disabled={updating === appt.id}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-rose-600 text-white shadow-sm hover:bg-rose-500 transition-colors disabled:opacity-60"
                  >
                    {updating === appt.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3 h-3" />}
                    Cancelar
                  </button>
                )}

                {appt.status !== 'pending' && (
                  <button
                    onClick={() => onRequestAction('pending', appt)}
                    disabled={updating === appt.id}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors disabled:opacity-60"
                  >
                    <Clock className="w-3 h-3" /> Pendiente
                  </button>
                )}

                {/* Delete */}
                <button
                  onClick={() => onRequestAction('delete', appt)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-rose-300 text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-3 h-3" /> Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

// ── Detail Modal ─────────────────────────────────────────────────────────────
function DetailModal({
  appt,
  updating,
  onClose,
  onRequestAction,
}: {
  appt: AppointmentRow
  updating: number | null
  onClose: () => void
  onRequestAction: (action: 'confirm' | 'cancel' | 'delete' | 'pending', appt: AppointmentRow) => void
}) {
  const statusInfo = STATUS_CONFIG[appt.status] || STATUS_CONFIG.pending
  const StatusIcon = statusInfo.icon

  return (
    <div
      className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl">
        {/* Handle bar (mobile) */}
        <div className="sm:hidden w-10 h-1 rounded-full bg-border mx-auto mt-3 mb-1" />

        {/* Header con gradiente garnet */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border/50 bg-gradient-to-r from-garnet/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-garnet to-garnet-dark text-cream font-serif font-bold text-lg flex items-center justify-center shadow-md shadow-garnet/25">
              {appt.clientName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-charcoal">{appt.clientName}</h3>
              <span
                className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border shadow-sm ${statusInfo.bg} ${statusInfo.color} ${statusInfo.border}`}
              >
                <StatusIcon className="w-3 h-3" /> {statusInfo.label}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-warm-gray hover:text-garnet rounded-full hover:bg-garnet/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5 font-sans text-sm">
          {/* Cita info — garnet sólido */}
          <div className="bg-garnet text-cream rounded-2xl p-4 space-y-1 shadow-md shadow-garnet/20">
            <p className="text-[10px] text-cream/80 uppercase font-bold tracking-wider">Cita Programada</p>
            <p className="font-serif text-base font-bold">
              {appt.slotDate ? formatDateEs(appt.slotDate) : 'Sin fecha asignada'}
            </p>
            {appt.slotTime && (
              <p className="text-cream font-semibold">{appt.slotTime.slice(0, 5)} h · Consulta 60 min · 50 €</p>
            )}
            <p className="text-xs text-cream/75 mt-1">Ref #{appt.id} · Recibida el {formatCreatedAt(appt.createdAt)}</p>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-warm-gray uppercase font-semibold tracking-wider mb-1">Teléfono</p>
              <a href={`tel:${appt.clientPhone}`} className="font-semibold text-charcoal hover:text-garnet flex items-center gap-1 transition-colors">
                <Phone className="w-3.5 h-3.5 text-garnet" /> {appt.clientPhone}
              </a>
              <a
                href={`https://wa.me/${clientWaNum(appt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-emerald-600 font-semibold hover:underline flex items-center gap-0.5 mt-0.5"
              >
                WhatsApp <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-warm-gray uppercase font-semibold tracking-wider mb-1">Email</p>
              <a href={`mailto:${appt.clientEmail}`} className="font-semibold text-charcoal hover:text-garnet flex items-center gap-1 transition-colors truncate">
                <Mail className="w-3.5 h-3.5 text-garnet shrink-0" />
                <span className="truncate">{appt.clientEmail}</span>
              </a>
            </div>
          </div>

          {/* Trámite */}
          <div>
            <p className="text-[10px] text-warm-gray uppercase font-semibold tracking-wider mb-1">Trámite</p>
            <span className="inline-block bg-garnet text-cream font-bold text-sm px-3 py-1.5 rounded-full shadow-sm">
              {appt.migratorySituation}
            </span>
          </div>

          {/* Message */}
          {appt.message && (
            <div>
              <p className="text-[10px] text-warm-gray uppercase font-semibold tracking-wider mb-1">Mensaje</p>
              <p className="text-sm text-charcoal/90 bg-cream-dark border border-border rounded-xl p-3 italic leading-relaxed">
                "{appt.message}"
              </p>
            </div>
          )}

          {/* Datos de pago — indigo sólido */}
          <div className="bg-indigo-600 rounded-2xl p-4 space-y-1.5 shadow-md shadow-indigo-600/25">
            <p className="text-[10px] text-indigo-100 uppercase font-bold tracking-wider flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5" /> Datos de Pago
            </p>
            <p className="text-xs text-white font-mono font-semibold">{IBAN}</p>
            <p className="text-xs text-indigo-100">{BANCO} · {TITULAR}</p>
            <p className="text-xs text-indigo-100">Bizum: {BIZUM_DISPLAY}</p>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <p className="text-[10px] text-warm-gray uppercase font-semibold tracking-wider">Acciones rápidas</p>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={waGreet(appt)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm hover:brightness-105 transition-all"
                style={{ background: '#25D366' }}
              >
                Saludar
              </a>
              <a
                href={waConfirmPayment(appt)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm hover:brightness-105 transition-all"
                style={{ background: '#128C7E' }}
              >
                Confirmar + pago
              </a>
              <a
                href={waPaymentOnly(appt)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5" /> Datos de pago
              </a>
              <a
                href={mailtoClient(appt)}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-garnet text-cream shadow-sm hover:bg-garnet-dark transition-colors"
              >
                <Mail className="w-3.5 h-3.5" /> Email
              </a>
            </div>

            {/* Status change */}
            <div className="flex gap-2 pt-1">
              {appt.status !== 'confirmed' && (
                <button
                  onClick={() => onRequestAction('confirm', appt)}
                  disabled={updating === appt.id}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-emerald-500 disabled:opacity-60"
                >
                  {updating === appt.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                  Confirmar
                </button>
              )}
              {appt.status !== 'cancelled' && (
                <button
                  onClick={() => onRequestAction('cancel', appt)}
                  disabled={updating === appt.id}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-rose-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-rose-500 disabled:opacity-60"
                >
                  {updating === appt.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                  Cancelar
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-1 inline-flex items-center justify-center px-5 py-2.5 bg-cream-dark text-charcoal text-xs font-semibold rounded-xl border border-border hover:bg-border/50"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
type ConfirmActionData = {
  id: number
  action: 'confirm' | 'cancel' | 'delete' | 'pending'
  title: string
  message: string
  variant: 'primary' | 'warning' | 'danger'
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<AppointmentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<number | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)
  
  const [confirmAction, setConfirmAction] = useState<ConfirmActionData | null>(null)
  
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAppt, setSelectedAppt] = useState<AppointmentRow | null>(null)

  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/citas')
      const data = await res.json()
      if (!res.ok) console.error('[admin] API error:', res.status, data)
      setAppointments(data.appointments ?? [])
    } catch (err) {
      console.error('[admin] Network error:', err)
      setAppointments([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAppointments() }, [fetchAppointments])

  const updateStatus = async (id: number, status: string) => {
    setUpdating(id)
    try {
      await fetch('/api/admin/citas', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
      if (selectedAppt?.id === id) setSelectedAppt(prev => prev ? { ...prev, status } : null)
    } finally {
      setUpdating(null)
    }
  }

  const deleteAppointment = async (id: number) => {
    setDeleting(id)
    try {
      await fetch('/api/admin/citas', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      setAppointments(prev => prev.filter(a => a.id !== id))
      if (selectedAppt?.id === id) setSelectedAppt(null)
    } finally {
      setDeleting(null)
    }
  }

  const handleRequestAction = (action: 'confirm' | 'cancel' | 'delete' | 'pending', appt: AppointmentRow) => {
    if (action === 'delete') {
      setConfirmAction({
        id: appt.id, action, variant: 'danger',
        title: 'Eliminar Cita',
        message: `¿Estás seguro de que quieres eliminar la cita de ${appt.clientName}? Esta acción borrará la cita de forma permanente.`
      })
    } else if (action === 'confirm') {
      setConfirmAction({
        id: appt.id, action, variant: 'primary',
        title: 'Confirmar Cita',
        message: `Vas a confirmar la cita de ${appt.clientName}. Recuerda que este paso suele hacerse tras confirmar que se ha recibido el pago.`
      })
    } else if (action === 'cancel') {
      setConfirmAction({
        id: appt.id, action, variant: 'danger',
        title: 'Cancelar Cita',
        message: `Vas a cancelar la cita de ${appt.clientName}. El bloque horario volverá a quedar libre para nuevas reservas.`
      })
    } else {
      // Pending doesn't require modal confirmation
      updateStatus(appt.id, 'pending')
    }
  }

  const executeConfirmAction = async () => {
    if (!confirmAction) return
    if (confirmAction.action === 'delete') {
      await deleteAppointment(confirmAction.id)
    } else {
      await updateStatus(confirmAction.id, confirmAction.action === 'confirm' ? 'confirmed' : 'cancelled')
    }
    setConfirmAction(null)
  }

  const filteredAppointments = appointments.filter(a => {
    const matchesFilter = filter === 'all' || a.status === filter
    const q = searchTerm.toLowerCase()
    const matchesSearch =
      a.clientName.toLowerCase().includes(q) ||
      a.clientEmail.toLowerCase().includes(q) ||
      a.clientPhone.includes(q) ||
      a.migratorySituation.toLowerCase().includes(q)
    return matchesFilter && matchesSearch
  })

  const counts = {
    all: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  }

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border/60">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">Gestión de Citas</h1>
          <p className="text-warm-gray text-sm mt-1 font-sans">
            Solicitudes de consulta presencial y online · 50&nbsp;€ / 60&nbsp;min
          </p>
        </div>
        <button
          onClick={fetchAppointments}
          disabled={loading}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-border text-charcoal text-sm font-medium rounded-xl hover:bg-cream-dark hover:border-garnet/30 transition-all shadow-sm disabled:opacity-60"
        >
          <RefreshCw className={`w-4 h-4 text-garnet ${loading ? 'animate-spin' : ''}`} />
          Actualizar
        </button>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(st => {
          const cfg = st === 'all'
            ? { label: 'Total', color: 'text-charcoal', bg: 'bg-cream-dark/60', border: 'border-border/50' }
            : { label: STATUS_CONFIG[st].label, color: STATUS_CONFIG[st].color, bg: STATUS_CONFIG[st].bg, border: STATUS_CONFIG[st].border }
          return (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`flex flex-col items-start gap-1 px-4 py-3 rounded-2xl border transition-all ${cfg.bg} ${cfg.border} ${
                filter === st ? 'ring-2 ring-garnet/30 shadow-sm' : 'hover:shadow-sm'
              }`}
            >
              <span className={`text-2xl font-bold font-sans ${cfg.color}`}>{counts[st]}</span>
              <span className={`text-xs font-semibold font-sans ${cfg.color} opacity-80`}>{cfg.label}</span>
            </button>
          )
        })}
      </div>

      {/* ── Search + Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-gray/60" />
          <input
            type="text"
            placeholder="Buscar por nombre, email, teléfono o trámite..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-border rounded-xl text-sm font-sans text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-garnet/50 shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray hover:text-charcoal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
          <Filter className="w-3.5 h-3.5 text-warm-gray shrink-0" />
          {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                filter === st
                  ? 'bg-garnet text-cream shadow-sm'
                  : 'bg-white border border-border text-warm-gray hover:text-charcoal hover:border-garnet/30'
              }`}
            >
              {st === 'all' ? 'Todas' : STATUS_CONFIG[st].label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Appointment List ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-border/80 rounded-2xl">
          <Loader2 className="w-8 h-8 animate-spin text-garnet mb-3" />
          <p className="text-sm font-sans text-warm-gray">Cargando citas...</p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="text-center py-20 bg-white border border-border/80 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-cream-dark flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-warm-gray" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-charcoal">No hay citas</h3>
          <p className="text-xs text-warm-gray mt-1 max-w-xs mx-auto font-sans">
            {searchTerm
              ? `Ninguna cita coincide con "${searchTerm}".`
              : 'No hay solicitudes con este estado.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAppointments.map(appt => (
            <AppointmentCard
              key={appt.id}
              appt={appt}
              updating={updating}
              deleting={deleting}
              onView={() => setSelectedAppt(appt)}
              onRequestAction={handleRequestAction}
            />
          ))}
        </div>
      )}

      {/* ── Detail Modal ── */}
      {selectedAppt && (
        <DetailModal
          appt={selectedAppt}
          updating={updating}
          onClose={() => setSelectedAppt(null)}
          onRequestAction={handleRequestAction}
        />
      )}

      {/* ── Confirm Modal ── */}
      <ConfirmModal
        isOpen={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={executeConfirmAction}
        title={confirmAction?.title || ''}
        message={confirmAction?.message || ''}
        variant={confirmAction?.variant || 'danger'}
        isLoading={confirmAction ? (confirmAction.action === 'delete' ? deleting === confirmAction.id : updating === confirmAction.id) : false}
      />
    </div>
  )
}
