'use client'

import { useState } from 'react'
import { WhatsAppIcon } from '@/components/social-icons'
import { site } from '@/lib/site'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={site.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Contactar por WhatsApp al ${site.phone.display}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 shadow-lg transition-all duration-300"
    >
      {/* Etiqueta */}
      {hovered && (
        <span className="bg-charcoal text-cream text-xs px-3 py-1.5 rounded-full whitespace-nowrap shadow-md">
          ¡Escríbeme! {site.phone.display}
        </span>
      )}
      {/* Círculo WhatsApp */}
      <span className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </span>
    </a>
  )
}
