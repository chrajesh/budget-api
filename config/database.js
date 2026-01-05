// config/database.js
const { Pool } = require('pg');

// Cloud SQL Configuration
const INSTANCE_CONNECTION_NAME = 'budget-project-483219:us-south1:budget-app';

// Database configuration - Try different IPs or use Cloud SQL Proxy
const dbConfig = {
  // Option 1: Direct IP connection (requires IP whitelisting in Cloud SQL)
  host: process.env.DB_HOST || '34.174.94.164', // Change to 34.174.171.33 if needed
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'A15gim0T!@',
  
  // Option 2: Unix socket (when using Cloud SQL Proxy locally)
  // Uncomment below and comment out 'host' above to use Cloud SQL Proxy
  // host: `/cloudsql/${INSTANCE_CONNECTION_NAME}`,
  
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: { rejectUnauthorized: false } // Required for Cloud SQL external connections
};

const pool = new Pool(dbConfig);

// Test connection
pool.on('connect', () => {
  console.log(`Connected to PostgreSQL database at ${dbConfig.host}`);
  console.log(`Instance: ${INSTANCE_CONNECTION_NAME}`);
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err.message);
});

module.exports = pool;
