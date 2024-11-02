const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false, // Disable SSL certificate validation (for testing purposes only)
  // },
});

// Connect to the database and log the status
pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database successfully');
  })
  .catch(err => {
    console.error('Database connection error:', err.stack);
  });

module.exports = pool;
