// Test script for InsertOrUpdateBudgetData endpoint
const axios = require('axios');

const BASE_URL = 'http://localhost:3000'; // Update this to your API URL

// Sample test data matching the schema
const testData = [
  {
    budgetHeader_RefId: 1001,
    budgetLine_RefId: 2001,
    budgetYear: '2025',
    financialYear: 'FY2024-25',
    salesPerson: 101,
    salesManager: 201,
    budgetStatus: 2,
    soldToCustomer: 5001,
    parentCustomer: 5000,
    location: 301,
    budgetModel: 401,
    salesMonth: 1,
    productType_RefId: 1,
    isModified: false,
    budgetSalesPercentage: 15.50,
    budgetGrossMarginPercentage: 35.75,
    comments: 'Test budget record',
    budget_Sales: 125000.00,
    budget_GrossMargin: 44687.50,
    userName: 'test.user'
  },
  {
    budgetHeader_RefId: 1001,
    budgetLine_RefId: 2002,
    budgetYear: '2025',
    financialYear: 'FY2024-25',
    salesPerson: 102,
    salesManager: 201,
    budgetStatus: 1,
    soldToCustomer: 5002,
    parentCustomer: 5000,
    location: 302,
    budgetModel: 401,
    salesMonth: 2,
    productType_RefId: 2,
    isModified: true,
    budgetSalesPercentage: 12.30,
    budgetGrossMarginPercentage: 28.50,
    comments: 'Another test record',
    budget_Sales: 87500.00,
    budget_GrossMargin: 24937.50,
    userName: 'test.user'
  }
];

async function testInsertOrUpdateBudgetData() {
  try {
    console.log('Testing InsertOrUpdateBudgetData endpoint...');
    console.log('URL:', `${BASE_URL}/api/SalesBudget/InsertOrUpdateBudgetData`);
    console.log('Payload:', JSON.stringify(testData, null, 2));

    const response = await axios.post(
      `${BASE_URL}/api/SalesBudget/InsertOrUpdateBudgetData`,
      testData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('\n✓ Success!');
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('\n✗ Error!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Status Text:', error.response.statusText);
      console.error('Response:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No response received from server');
      console.error('Request:', error.request);
    } else {
      console.error('Error:', error.message);
      console.error('Full error:', error);
    }
  }
}

// Run the test
testInsertOrUpdateBudgetData();
