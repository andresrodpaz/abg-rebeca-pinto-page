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

    try {
      let { error: authError } = await authClient.signIn.email({
        email,
        password,
      })

      // Auto-seed retry if initial attempt fails due to missing user row in DB
      if (authError && email.toLowerCase().includes('pintocamachorebecaandreina')) {
        try {
          await fetch('/api/admin/seed')
          const retry = await authClient.signIn.email({
            email,
            password,
          })
          authError = retry.error
        } catch (seedErr) {
          console.error('Seed attempt failed:', seedErr)
        }
      }

      if (authError) {
        setError('Credenciales incorrectas. Comprueba tu email y contraseña.')
        setLoading(false)
        return
      }

      router.push('/admin')
      router.refresh()
    } catch (err) {
      console.error('Sign-in exception:', err)
      setError('Error al conectar con el servidor. Inténtalo de nuevo.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-sans">
      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="off"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm text-charcoal bg-cream-dark/30 border border-border outline-none transition-all duration-200 focus:border-garnet focus:bg-white focus:ring-2 focus:ring-garnet/20"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPass ? 'text' : 'password'}
            required
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 pr-11 rounded-xl text-sm text-charcoal bg-cream-dark/30 border border-border outline-none transition-all duration-200 focus:border-garnet focus:bg-white focus:ring-2 focus:ring-garnet/20"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPass(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray hover:text-garnet transition-colors"
            aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm bg-red-50 border border-red-200 text-red-800">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-cream bg-garnet hover:bg-garnet-dark shadow-sm disabled:opacity-60 mt-2"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? 'Accediendo…' : 'Acceder al panel'}
      </button>
    </form>
  )
}
