// config/database.js
const { Pool } = require('pg');

// Cloud SQL Configuration
const INSTANCE_CONNECTION_NAME = 'budget-project-483219:us-south1:budget-app';

// Detect if running on Cloud Run
const isCloudRun = process.env.K_SERVICE !== undefined;

// Database configuration
const dbConfig = {
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'A15gim0T!@',
  max: isCloudRun ? 5 : 20, // Lower connection pool for Cloud Run
  min: 1,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000, // Increased to 20s
  statement_timeout: 60000, // 60 second query timeout
  query_timeout: 60000,
};

// Connection method based on environment
if (isCloudRun) {
  // Cloud Run: Use Unix socket (requires Cloud SQL connection configured in Cloud Run)
  dbConfig.host = `/cloudsql/${INSTANCE_CONNECTION_NAME}`;
  console.log(`Using Cloud SQL Unix socket: ${dbConfig.host}`);
} else {
  // Local development: Direct IP connection (requires IP whitelisting)
  dbConfig.host = process.env.DB_HOST || '34.174.171.33';
  dbConfig.port = parseInt(process.env.DB_PORT || '5432');
  dbConfig.ssl = { rejectUnauthorized: false };
  console.log(`Using direct IP connection: ${dbConfig.host}:${dbConfig.port}`);
  console.log(`Database: ${dbConfig.database}, User: ${dbConfig.user}`);
}

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
