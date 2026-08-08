import { betterAuth } from 'better-auth'
import { pool } from '@/lib/db'

export const auth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET || 'abogada-rebeca-pinto-secret-key-2026',
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    undefined, // Permite resolución dinámica del origen desde los encabezados de la petición
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  advanced: {
    checkOrigin: false,
  },
  // Confía dinámicamente en cualquier dominio (Netlify preview, abogadarebecapintocamacho.es, localhost, etc.)
  trustedOrigins: (request) => {
    return true
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
})
