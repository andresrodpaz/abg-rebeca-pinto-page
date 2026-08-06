import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const ADMIN_EMAIL = 'pintocamachorebecaandreina@gmail.com'
export const ADMIN_PASSWORD = 'Rebeca2026!Pinto'

export async function ensureAdminUser() {
  try {
    const [existing] = await db
      .select()
      .from(user)
      .where(eq(user.email, ADMIN_EMAIL))

    if (!existing) {
      await auth.api.signUpEmail({
        body: {
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          name: 'Rebeca Pinto Camacho',
        },
      })
      console.log(`[seed] Created admin user: ${ADMIN_EMAIL}`)
    }
  } catch (e) {
    console.error('[seed] Error ensuring admin user:', e)
  }
}

export async function GET() {
  await ensureAdminUser()
  return NextResponse.json({
    success: true,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  })
}
