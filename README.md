# Budget Planning API

A Node.js Express API implementation based on the Budget Planning API Swagger specification.

## Installation

```bash
npm install
```

## Configuration

Environment variables can be set in `.env` file:
- `PORT` - Server port (default: 3000, production: 80)
- `NODE_ENV` - Environment mode (development/production)

## Running the Application

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Documentation

Once the server is running, access the Swagger UI documentation at:

**http://localhost:3000/swagger**

The Swagger UI provides:
- Interactive API documentation
- Ability to test endpoints directly from the browser
- Request/response schemas
- Example payloads

You can also access the raw OpenAPI JSON specification at:
**http://localhost:3000/swagger.json**

## API Endpoints

### Authentication
- POST `/api/Authentication/Login` - User login

### CogsBudget
- GET `/api/CogsBudget/GetCogsActualBudget` - Get COGS actual budget
- POST `/api/CogsBudget/InsertOrUpdateCogsBudgetData` - Insert or update COGS budget data

### HRPayroll
- POST `/api/HRPayroll/GetCurrentFYCompensationAndBudgetData` - Get current FY compensation and budget data
- POST `/api/HRPayroll/InsertOrUpdatePayrollBudgetData` - Insert or update payroll budget data
- GET `/api/HRPayroll/GetPayrollLineLogInfo` - Get payroll line log info
- POST `/api/HRPayroll/SetupPayrollComponents` - Setup payroll components
- GET `/api/HRPayroll/GetPayrollSetupInfo` - Get payroll setup info
- GET `/api/HRPayroll/metadata` - Get HR payroll metadata

### SalesBudget
- GET `/api/SalesBudget/SalesPerson_Managers_Data` - Get sales person and managers data
- GET `/api/SalesBudget/GetProductTypes` - Get product types
- GET `/api/SalesBudget/GetActualForecastOppAndBudgetDataOnRetrieve` - Get actual forecast opportunity and budget data (retrieve mode)
- GET `/api/SalesBudget/GetActualForecastOppAndBudgetDataOnGenerate` - Get actual forecast opportunity and budget data (generate mode)
- GET `/api/SalesBudget/GetCustomerData` - Get customer data
- POST `/api/SalesBudget/InsertOrUpdateBudgetData` - Insert or update budget data
- POST `/api/SalesBudget/DeleteBudgetData` - Delete budget data
- GET `/api/SalesBudget/GetBudgetDropdownData` - Get budget dropdown data
- GET `/api/SalesBudget/GetLocationData` - Get location data
- GET `/api/SalesBudget/GetHolidaysCount` - Get holidays count
- GET `/api/SalesBudget/GetAllSubmittedBudgets` - Get all submitted budgets

### SGABudget
- POST `/api/SGABudget/ForecastData` - Get forecast data
- POST `/api/SGABudget/GETDriveLineExpenses` - Get drive line expenses
- POST `/api/SGABudget/SaveDriveLineExpenses` - Save drive line expenses
- GET `/api/SGABudget/metadata` - Get SGA budget metadata
- POST `/api/SGABudget/DeleteDriveLineExpenses` - Delete drive line expenses

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)

## Project Structure

```
budget-api/
├── routes/
│   ├── authentication.js
│   ├── cogsBudget.js
│   ├── hrPayroll.js
│   ├── salesBudget.js
│   └── sgaBudget.js
├── controllers/
│   ├── authenticationController.js
│   ├── cogsBudgetController.js
│   ├── hrPayrollController.js
│   ├── salesBudgetController.js
│   └── sgaBudgetController.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Docker Deployment

### Build and Run Locally
```bash
# Build Docker image
docker build -t budget-api:latest .

# Run container
docker run -p 80:80 budget-api:latest

# Or use docker-compose
docker-compose up
```

### Deploy to Google Cloud Platform

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed GCP deployment instructions.

Quick deploy to Cloud Run:
```bash
gcloud run deploy budget-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --port 80
```
