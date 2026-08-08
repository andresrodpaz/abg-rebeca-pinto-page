import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || 'pintocamachorebecaandreina@gmail.com'
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Rebeca2026!Pinto'

export async function ensureAdminUser() {
  try {
    const [existing] = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.email, ADMIN_EMAIL))
      .limit(1)

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
    // Non-fatal — if the user already exists in auth tables but not in our
    // view, or if the DB is temporarily unreachable, we still want the
    // login page to render.
    console.error('[seed] ensureAdminUser error (non-fatal):', e)
  }
}

export async function GET() {
  await ensureAdminUser()
  return NextResponse.json({ success: true })
}
