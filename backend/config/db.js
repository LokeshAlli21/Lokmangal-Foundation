// import pkg from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

// const { Pool } = pkg;

// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// // Log successful connection
// pool.on('connect', () => {
//   console.log('✅ Connected to PostgreSQL Database');
// });

// // Log connection errors
// pool.on('error', (err) => {
//   console.error('❌ Error with PostgreSQL connection:', err.message);
// });

// // Try initial connection to catch immediate issues
// pool.connect()
//   .then(() => console.log('✅ Initial connection to PostgreSQL successful'))
//   .catch((err) => console.error('❌ Initial connection to PostgreSQL failed:', err.message));
