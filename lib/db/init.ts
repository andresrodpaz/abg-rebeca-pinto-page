import { pool } from './index'

let inited = false

export async function initAppTables() {
  if (inited) return

  // 1. Create tables if not existing
  await pool.query(`
    CREATE TABLE IF NOT EXISTS available_slots (
      id SERIAL PRIMARY KEY,
      slot_date DATE NOT NULL,
      slot_time TIME NOT NULL,
      is_booked BOOLEAN NOT NULL DEFAULT FALSE,
      "createdAt" TIMESTAMP DEFAULT NOW(),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS appointments (
      id SERIAL PRIMARY KEY,
      slot_id INTEGER NOT NULL,
      client_name TEXT NOT NULL,
      client_email TEXT NOT NULL,
      client_phone TEXT NOT NULL,
      situation TEXT NOT NULL,
      message TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      "createdAt" TIMESTAMP DEFAULT NOW(),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `)

  // 2. Ensure both "createdAt" and created_at columns exist regardless of initial creation schema
  await pool.query(`
    DO $$ 
    BEGIN 
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='available_slots' AND column_name='createdAt') THEN
        ALTER TABLE available_slots ADD COLUMN "createdAt" TIMESTAMP DEFAULT NOW();
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='available_slots' AND column_name='created_at') THEN
        ALTER TABLE available_slots ADD COLUMN created_at TIMESTAMP DEFAULT NOW();
      END IF;

      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='appointments' AND column_name='createdAt') THEN
        ALTER TABLE appointments ADD COLUMN "createdAt" TIMESTAMP DEFAULT NOW();
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='appointments' AND column_name='created_at') THEN
        ALTER TABLE appointments ADD COLUMN created_at TIMESTAMP DEFAULT NOW();
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='appointments' AND column_name='status') THEN
        ALTER TABLE appointments ADD COLUMN status TEXT DEFAULT 'pending';
      END IF;
    END $$;
  `)

  // 3. Sync timestamps between "createdAt" and created_at if any are null
  await pool.query(`
    UPDATE available_slots SET "createdAt" = COALESCE("createdAt", created_at, NOW()), created_at = COALESCE(created_at, "createdAt", NOW());
    UPDATE appointments SET "createdAt" = COALESCE("createdAt", created_at, NOW()), created_at = COALESCE(created_at, "createdAt", NOW());
  `)

  inited = true
}
