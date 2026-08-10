'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { CalendarDays, Clock, LogOut, ExternalLink, ShieldCheck, BookOpen } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export default function AdminNav({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const links = [
    { href: '/admin', label: 'Gestión de Citas', icon: CalendarDays },
    { href: '/admin/horarios', label: 'Horarios y Bloques', icon: Clock },
    { href: '/admin/guia', label: 'Guía de Uso', icon: BookOpen },
  ]

  return (
    <nav className="flex-1 px-3 py-4 flex flex-col justify-between" aria-label="Navegación admin">
      <div className="space-y-1.5">
        <p className="px-3 text-[10px] font-sans font-bold text-gold/60 uppercase tracking-widest mb-2">
          Navegación
        </p>
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={onItemClick}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-sans font-medium transition-all group relative ${
                isActive
                  ? 'bg-garnet text-cream font-semibold shadow-xs ring-1 ring-gold/30'
                  : 'text-cream/70 hover:bg-garnet/40 hover:text-cream'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gold rounded-r-full" />
              )}
              <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-gold' : 'text-cream/60'}`} />
              <span>{label}</span>
            </Link>
          )
        })}

        <div className="pt-4 mt-4 border-t border-garnet-light/15">
          <p className="px-3 text-[10px] font-sans font-bold text-gold/60 uppercase tracking-widest mb-2">
            Sitio Web
          </p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-sans text-cream/70 hover:bg-garnet/30 hover:text-cream transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-cream/50" />
            <span>Ver web pública</span>
          </a>
        </div>
      </div>

      <div className="pt-4 border-t border-garnet-light/15 space-y-2">
        <div className="px-3.5 py-2 bg-garnet/30 rounded-xl flex items-center gap-2 text-xs text-cream/80 border border-gold/15">
          <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
          <span className="truncate">Sesión Segura</span>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-sans text-red-200/80 hover:bg-red-900/30 hover:text-red-100 transition-colors"
        >
          <LogOut className="w-4 h-4 text-red-300/80" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </nav>
  )
}

