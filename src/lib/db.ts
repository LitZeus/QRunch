import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create a connection pool with Neon configuration
console.log('Connecting to database with URL:', process.env.DATABASE_URL ? 'Database URL is set' : 'DATABASE_URL is not set!');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon's connection pooling
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, // Increased from 2000 to 10000
  query_timeout: 10000, // Add query timeout
  statement_timeout: 10000, // Add statement timeout
});

// Test the connection on startup
pool.query('SELECT NOW()')
  .then(() => console.log('Database connection successful'))
  .catch(err => console.error('Database connection error:', err));

// Generic query function
export async function query(text: string, params?: any[]) {
  const client = await pool.connect().catch(err => {
    console.error('Error acquiring client from pool:', err);
    throw new Error('Failed to get database connection');
  });
  
  try {
    console.log('Executing query:', text.substring(0, 100) + (text.length > 100 ? '...' : ''));
    const start = Date.now();
    const res = await client.query(text, params);
    const duration = Date.now() - start;
    console.log(`Executed query in ${duration}ms`);
    return res;
  } catch (err) {
    console.error('Database query error:', {
      query: text,
      params,
      error: err
    });
    throw err;
  } finally {
    try {
      await client.release();
    } catch (err) {
      console.error('Error releasing client:', err);
    }
  }
}

// Helper function to handle single row queries
export async function queryRow<T>(text: string, params?: any[]): Promise<T | null> {
  const result = await query(text, params);
  return result.rows?.[0] || null;
}

// Helper function to handle multiple rows
export async function queryRows<T>(text: string, params?: any[]): Promise<T[]> {
  const result = await query(text, params);
  return result.rows;
}

// Helper function for insert operations
export async function insert(
  table: string, 
  data: Record<string, any>, 
  returning = 'id'
): Promise<any> {
  const keys = Object.keys(data);
  const indices = keys.map((_, i) => `$${i + 1}`);
  const values = Object.values(data);
  
  const text = `
    INSERT INTO ${table} (${keys.join(', ')})
    VALUES (${indices.join(', ')})
    RETURNING ${returning}
  `;
  
  const result = await query(text, values);
  return result.rows[0];
}

// Helper function for update operations
export async function update(
  table: string,
  id: string,
  data: Record<string, any>,
  idColumn = 'id',
  returning = '*'
): Promise<any> {
  const keys = Object.keys(data);
  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
  const values = [...Object.values(data), id];
  
  const text = `
    UPDATE ${table}
    SET ${setClause}, updated_at = NOW()
    WHERE ${idColumn} = $${keys.length + 1}
    RETURNING ${returning}
  `;
  
  const result = await query(text, values);
  return result.rows[0];
}

// Helper function for delete operations
export async function remove(
  table: string,
  id: string,
  idColumn = 'id'
): Promise<boolean> {
  const result = await query(
    `DELETE FROM ${table} WHERE ${idColumn} = $1 RETURNING *`,
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}

export default {
  query,
  queryRow,
  queryRows,
  insert,
  update,
  delete: remove,
};
