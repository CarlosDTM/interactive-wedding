require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log("✅ SUCCESS: Connected to Postgres!");
    const res = await client.query('SELECT NOW()');
    console.log("Database Time:", res.rows[0].now);
    await client.end();
  } catch (err) {
    console.error("❌ CONNECTION ERROR:", err.message);
  }
}

testConnection();