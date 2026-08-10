const { Pool } = require('pg');

const DEFAULT_DB_URL = 'postgresql://neondb_owner:npg_Xwn2ok6WRzLv@ep-proud-paper-au9vqb6q-pooler.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require';

async function testDb() {
  const pool = new Pool({
    connectionString: DEFAULT_DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    const client = await pool.connect();
    console.log("Connected to DB successfully!");
    
    console.log("Checking tables...");
    const tables = await client.query(`
      SELECT table_name, column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name IN ('appointments', 'available_slots', 'user', 'session');
    `);
    
    console.log("Tables and columns:");
    const tableInfo = {};
    for (const row of tables.rows) {
      if (!tableInfo[row.table_name]) tableInfo[row.table_name] = [];
      tableInfo[row.table_name].push(row.column_name);
    }
    console.log(JSON.stringify(tableInfo, null, 2));

    console.log("\nAttempting to query appointments...");
    const appts = await client.query('SELECT * FROM appointments LIMIT 1');
    console.log("Appointments query success:", appts.rowCount);

    client.release();
  } catch (e) {
    console.error("DB Error:", e);
  } finally {
    pool.end();
  }
}

testDb();
