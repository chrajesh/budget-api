# GCP Logging Guide for Budget API

## Overview
This guide explains how logging is configured in the Budget API and how to view logs in Google Cloud Platform.

## Logging Setup

### 1. Installed Packages
```bash
npm install winston @google-cloud/logging-winston
```

- **winston**: Industry-standard logging library for Node.js
- **@google-cloud/logging-winston**: Winston transport for Google Cloud Logging

### 2. Logger Configuration (`config/logger.js`)

The logger automatically detects the environment:

#### **Local Development**
- Logs to console with colors
- Human-readable format
- Includes timestamps

#### **GCP Cloud Run (Production)**
- Sends logs to Google Cloud Logging
- Structured JSON format
- Automatic log level detection
- Labels for filtering

### 3. Log Levels
```
error   - Errors and exceptions
warn    - Warning messages  
info    - Important application events (default)
http    - HTTP requests
debug   - Detailed debugging information
```

## How to Add Logging to Your Code

### Import the Logger
```javascript
const logger = require('../config/logger');
```

### Basic Logging Examples

#### 1. Info Messages
```javascript
logger.info('User logged in successfully', {
  userId: 123,
  username: 'john.doe'
});
```

#### 2. Error Logging
```javascript
try {
  // Your code
} catch (error) {
  logger.logError(error, {
    endpoint: 'InsertBudget',
    userId: req.user?.id
  });
}
```

#### 3. Warning Messages
```javascript
logger.warn('Invalid input received', {
  field: 'budgetYear',
  value: invalidValue
});
```

#### 4. Debug Information
```javascript
logger.debug('Processing budget records', {
  count: records.length,
  batchSize: 100
});
```

#### 5. HTTP Request Logging
```javascript
// Automatically handled by middleware
// But you can add custom request logs:
logger.logRequest(req, res, duration);
```

#### 6. Database Query Logging
```javascript
const startTime = Date.now();
const result = await client.query(query, params);
const duration = Date.now() - startTime;

logger.logQuery(query, params, duration);
```

## Viewing Logs in GCP

### Method 1: Google Cloud Console (Web UI)

1. **Navigate to Cloud Logging**
   - Go to: https://console.cloud.google.com/logs
   - Or: Navigation Menu → Logging → Logs Explorer

2. **Filter Logs by Service**
   ```
   resource.type="cloud_run_revision"
   resource.labels.service_name="budget-api"
   ```

3. **Filter by Log Level**
   ```
   severity="ERROR"
   ```
   
   Available levels: DEFAULT, DEBUG, INFO, WARNING, ERROR, CRITICAL

4. **Filter by Time Range**
   - Use the time selector at the top
   - Options: Last hour, Last 24 hours, Custom range

5. **Search Logs**
   ```
   jsonPayload.endpoint="InsertOrUpdateBudgetData"
   ```

6. **Common Queries**
   ```
   # All errors in last hour
   severity="ERROR"
   timestamp>="2026-01-04T20:00:00Z"
   
   # Specific endpoint logs
   jsonPayload.endpoint="InsertOrUpdateBudgetData"
   
   # Slow requests (duration > 1000ms)
   jsonPayload.duration>="1000ms"
   
   # Database errors
   jsonPayload.message:"database"
   severity="ERROR"
   ```

### Method 2: gcloud CLI

1. **Install gcloud CLI** (if not installed)
   ```bash
   https://cloud.google.com/sdk/docs/install
   ```

2. **View Recent Logs**
   ```bash
   gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=budget-api" --limit 50 --format json
   ```

3. **Stream Logs in Real-time**
   ```bash
   gcloud logging tail "resource.type=cloud_run_revision AND resource.labels.service_name=budget-api"
   ```

4. **Filter by Severity**
   ```bash
   gcloud logging read "resource.type=cloud_run_revision AND severity>=ERROR" --limit 20
   ```

### Method 3: Cloud Run Logs (Simplified)

1. Go to: https://console.cloud.google.com/run
2. Click on your service: `budget-api`
3. Click **LOGS** tab
4. View logs directly associated with your service

## Log Structure in GCP

### Standard Fields
```json
{
  "timestamp": "2026-01-04T21:45:00.000Z",
  "severity": "INFO",
  "message": "InsertOrUpdateBudgetData - Transaction completed",
  "jsonPayload": {
    "service": "budget-api",
    "environment": "production",
    "totalRecords": 2,
    "inserted": 1,
    "updated": 1,
    "duration": "145ms"
  },
  "resource": {
    "type": "cloud_run_revision",
    "labels": {
      "service_name": "budget-api",
      "location": "us-south1"
    }
  }
}
```

