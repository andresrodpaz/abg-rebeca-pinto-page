'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { CalendarDays, LogOut } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const links = [
    { href: '/admin', label: 'Citas', icon: CalendarDays },
  ]

  return (
    <nav className="flex-1 px-3 py-4 flex flex-col gap-1" aria-label="Navegación admin">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            pathname === href
              ? 'bg-garnet text-cream font-semibold'
              : 'text-cream/60 hover:bg-garnet/50 hover:text-cream'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream/60 hover:bg-garnet/50 hover:text-cream transition-colors mt-auto"
      >
        <LogOut className="w-4 h-4" />
        Cerrar sesión
      </button>
    </nav>
  )
}
