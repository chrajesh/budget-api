// config/logger.js
const winston = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');

// Determine environment from various sources
const isGCP = process.env.K_SERVICE !== undefined; // Cloud Run specific
const serviceName = process.env.K_SERVICE || 'budget-api';

// Detect environment from service name or explicit env variable
let environment = process.env.NODE_ENV || 'development';

// Auto-detect from service name patterns (dev, qa, staging, prod)
if (isGCP && !process.env.NODE_ENV) {
  if (serviceName.includes('-dev') || serviceName.includes('dev-')) {
    environment = 'development';
  } else if (serviceName.includes('-qa') || serviceName.includes('qa-')) {
    environment = 'qa';
  } else if (serviceName.includes('-staging') || serviceName.includes('staging-')) {
    environment = 'staging';
  } else {
    environment = 'production';
  }
}

const isProduction = environment === 'production';

// Set log level based on environment
let logLevel = process.env.LOG_LEVEL;
if (!logLevel) {
  logLevel = isProduction ? 'info' : 'debug';
}

// Create base logger configuration
const loggerConfig = {
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { 
    service: serviceName,
    environment: environment,
    version: process.env.APP_VERSION || '1.0.0'
  },
  transports: []
};

// Local development: Console logging with colors
if (!isProduction || !isGCP) {
  loggerConfig.transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, ...meta }) => {
          let msg = `${timestamp} [${level}]: ${message}`;
          if (Object.keys(meta).length > 0 && meta.service) {
            const { service, environment, ...otherMeta } = meta;
            if (Object.keys(otherMeta).length > 0) {
              msg += ` ${JSON.stringify(otherMeta)}`;
            }
          }
          return msg;
        })
      )
    })
  );
}

// GCP Cloud Run: Use Google Cloud Logging
if (isGCP) {
  const loggingWinston = new LoggingWinston({
    projectId: process.env.GCP_PROJECT_ID || 'budget-project-483219',
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Optional: for local testing
    // Labels for filtering in Cloud Logging
    labels: {
      service: serviceName,
      environment: environment,
      version: process.env.APP_VERSION || '1.0.0'
    }
  });
  
  loggerConfig.transports.push(loggingWinston);
  
  console.log(`[Logger] GCP Cloud Logging enabled - Service: ${serviceName}, Environment: ${environment}`);
}

// Create the logger
const logger = winston.createLogger(loggerConfig);

// Create stream for Morgan HTTP request logging
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

// Helper method to log HTTP requests
logger.logRequest = (req, res, duration) => {
  logger.info('HTTP Request', {
    method: req.method,
    url: req.url,
    status: res.statusCode,
    duration: `${duration}ms`,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
};

// Helper method to log errors with context
logger.logError = (error, context = {}) => {
  logger.error('Application Error', {
    message: error.message,
    stack: error.stack,
    code: error.code,
    ...context
  });
};

// Helper method to log database queries
logger.logQuery = (query, params, duration) => {
  logger.debug('Database Query', {
    query: query.substring(0, 200), // Limit query length
    params: params ? JSON.stringify(params).substring(0, 200) : null,
    duration: `${duration}ms`
  });
};

module.exports = logger;
