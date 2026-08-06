import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import AdminLoginForm from '@/components/admin-login-form'
import { site } from '@/lib/site'
import { ensureAdminUser } from '@/app/api/admin/seed/route'

function LoginLogo({ width = 56 }: { width?: number }) {
  return (
    <span
      className="shrink-0 rounded-sm flex items-center px-2 py-1.5"
      style={{
        background: 'oklch(0.936 0.022 71)',
        border: '1px solid oklch(0.638 0.112 68 / 0.40)',
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
    // Auth fallback
  }

  if (session?.user) redirect('/admin')

  // Auto-ensure admin user exists in DB
  await ensureAdminUser()

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex mb-4">
            <LoginLogo width={64} />
          </div>
          <p className="eyebrow text-garnet font-semibold mb-1 tracking-[0.20em]">
            {site.role} · Extranjería
          </p>
          <h1 className="display-lg text-charcoal text-2xl md:text-3xl font-semibold">
            Panel de Administración
          </h1>
          <span className="gold-divider mx-auto mt-4" aria-hidden="true" />
        </div>

        {/* Login Card styled identically to main site forms */}
        <div
          className="rounded-2xl p-8 bg-white border border-border"
          style={{
            boxShadow: '0 4px 6px -1px oklch(0.46 0.066 6 / 0.06), 0 20px 50px -10px oklch(0.46 0.066 6 / 0.10)',
          }}
        >
          <div className="mb-6">
            <h2 className="display text-xl text-charcoal font-semibold mb-1">Inicia sesión</h2>
            <p className="text-sm font-sans text-warm-gray">Accede con tus credenciales para gestionar el despacho</p>
          </div>

          <AdminLoginForm defaultEmail="" defaultPassword="" />
        </div>

        <p className="text-center text-xs font-sans text-warm-gray/60 mt-8">
          © 2026 Rebeca Pinto Camacho · Todos los derechos reservados
        </p>
      </div>
    </main>
  )
}
