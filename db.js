const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PGUSER || 'error',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'error',
    password: process.env.PGPASSWORD || 'error',
    port: process.env.PGPORT || 5432,
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

await ensureTableExists();

module.exports = {
    query: (text, params) => pool.query(text, params),
};
