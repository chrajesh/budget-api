# Cloud Run to Cloud SQL Connection Guide

## Problem
Cloud Run instances cannot connect to Cloud SQL using public IP whitelisting because Cloud Run uses dynamic IP addresses.

## Solution
Use Cloud SQL's **Unix socket connection** which is built into Cloud Run.

---

## Step 1: Store Database Password in Secret Manager

First, create a secret for your database password (more secure than environment variables):

```powershell
# Create secret in Secret Manager
gcloud secrets create budget-db-password `
  --data-file=- `
  --replication-policy="automatic" `
  --project=budget-project-483219

# When prompted, type your password: A15gim0T!@
# Then press Ctrl+Z and Enter (Windows) or Ctrl+D (Mac/Linux)
```

Or create it directly:
```powershell
echo "A15gim0T!@" | gcloud secrets create budget-db-password `
  --data-file=- `
  --replication-policy="automatic" `
  --project=budget-project-483219
```

Grant Cloud Run access to the secret:
```powershell
gcloud secrets add-iam-policy-binding budget-db-password `
  --member="serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com" `
  --role="roles/secretmanager.secretAccessor" `
  --project=budget-project-483219
```

To get your project number:
```powershell
gcloud projects describe budget-project-483219 --format="value(projectNumber)"
```

---

## Step 2: Deploy with Cloud SQL Connection

### Option A: Using PowerShell Script (Recommended for Windows)

```powershell
cd c:\learnings\budget-app-v3\budget-api
.\deploy-cloud-run.ps1
```

### Option B: Manual Deployment

```powershell
gcloud run deploy budget-api `
  --source . `
  --region us-south1 `
  --platform managed `
  --allow-unauthenticated `
  --port 80 `
  --memory 512Mi `
  --cpu 1 `
  --add-cloudsql-instances budget-project-483219:us-south1:budget-app `
  --set-env-vars NODE_ENV=production,PORT=80,DB_NAME=postgres,DB_USER=postgres `
  --set-secrets DB_PASSWORD=budget-db-password:latest `
  --project budget-project-483219
```

### Option C: Using Cloud Build

```powershell
gcloud builds submit --config cloudbuild.yaml --project budget-project-483219
```

---

## Step 3: Verify Connection

After deployment, test your API:

```powershell
# Get the service URL
$SERVICE_URL = gcloud run services describe budget-api --region us-south1 --format="value(status.url)"

# Test the API
curl "$SERVICE_URL/api/health"

# Test database connection
curl "$SERVICE_URL/api/sales-budget/test-connection"
```

---

## How It Works

### Local Development:
- Uses **direct IP connection** (`34.174.94.164:5432`)
- Requires your IP whitelisted in Cloud SQL
- SSL connection

### Cloud Run (Production):
- Uses **Unix socket** (`/cloudsql/budget-project-483219:us-south1:budget-app`)
- No IP whitelisting needed
- Secure internal connection
- No SSL required (already encrypted)

The code automatically detects the environment:
```javascript
const isCloudRun = process.env.K_SERVICE !== undefined;
```

---

## Troubleshooting

### Issue 1: "Error: connect ENOENT /cloudsql/..."
**Solution:** Ensure `--add-cloudsql-instances` flag is set correctly in deployment

### Issue 2: "password authentication failed"
**Solution:** 
1. Verify secret exists: `gcloud secrets describe budget-db-password`
2. Check IAM permissions for Cloud Run service account
3. Update secret: `echo "NEW_PASSWORD" | gcloud secrets versions add budget-db-password --data-file=-`

### Issue 3: Still getting "Service Unavailable"
**Solution:**
1. Check Cloud Run logs: `gcloud run services logs read budget-api --region us-south1`
2. Verify Cloud SQL instance is running
3. Check connection string matches exactly: `budget-project-483219:us-south1:budget-app`

---

## Security Best Practices

✅ **DO:**
- Use Secret Manager for passwords
- Use Unix socket for Cloud Run connections
- Keep your local IP whitelisted for development
- Use environment variables for configuration

❌ **DON'T:**
- Hardcode passwords in code
- Try to whitelist Cloud Run IPs (they're dynamic)
- Use public IP for Cloud Run connections
- Commit secrets to Git

---

## Quick Reference

**Your Cloud SQL Instance:**
- Connection Name: `budget-project-483219:us-south1:budget-app`
- Public IP: `34.174.94.164`
- Region: `us-south1`
- Database: `postgres`
- User: `postgres`

**Cloud Run Service:**
- Name: `budget-api`
- Region: `us-south1`
- Project: `budget-project-483219`

**Deployment Commands:**
```powershell
# Deploy with script
.\deploy-cloud-run.ps1

# View logs
gcloud run services logs read budget-api --region us-south1 --limit 50

# Get service URL
gcloud run services describe budget-api --region us-south1 --format="value(status.url)"

# Update environment variables
gcloud run services update budget-api --region us-south1 --update-env-vars KEY=VALUE
```
