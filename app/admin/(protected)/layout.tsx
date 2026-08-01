import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import AdminNav from '@/components/admin-nav'

function AdminLogo() {
  return (
    <span className="h-6 px-1 shrink-0 rounded-sm bg-cream flex items-center ring-1 ring-gold/40">
      <Image src="/logo.png" alt="" width={500} height={221} className="w-9 h-auto object-contain" />
    </span>
  )
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let session = null
  try {
    session = await auth.api.getSession({ headers: await headers() })
  } catch {
    // Auth not yet configured (missing BETTER_AUTH_SECRET)
  }
  if (!session?.user) redirect('/admin/login')

  return (
    <div className="min-h-screen flex bg-cream">
      {/* Sidebar */}
      <aside className="w-56 bg-garnet-dark text-cream flex flex-col shrink-0 hidden md:flex">
        <div className="px-6 py-5 border-b border-garnet-light/20">
          <div className="flex items-center gap-2">
            <AdminLogo />
            <div>
              <p className="text-xs font-serif text-cream font-semibold leading-tight uppercase tracking-widest">Rebeca Pinto</p>
              <p className="text-[10px] text-gold/60 tracking-widest uppercase">Panel Admin</p>
            </div>
          </div>
        </div>
        <AdminNav />
        <div className="mt-auto px-6 py-4 border-t border-garnet-light/20">
          <p className="text-xs text-cream/40 truncate">{session.user.email}</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <div className="md:hidden bg-garnet-dark px-4 py-3 flex items-center gap-2">
          <AdminLogo />
          <span className="font-serif text-cream text-sm font-semibold uppercase tracking-widest">Panel Admin</span>
        </div>
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
