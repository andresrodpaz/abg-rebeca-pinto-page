'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginForm({
  defaultEmail = '',
  defaultPassword = '',
}: {
  defaultEmail?: string
  defaultPassword?: string
}) {
  const router = useRouter()
  const [email, setEmail] = useState(defaultEmail)
  const [password, setPassword] = useState(defaultPassword)
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: authError } = await authClient.signIn.email({
      email,
      password,
    })

    if (authError) {
      setError('Credenciales incorrectas. Comprueba tu email y contraseña.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'oklch(0.97 0.012 85 / 0.5)' }}>
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
          style={{
            background: 'oklch(1 0 0 / 0.06)',
            border: '1px solid oklch(1 0 0 / 0.12)',
            color: 'oklch(0.97 0.012 85)',
          }}
          placeholder="correo@ejemplo.com"
          onFocus={e => { e.currentTarget.style.border = '1px solid oklch(0.76 0.10 80 / 0.6)'; e.currentTarget.style.background = 'oklch(1 0 0 / 0.09)' }}
          onBlur={e => { e.currentTarget.style.border = '1px solid oklch(1 0 0 / 0.12)'; e.currentTarget.style.background = 'oklch(1 0 0 / 0.06)' }}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'oklch(0.97 0.012 85 / 0.5)' }}>
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPass ? 'text' : 'password'}
            required
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all duration-200"
            style={{
              background: 'oklch(1 0 0 / 0.06)',
              border: '1px solid oklch(1 0 0 / 0.12)',
              color: 'oklch(0.97 0.012 85)',
            }}
            placeholder="••••••••"
            onFocus={e => { e.currentTarget.style.border = '1px solid oklch(0.76 0.10 80 / 0.6)'; e.currentTarget.style.background = 'oklch(1 0 0 / 0.09)' }}
            onBlur={e => { e.currentTarget.style.border = '1px solid oklch(1 0 0 / 0.12)'; e.currentTarget.style.background = 'oklch(1 0 0 / 0.06)' }}
          />
          <button
            type="button"
            onClick={() => setShowPass(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: 'oklch(0.97 0.012 85 / 0.35)' }}
            aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'oklch(0.76 0.10 80)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'oklch(0.97 0.012 85 / 0.35)' }}
          >
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm" style={{ background: 'oklch(0.40 0.14 25 / 0.25)', border: '1px solid oklch(0.55 0.16 25 / 0.40)', color: 'oklch(0.85 0.08 25)' }}>
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 mt-1"
        style={{
          background: 'linear-gradient(135deg, oklch(0.76 0.10 80), oklch(0.68 0.12 75))',
          color: 'oklch(0.22 0.005 0)',
          boxShadow: '0 4px 14px oklch(0.76 0.10 80 / 0.35)',
        }}
        onMouseEnter={e => { if (!loading) { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 20px oklch(0.76 0.10 80 / 0.45)' } }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px oklch(0.76 0.10 80 / 0.35)' }}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? 'Accediendo...' : 'Acceder al panel'}
      </button>
    </form>
  )
}