## Best Practices

### 1. What to Log
✅ **DO Log:**
- Application startup/shutdown
- API requests and responses (summary)
- Database operations
- Authentication attempts
- Errors and exceptions
- Business-critical events
- Performance metrics

❌ **DON'T Log:**
- Passwords or secrets
- Credit card numbers
- Personal identifiable information (PII)
- Excessive debug info in production

### 2. Log Levels Usage
```javascript
// ERROR - Something failed
logger.error('Database connection failed', { error: err.message });

// WARN - Something unexpected but not critical
logger.warn('Using default configuration', { reason: 'config file missing' });

// INFO - Important business events
logger.info('Budget data saved', { recordCount: 50 });

// DEBUG - Detailed debugging (not shown in production)
logger.debug('Processing record', { id: 123, data: record });
```

### 3. Include Context
```javascript
// Good - includes context
logger.info('User action completed', {
  action: 'create_budget',
  userId: user.id,
  duration: '234ms'
});

// Bad - no context
logger.info('Action completed');
```

### 4. Structured Logging
```javascript
// Good - structured
logger.info('Payment processed', {
  orderId: 123,
  amount: 99.99,
  currency: 'USD',
  status: 'success'
});

// Bad - unstructured string
logger.info(`Payment of $99.99 for order 123 processed successfully`);
```

## Setting Log Level via Environment Variable

### Local Development
```bash
# In .env file
LOG_LEVEL=debug
```

### GCP Cloud Run
```bash
# Deploy with environment variable
gcloud run deploy budget-api \
  --set-env-vars LOG_LEVEL=info \
  --region us-south1
```

Or set in Cloud Console:
1. Go to Cloud Run → budget-api
2. Click **EDIT & DEPLOY NEW REVISION**
3. Go to **VARIABLES & SECRETS**
4. Add: `LOG_LEVEL` = `info`

## Example: Complete Controller with Logging

```javascript
const logger = require('../config/logger');
const pool = require('../config/database');

exports.createBudget = async (req, res) => {
  const startTime = Date.now();
  
  try {
    logger.info('CreateBudget - Request received', {
      userId: req.user?.id,
      budgetYear: req.body.budgetYear
    });

    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Business logic here
      const result = await client.query(insertQuery, params);
      
      await client.query('COMMIT');
      
      const duration = Date.now() - startTime;
      logger.info('CreateBudget - Success', {
        budgetId: result.rows[0].id,
        duration: `${duration}ms`
      });
      
      res.status(201).json({ success: true, id: result.rows[0].id });
      
    } finally {
      client.release();
    }
    
  } catch (error) {
    logger.logError(error, {
      endpoint: 'createBudget',
      userId: req.user?.id,
      duration: `${Date.now() - startTime}ms`
    });
    
    res.status(500).json({ error: 'Internal server error' });
  }
};
```

## Alerts and Monitoring

### Create Log-based Alerts in GCP

1. Go to: Logging → Logs-based Metrics
2. Click **CREATE METRIC**
3. Configure:
   - Filter: `severity="ERROR"`
   - Metric Type: Counter
   - Name: `budget-api-errors`

4. Create Alert Policy:
   - Go to: Monitoring → Alerting
   - Click **CREATE POLICY**
   - Select your metric
   - Set threshold (e.g., > 10 errors in 5 minutes)
   - Configure notification channels

## Troubleshooting

### Logs Not Appearing in GCP

1. **Check Service Account Permissions**
   ```bash
   gcloud projects add-iam-policy-binding PROJECT_ID \
     --member="serviceAccount:SERVICE_ACCOUNT" \
     --role="roles/logging.logWriter"
   ```

2. **Verify Environment Detection**
   - Check if `K_SERVICE` environment variable is set in Cloud Run

3. **Check Log Level**
   - Ensure `LOG_LEVEL` is not set to a restrictive level

### High Logging Costs

1. **Reduce Log Volume**
   - Set `LOG_LEVEL=info` in production
   - Use `debug` only when troubleshooting

2. **Set Log Retention**
   - Go to: Logging → Log Storage
   - Customize retention period per log type

3. **Exclude Health Checks**
   ```javascript
   // In server.js
   app.use((req, res, next) => {
     if (req.path === '/health') {
       return next(); // Don't log health checks
     }
     // Log other requests
     next();
   });
   ```

## Summary

✅ Logging is now configured with Winston
✅ Logs automatically go to GCP Cloud Logging in production
✅ View logs at: https://console.cloud.google.com/logs
✅ Use structured logging with context
✅ Set appropriate log levels for each environment
✅ Monitor errors and set up alerts
