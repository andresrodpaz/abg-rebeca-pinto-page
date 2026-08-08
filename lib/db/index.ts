import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

function getCleanConnectionString(): string {
  const rawUrl =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    ''

  // Clean parameters unsupported by node-postgres (e.g. channel_binding)
  return rawUrl.replace(/([?&])channel_binding=[^&]*&?/g, '$1').replace(/[?&]$/, '')
}

const connectionString = getCleanConnectionString()

export const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('sslmode=require') || connectionString.includes('neon.tech')
    ? { rejectUnauthorized: false }
    : undefined,
})

export const db = drizzle(pool, { schema })
