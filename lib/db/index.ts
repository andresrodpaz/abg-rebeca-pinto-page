import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const DEFAULT_DB_URL =
  'postgresql://neondb_owner:npg_Xwn2ok6WRzLv@ep-proud-paper-au9vqb6q-pooler.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require'

function getCleanConnectionString(): string {
  const rawUrl =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    DEFAULT_DB_URL

  return rawUrl.replace(/([?&])channel_binding=[^&]*&?/g, '$1').replace(/[?&]$/, '')
}

const connectionString = getCleanConnectionString()

export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

export const db = drizzle(pool, { schema })
