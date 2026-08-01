import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import AdminLoginForm from '@/components/admin-login-form'
import { site } from '@/lib/site'

function LoginLogo({ width = 64 }: { width?: number }) {
  return (
    <span
      className="shrink-0 rounded-sm flex items-center px-2 py-1.5"
      style={{
        background: 'oklch(0.97 0.012 85)',
        border: '1px solid oklch(0.76 0.10 80 / 0.45)',
      }}
    >
      <Image
        src="/logo.png"
        alt=""
        width={500}
        height={221}
        style={{ width, height: 'auto' }}
        className="object-contain"
      />
    </span>
  )
}

export default async function AdminLoginPage() {
  let session = null
  try {
    session = await auth.api.getSession({ headers: await headers() })
  } catch {
    // Auth not yet configured (missing BETTER_AUTH_SECRET)
  }
  if (session?.user) redirect('/admin')

  return (
    <main className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, oklch(0.22 0.10 15) 0%, oklch(0.18 0.08 15) 60%, oklch(0.14 0.06 15) 100%)' }}>
      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 px-12 py-12 relative overflow-hidden">
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, oklch(0.76 0.10 80) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.76 0.10 80) 0%, transparent 40%)',
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-16">
            <LoginLogo width={56} />
            <div>
              <p className="font-serif text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: 'oklch(0.97 0.012 85)' }}>{site.name}</p>
              <p className="text-[10px] tracking-[0.22em] uppercase" style={{ color: 'oklch(0.76 0.10 80 / 0.7)' }}>{site.role} · Extranjería</p>
            </div>
          </div>
          <div>
            <p className="font-serif text-3xl leading-snug mb-4" style={{ color: 'oklch(0.97 0.012 85)', fontWeight: 600 }}>
              Panel de<br />administración
            </p>
            <div className="w-8 h-px mb-4" style={{ background: 'oklch(0.76 0.10 80)' }} />
            <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.97 0.012 85 / 0.45)' }}>
              Gestiona citas, consultas y disponibilidad desde un solo lugar.
            </p>
          </div>
        </div>
        <p className="relative text-xs" style={{ color: 'oklch(0.97 0.012 85 / 0.25)' }}>
          © 2025 Rebeca Pinto Camacho · Todos los derechos reservados
        </p>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex mb-3">
              <LoginLogo width={72} />
            </div>
            <h1 className="font-serif text-xl font-semibold" style={{ color: 'oklch(0.97 0.012 85)' }}>Panel de administración</h1>
          </div>

          {/* Card */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: 'oklch(1 0 0 / 0.04)',
              border: '1px solid oklch(1 0 0 / 0.10)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="mb-7">
              <h2 className="font-serif text-2xl font-semibold mb-1" style={{ color: 'oklch(0.97 0.012 85)' }}>Acceder</h2>
              <p className="text-sm" style={{ color: 'oklch(0.97 0.012 85 / 0.45)' }}>Introduce tus credenciales para continuar</p>
            </div>

            {/* Mock credentials hint */}
            <div
              className="rounded-xl px-4 py-3 mb-6 flex items-start gap-2"
              style={{ background: 'oklch(0.76 0.10 80 / 0.12)', border: '1px solid oklch(0.76 0.10 80 / 0.25)' }}
            >
              <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'oklch(0.76 0.10 80)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-xs leading-relaxed" style={{ color: 'oklch(0.76 0.10 80)' }}>
                <p className="font-semibold mb-0.5">Credenciales de demostración</p>
                <p style={{ color: 'oklch(0.76 0.10 80 / 0.8)' }}>info@rebecapintocamacho.es</p>
                <p style={{ color: 'oklch(0.76 0.10 80 / 0.8)' }}>alcala123!</p>
              </div>
            </div>

            <AdminLoginForm defaultEmail="info@rebecapintocamacho.es" defaultPassword="alcala123!" />
          </div>
        </div>
      </div>
    </main>
  )
}
