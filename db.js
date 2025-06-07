const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'db',
  database: process.env.POSTGRES_DATABASE || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  port: process.env.POSTGRES_PORT || 5432,
});

async function ensureTableExists() {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS texts (
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL
        );
    `;
  try {
    await pool.query(createTableQuery);
    console.log('Table "texts" is ready.');
  } catch (err) {
    console.error('Error ensuring table exists:', err);
  }
}

(async () => {
  await ensureTableExists();
})();

module.exports = pool
