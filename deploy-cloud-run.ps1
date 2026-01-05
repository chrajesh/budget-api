# Deploy Budget API to Cloud Run with Cloud SQL Connection
# PowerShell version for Windows

$PROJECT_ID = "budget-project-483219"
$SERVICE_NAME = "budget-api"
$REGION = "us-south1"
$INSTANCE_CONNECTION_NAME = "budget-project-483219:us-south1:budget-app"

Write-Host "Deploying Budget API to Cloud Run..." -ForegroundColor Green
Write-Host "Project: $PROJECT_ID"
Write-Host "Region: $REGION"
Write-Host "Service: $SERVICE_NAME"
Write-Host ""

gcloud run deploy $SERVICE_NAME `
  --source . `
  --region $REGION `
  --platform managed `
  --allow-unauthenticated `
  --port 80 `
  --memory 512Mi `
  --cpu 1 `
  --min-instances 0 `
  --max-instances 10 `
  --timeout 300 `
  --add-cloudsql-instances $INSTANCE_CONNECTION_NAME `
  --set-env-vars NODE_ENV=production,PORT=80,DB_NAME=postgres,DB_USER=postgres `
  --set-secrets DB_PASSWORD=budget-db-password:latest `
  --project $PROJECT_ID

Write-Host ""
Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Get service URL:"
Write-Host "gcloud run services describe $SERVICE_NAME --region $REGION --format='value(status.url)'"
