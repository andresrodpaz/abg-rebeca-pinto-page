'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'

export interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'primary'
  isLoading?: boolean
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger',
  isLoading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null

  const colors = {
    danger: {
      bg: 'bg-rose-50',
      icon: 'text-rose-600',
      button: 'bg-rose-600 hover:bg-rose-500 text-white',
    },
    warning: {
      bg: 'bg-amber-50',
      icon: 'text-amber-600',
      button: 'bg-amber-500 hover:bg-amber-400 text-white',
    },
    primary: {
      bg: 'bg-emerald-50',
      icon: 'text-emerald-600',
      button: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    },
  }[variant]

  return (
    <div
      className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${colors.bg}`}>
              <AlertTriangle className={`w-5 h-5 ${colors.icon}`} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-charcoal">{title}</h3>
              <p className="text-sm text-charcoal/80 font-sans mt-1.5 leading-relaxed">{message}</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-cream-dark/30 border-t border-border/50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-charcoal bg-white border border-border hover:bg-cream-dark transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors disabled:opacity-60 min-w-[100px] ${colors.button}`}
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
