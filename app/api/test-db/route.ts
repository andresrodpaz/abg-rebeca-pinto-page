import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { initAppTables } from '@/lib/db/init';
import { db } from '@/lib/db';
import { appointments, availableSlots } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';

const DEFAULT_DB_URL = 'postgresql://neondb_owner:npg_Xwn2ok6WRzLv@ep-proud-paper-au9vqb6q-pooler.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require';

export async function GET() {
  let log = '';
  try {
    log += 'Initializing tables...\\n';
    await initAppTables();
    log += 'Tables initialized.\\n';

    log += 'Testing connection...\\n';
    const pool = new Pool({
      connectionString: DEFAULT_DB_URL,
      ssl: { rejectUnauthorized: false },
    });
    const client = await pool.connect();
    
    log += 'Checking schema...\\n';
    const tables = await client.query(`
      SELECT table_name, column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name IN ('appointments', 'available_slots');
    `);
    
    log += JSON.stringify(tables.rows, null, 2) + '\\n';
    client.release();
    pool.end();

    log += 'Running Drizzle query...\\n';
    const rows = await db
      .select({
        id: appointments.id,
        slotId: appointments.slotId,
        clientName: appointments.clientName,
        createdAt: appointments.createdAt,
        slotDate: availableSlots.date,
      })
      .from(appointments)
      .leftJoin(availableSlots, eq(appointments.slotId, availableSlots.id))
      .orderBy(desc(appointments.id));
      
    log += 'Query success! Rows: ' + rows.length;

    return new NextResponse(log, { status: 200, headers: { 'Content-Type': 'text/plain' } });
  } catch (e) {
    const errorMsg = e instanceof Error ? e.stack || e.message : String(e);
    log += 'ERROR: ' + errorMsg;
    return new NextResponse(log, { status: 500, headers: { 'Content-Type': 'text/plain' } });
  }
}
