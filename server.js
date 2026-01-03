// server.js - Main Express Server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Import routes
const authenticationRoutes = require('./routes/authentication');
const cogsBudgetRoutes = require('./routes/cogsBudget');
const hrPayrollRoutes = require('./routes/hrPayroll');
const salesBudgetRoutes = require('./routes/salesBudget');
const sgaBudgetRoutes = require('./routes/sgaBudget');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // HTTP request logger

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Budget Planning API',
    version: '1.0.0',
    status: 'running',
    swagger: '/swagger'
  });
});

// Swagger Documentation
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Budget Planning API Documentation'
}));

// Swagger JSON endpoint
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// API Routes
app.use('/api/Authentication', authenticationRoutes);
app.use('/api/CogsBudget', cogsBudgetRoutes);
app.use('/api/HRPayroll', hrPayrollRoutes);
app.use('/api/SalesBudget', salesBudgetRoutes);
app.use('/api/SGABudget', sgaBudgetRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║       Budget Planning API Server Started          ║
╠════════════════════════════════════════════════════╣
║  Environment: ${process.env.NODE_ENV || 'development'}${' '.repeat(Math.max(0, 38 - (process.env.NODE_ENV || 'development').length))}║
║  Port:        ${PORT}${' '.repeat(Math.max(0, 38 - PORT.toString().length))}║
║  URL:         http://localhost:${PORT}${' '.repeat(Math.max(0, 22 - PORT.toString().length))}║
║  Swagger:     http://localhost:${PORT}/swagger${' '.repeat(Math.max(0, 14 - PORT.toString().length))}║
╠════════════════════════════════════════════════════╣
║  API Documentation:                                ║
║  📚 Swagger UI:  http://localhost:${PORT}/swagger${' '.repeat(Math.max(0, 7 - PORT.toString().length))}║
║  📄 OpenAPI JSON: /swagger.json                    ║
╠════════════════════════════════════════════════════╣
║  Available Endpoints:                              ║
║  - POST   /api/Authentication/Login                ║
║  - GET    /api/CogsBudget/GetCogsActualBudget      ║
║  - POST   /api/CogsBudget/InsertOrUpdate...        ║
║  - POST   /api/HRPayroll/GetCurrentFYComp...       ║
║  - GET    /api/SalesBudget/GetProductTypes         ║
║  - POST   /api/SGABudget/ForecastData              ║
║  ... and 20+ more endpoints (see Swagger)          ║
╚════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
