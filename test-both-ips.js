// Test both IP addresses for Cloud SQL connection
const { Pool } = require('pg');

const INSTANCE_CONNECTION_NAME = 'budget-project-483219:us-south1:budget-app';
const IP_ADDRESSES = ['34.174.94.164', '34.174.171.33'];

async function testIPAddress(ip) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing IP: ${ip}`);
  console.log(`${'='.repeat(60)}`);
  
  const pool = new Pool({
    host: ip,
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'A15gim0T!@',
    max: 1,
    connectionTimeoutMillis: 10000,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const client = await pool.connect();
    
    // Test basic query
    const result = await client.query('SELECT NOW() as current_time, version() as version');
    console.log('✓ Connection successful!');
    console.log('Current time:', result.rows[0].current_time);
    console.log('PostgreSQL version:', result.rows[0].version.split('\n')[0]);
    
    // Check schema
    const schemaCheck = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name = 'budget'
    `);
    
    if (schemaCheck.rows.length > 0) {
      console.log('✓ Schema "budget" exists');
      
      // Check table
      const tableCheck = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'budget' AND table_name = 'sales_budget'
      `);
      
      if (tableCheck.rows.length > 0) {
        console.log('✓ Table "budget.sales_budget" exists');
        
        const countResult = await client.query('SELECT COUNT(*) as count FROM budget.sales_budget');
        console.log(`  Records in table: ${countResult.rows[0].count}`);
      } else {
        console.log('⚠ Table "budget.sales_budget" does NOT exist');
      }
    } else {
      console.log('⚠ Schema "budget" does NOT exist');
    }
    
    client.release();
    await pool.end();
    
    return { success: true, ip };
  } catch (error) {
    await pool.end();
    console.log('✗ Connection failed!');
    console.log('Error:', error.message);
    console.log('Error code:', error.code);
    return { success: false, ip, error: error.message };
  }
}

async function testAllIPs() {
  console.log('\n' + '='.repeat(60));
  console.log(`Cloud SQL Instance: ${INSTANCE_CONNECTION_NAME}`);
  console.log('='.repeat(60));
  console.log('Testing both IP addresses...\n');
  
  const results = [];
  
  for (const ip of IP_ADDRESSES) {
    const result = await testIPAddress(ip);
    results.push(result);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  if (successful.length > 0) {
    console.log('\n✓ Successful connections:');
    successful.forEach(r => console.log(`  - ${r.ip}`));
  }
  
  if (failed.length > 0) {
    console.log('\n✗ Failed connections:');
    failed.forEach(r => console.log(`  - ${r.ip}: ${r.error}`));
  }
  
  if (successful.length > 0) {
    console.log(`\n✓ Use IP ${successful[0].ip} in your database configuration`);
  } else {
    console.log('\n✗ All connections failed. Possible issues:');
    console.log('  1. IP address not whitelisted in Cloud SQL (add your public IP)');
    console.log('  2. Cloud SQL instance is not started');
    console.log('  3. Firewall blocking port 5432');
    console.log('  4. Consider using Cloud SQL Proxy instead');
  }
}

testAllIPs();
