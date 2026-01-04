// server.js - Main Express Server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const logger = require('./config/logger');

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
// Configure Helmet to allow Swagger UI to work
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// HTTP request logging with Winston
app.use(morgan('combined', { stream: logger.stream }));

// Add request timing middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.logRequest(req, res, duration);
  });
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Budget Planning API',
    version: '1.0.0',
    status: 'running',
    swagger: '/swagger'
  });
});

// Swagger JSON endpoint with dynamic URL
app.get('/swagger.json', (req, res) => {
  const dynamicSpec = swaggerSpec.generateSwaggerSpec(req);
  res.setHeader('Content-Type', 'application/json');
  res.send(dynamicSpec);
});

// Swagger Documentation with dynamic URL
app.use('/swagger', swaggerUi.serve);
app.get('/swagger', (req, res) => {
  const dynamicSpec = swaggerSpec.generateSwaggerSpec(req);
  swaggerUi.setup(dynamicSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Budget Planning API Documentation'
  })(req, res);
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
  logger.logError(err, {
    method: req.method,
    url: req.url,
    ip: req.ip,
    status: err.status || 500
  });
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  const startupMessage = `
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
  `;
  
  console.log(startupMessage);
  logger.info('Budget API Server Started', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version
  });
});

module.exports = app;
