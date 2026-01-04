# Service Unavailable Fix - POST /api/SalesBudget/InsertOrUpdateBudgetData

## Problem
The POST endpoint works locally but returns **503 Service Unavailable** when deployed to GCP Cloud Run.

## Root Causes Identified

### 1. **Request Body Size Limit** ⚠️
- **Issue**: Default Express.js body parser has a 100KB limit
- **Impact**: Large budget data arrays (JSON payload > 100KB) are rejected
- **Fix**: Increased limit to **50MB** in server.js

### 2. **Cloud Run Timeout** ⏱️
- **Issue**: Default Cloud Run timeout is 300 seconds (5 minutes)
- **Impact**: Large dataset processing may exceed this limit
- **Fix**: Increased to **900 seconds (15 minutes)**

### 3. **Insufficient Resources** 💾
- **Issue**: 512Mi memory and 1 CPU may be insufficient for processing large arrays
- **Impact**: Container OOM kills or slow processing
- **Fix**: Upgraded to **1Gi memory** and **2 CPUs**

### 4. **Database Connection Pool** 🔌
- **Issue**: Cloud Run instances share connections; default pool (20) too high
- **Impact**: Connection exhaustion, timeouts
- **Fix**: Reduced pool to **5 connections** for Cloud Run, **20 for local**

### 5. **Missing Request Timeouts** 
- **Issue**: Node.js has default socket timeouts that may terminate long-running requests
- **Impact**: Request terminates before completion
- **Fix**: Added explicit **900s timeout** for requests and responses

## Changes Made

### 1. server.js
```javascript
// Increased body size limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Added request timeout middleware (15 minutes)
app.use((req, res, next) => {
  req.setTimeout(900000); // 15 minutes
  res.setTimeout(900000);
  next();
});
```

### 2. cloudbuild.yaml
```yaml
# Optimized Cloud Run configuration
- '--memory'
- '1Gi'              # Increased from 512Mi
- '--cpu'
- '2'                # Increased from 1
- '--timeout'
- '900'              # Added 15-minute timeout
- '--concurrency'
- '80'               # Added concurrency limit
```

### 3. config/database.js
```javascript
// Optimized connection pool for Cloud Run
const dbConfig = {
  // ...
  max: isCloudRun ? 5 : 20,  // Cloud Run: 5, Local: 20
  min: 1,
  connectionTimeoutMillis: 20000,  // Increased to 20s
  statement_timeout: 60000,        // 60s query timeout
  query_timeout: 60000,
};

// Updated to correct IP
dbConfig.host = '34.174.171.33';  // Updated from old IP
```

## Deployment Instructions

### Option 1: Using Cloud Build (Recommended)
```bash
cd budget-api
gcloud builds submit --config cloudbuild.yaml
```

### Option 2: Using Deploy Scripts
```bash
# Linux/Mac
./deploy-fix.sh

# Windows PowerShell
./deploy-fix.ps1
```

### Option 3: Manual Deployment
```bash
gcloud run deploy budget-api \
  --source . \
  --region us-south1 \
  --memory 1Gi \
  --cpu 2 \
  --timeout 900 \
  --concurrency 80 \
  --min-instances 1 \
  --max-instances 10 \
  --add-cloudsql-instances budget-project-483219:us-south1:budget-app \
  --allow-unauthenticated
```

## Testing After Deployment

### 1. Test Health Check
```bash
curl https://YOUR-SERVICE-URL.run.app/
```

### 2. Test POST Endpoint
```bash
curl -X POST https://YOUR-SERVICE-URL.run.app/api/SalesBudget/InsertOrUpdateBudgetData \
  -H "Content-Type: application/json" \
  -d '[{"budgetYear":2024,"budgetHeader_RefId":1,"budgetLine_RefId":1,...}]'
```

### 3. Monitor Logs
```bash
gcloud run services logs read budget-api --region us-south1 --limit 50
```

## Configuration Summary

| Setting | Before | After | Reason |
|---------|--------|-------|--------|
| Memory | 512Mi | **1Gi** | Handle large data processing |
| CPU | 1 | **2** | Faster processing |
| Timeout | 300s | **900s** | Allow long-running operations |
| Concurrency | default | **80** | Optimize throughput |
| Body Limit | 100kb | **50mb** | Accept large payloads |
| DB Pool (Cloud) | 20 | **5** | Prevent connection exhaustion |
| Request Timeout | none | **900s** | Prevent premature termination |
| DB IP | old | **34.174.171.33** | Correct instance IP |

## Expected Results

✅ POST requests with large budget data arrays (up to 50MB) will work  
✅ Processing up to 15 minutes without timeout  
✅ Better resource allocation for concurrent requests  
✅ Optimized database connection management  
✅ Proper error logging for debugging  

## Monitoring Tips

1. **Check Cloud Run Metrics**:
   - Memory usage (should be < 1Gi)
   - Request latency (should be < 900s)
   - Error rate (should be low)

2. **Check Logs**:
   ```bash
   gcloud run services logs tail budget-api --region us-south1
   ```

3. **Database Connections**:
   - Monitor active connections in Cloud SQL console
   - Should not exceed pool size (5)

## Rollback Plan

If issues persist:
```bash
# Revert to previous revision
gcloud run services update-traffic budget-api \
  --region us-south1 \
  --to-revisions PREVIOUS_REVISION=100
```

## Next Steps

1. Deploy the updated configuration
2. Test with actual budget data payload
3. Monitor logs and metrics
4. Adjust resources if needed based on actual usage
