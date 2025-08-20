import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

async function runMigrations() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    
    // Read and execute the schema file
    const schemaPath = path.join(process.cwd(), 'neon-schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schemaSql);
    
    console.log('✅ Database schema initialized successfully');
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error initializing database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations().catch(console.error);
