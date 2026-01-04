// Test database connection
const pool = require('./config/database');

async function testConnection() {
  try {
    console.log('Testing PostgreSQL connection...');
    const client = await pool.connect();
    
    // Test basic query
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✓ Connection successful!');
    console.log('Current database time:', result.rows[0].current_time);
    
    // Check if schema exists
    const schemaCheck = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name = 'budget'
    `);
    
    if (schemaCheck.rows.length > 0) {
      console.log('✓ Schema "budget" exists');
    } else {
      console.log('✗ Schema "budget" does not exist - creating it...');
      await client.query('CREATE SCHEMA IF NOT EXISTS budget');
      console.log('✓ Schema "budget" created');
    }
    
    // Check if table exists
    const tableCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'budget' AND table_name = 'sales_budget'
    `);
    
    if (tableCheck.rows.length > 0) {
      console.log('✓ Table "budget.sales_budget" exists');
      
      // Get record count
      const countResult = await client.query('SELECT COUNT(*) as count FROM budget.sales_budget');
      console.log(`  Records in table: ${countResult.rows[0].count}`);
    } else {
      console.log('✗ Table "budget.sales_budget" does not exist');
      console.log('  Please run the sales_budget_table.sql script to create the table');
    }
    
    client.release();
    await pool.end();
    console.log('\nDatabase connection test completed');
  } catch (error) {
    console.error('✗ Connection failed!');
    console.error('Error:', error.message);
    process.exit(1);
  }
}

testConnection();
