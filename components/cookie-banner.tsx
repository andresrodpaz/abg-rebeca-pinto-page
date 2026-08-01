'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Política de cookies"
      className="fixed bottom-0 left-0 right-0 z-40 bg-garnet-dark border-t-2 border-gold/30 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-cream/80 leading-relaxed flex-1">
          Utilizamos cookies propias para mejorar tu experiencia en esta web. Puedes aceptarlas o rechazarlas. Más información en nuestra{' '}
          <Link href="/politica-cookies" className="text-gold underline underline-offset-2 hover:text-gold-light transition-colors">
            política de cookies
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-xs text-cream/60 border border-cream/20 rounded hover:border-cream/50 transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-xs bg-gold text-charcoal font-semibold rounded hover:bg-gold-light transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
