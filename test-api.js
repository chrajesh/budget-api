// test-api.js - Simple API test script
const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

async function testEndpoints() {
  console.log('🧪 Testing Budget Planning API Endpoints...\n');

  const tests = [
    {
      name: 'Health Check',
      method: 'GET',
      url: `${BASE_URL}/`
    },
    {
      name: 'Swagger JSON',
      method: 'GET',
      url: `${BASE_URL}/swagger.json`
    },
    {
      name: 'Login',
      method: 'POST',
      url: `${BASE_URL}/api/Authentication/Login`,
      body: { email: 'test@example.com' }
    },
    {
      name: 'Get Product Types',
      method: 'GET',
      url: `${BASE_URL}/api/SalesBudget/GetProductTypes`
    },
    {
      name: 'Get Location Data',
      method: 'GET',
      url: `${BASE_URL}/api/SalesBudget/GetLocationData`
    }
  ];

  for (const test of tests) {
    try {
      const options = {
        method: test.method,
        headers: { 'Content-Type': 'application/json' }
      };

      if (test.body) {
        options.body = JSON.stringify(test.body);
      }

      const response = await fetch(test.url, options);
      const status = response.status;
      const statusText = status === 200 ? '✅' : '❌';

      console.log(`${statusText} ${test.name}: ${status} ${response.statusText}`);

      if (test.name === 'Health Check') {
        const data = await response.json();
        console.log(`   Response:`, data);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: Error - ${error.message}`);
    }
  }

  console.log('\n📚 Visit http://localhost:' + PORT + '/swagger for interactive API documentation');
}

// Wait for server to be ready
setTimeout(() => {
  testEndpoints();
}, 1000);
