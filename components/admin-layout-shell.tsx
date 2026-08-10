'use client'

import { useState } from 'react'
import Image from 'next/image'
import AdminNav from '@/components/admin-nav'
import { Menu, X, UserCheck, Shield } from 'lucide-react'

function AdminLogo() {
  return (
    <span className="h-7 px-1.5 shrink-0 rounded bg-cream flex items-center ring-1 ring-gold/40 shadow-xs">
      <Image src="/logo.png" alt="Rebeca Pinto" width={500} height={221} className="w-10 h-auto object-contain" />
    </span>
  )
}

interface AdminLayoutShellProps {
  userEmail: string
  children: React.ReactNode
}

export default function AdminLayoutShell({ userEmail, children }: AdminLayoutShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-cream font-sans selection:bg-garnet selection:text-cream">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-garnet-dark text-cream flex flex-col shrink-0 hidden md:flex border-r border-garnet-light/20 shadow-lg z-20">
        {/* Header Branding */}
        <div className="px-6 py-6 border-b border-garnet-light/20 bg-gradient-to-b from-garnet-dark to-garnet-dark/95">
          <div className="flex items-center gap-3">
            <AdminLogo />
            <div>
              <p className="text-xs font-serif text-cream font-bold leading-tight uppercase tracking-wider">Rebeca Pinto</p>
              <p className="text-[10px] font-sans font-medium text-gold tracking-widest uppercase mt-0.5">Gestión y Citas</p>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <AdminNav />

        {/* Footer User Info */}
        <div className="px-6 py-4 border-t border-garnet-light/20 bg-garnet/30 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold border border-gold/30 shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase font-bold tracking-wider text-gold/80">Administradora</p>
            <p className="text-xs text-cream/90 truncate font-medium">{userEmail}</p>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-72 bg-garnet-dark text-cream z-50 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-5 border-b border-garnet-light/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AdminLogo />
            <div>
              <p className="text-xs font-serif text-cream font-bold uppercase tracking-wider">Rebeca Pinto</p>
              <p className="text-[10px] text-gold uppercase tracking-widest">Panel Admin</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 text-cream/70 hover:text-cream rounded-lg hover:bg-garnet/50 transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <AdminNav onItemClick={() => setMobileMenuOpen(false)} />

        <div className="px-6 py-4 border-t border-garnet-light/20 bg-garnet/30">
          <p className="text-xs text-cream/80 truncate font-medium">{userEmail}</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Header (Mobile Only) */}
        <header className="md:hidden sticky top-0 z-30 bg-cream/90 backdrop-blur-md border-b border-border/70 px-4 py-3.5 flex items-center">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-xl border border-border bg-white text-charcoal hover:bg-cream-dark transition-colors shadow-2xs"
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5 text-garnet" />
          </button>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
