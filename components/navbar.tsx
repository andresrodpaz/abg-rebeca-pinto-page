'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import BrandMark from '@/components/brand-mark'
import { site } from '@/lib/site'

const areas = [
  { href: '/areas/arraigo', label: 'Arraigo' },
  { href: '/areas/residencia', label: 'Tipos de Residencia' },
  { href: '/areas/visados', label: 'Visados' },
  { href: '/areas/nacionalidad', label: 'Nacionalidad' },
  { href: '/areas/reagrupacion-familiar', label: 'Reagrupación Familiar' },
  { href: '/areas/renovaciones', label: 'Renovaciones' },
  { href: '/areas/tie-nie', label: 'TIE / NIE' },
]

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [areasOpen, setAreasOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 bg-garnet shadow-md">
      {/* Barra de especialidades y teléfono */}
      <div className="hidden md:block bg-garnet-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <p className="eyebrow text-gold/80">
            {site.specialties.join(' · ')}
          </p>
          <div className="flex items-center gap-5 text-cream/70 text-xs font-sans">
            <span>{site.coverageShort}</span>
            <span className="w-px h-3 bg-gold/40" aria-hidden="true" />
            <a
              href={`tel:${site.phone.tel}`}
              className="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <Phone className="w-3 h-3 text-gold" />
              {site.phone.display}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" onClick={() => setOpen(false)} aria-label={`${site.name} — Inicio`}>
            <BrandMark />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Navegación principal">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-sans tracking-wide transition-colors ${
                  isActive(link.href)
                    ? 'text-gold'
                    : 'text-cream/80 hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Areas dropdown */}
            <div className="relative">
              <button
                onClick={() => setAreasOpen(v => !v)}
                onBlur={() => setTimeout(() => setAreasOpen(false), 150)}
                className={`flex items-center gap-1 text-sm font-sans tracking-wide transition-colors ${
                  pathname.startsWith('/areas') ? 'text-gold' : 'text-cream/80 hover:text-gold'
                }`}
                aria-haspopup="true"
                aria-expanded={areasOpen}
              >
                Áreas de práctica
                <svg className={`w-3 h-3 transition-transform ${areasOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {areasOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-xl border border-border rounded-lg overflow-hidden z-50">
                  {areas.map(area => (
                    <Link
                      key={area.href}
                      href={area.href}
                      className="block px-4 py-2.5 text-sm text-charcoal hover:bg-cream-dark hover:text-garnet transition-colors border-b border-border/50 last:border-0"
                      onClick={() => setAreasOpen(false)}
                    >
                      {area.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/citas"
              className="ml-2 px-4 py-2 bg-gold text-charcoal text-sm font-sans font-semibold rounded hover:bg-gold-light transition-colors tracking-wide"
            >
              Agendar cita
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-cream p-1"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-garnet-dark border-t border-garnet-light/30 pb-4">
          <nav className="flex flex-col px-4 pt-2 gap-1" aria-label="Menú móvil">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-2.5 text-sm tracking-wide border-b border-garnet-light/20 ${
                  isActive(link.href) ? 'text-gold' : 'text-cream/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="py-2 border-b border-garnet-light/20">
              <p className="text-xs text-gold/70 uppercase tracking-widest mb-2">Áreas de práctica</p>
              {areas.map(area => (
                <Link
                  key={area.href}
                  href={area.href}
                  onClick={() => setOpen(false)}
                  className="block py-1.5 pl-3 text-sm text-cream/70 hover:text-gold transition-colors"
                >
                  {area.label}
                </Link>
              ))}
            </div>
            <a
              href={`tel:${site.phone.tel}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3 text-sm text-cream/80 border-b border-garnet-light/20"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              {site.phone.display}
            </a>
            <p className="pt-3 eyebrow text-gold/70">{site.specialties.join(' · ')}</p>
            <Link
              href="/citas"
              onClick={() => setOpen(false)}
              className="mt-3 text-center px-4 py-2.5 bg-gold text-charcoal text-sm font-semibold rounded tracking-wide"
            >
              Agendar cita
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
