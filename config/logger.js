// config/logger.js
const winston = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');

// Determine if running in GCP (Cloud Run sets this env variable)
const isProduction = process.env.NODE_ENV === 'production';
const isGCP = process.env.K_SERVICE !== undefined; // Cloud Run specific

// Create base logger configuration
const loggerConfig = {
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { 
    service: 'budget-api',
    environment: process.env.NODE_ENV || 'development'
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
      service: 'budget-api',
      environment: process.env.NODE_ENV || 'production'
    }
  });
  
  loggerConfig.transports.push(loggingWinston);
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
