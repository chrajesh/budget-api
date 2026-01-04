# Deploy Budget API to Cloud Run with optimized settings for large POST requests
# PowerShell Script

$PROJECT_ID = "budget-project-483219"
$REGION = "us-south1"
$SERVICE_NAME = "budget-api"
$INSTANCE_CONNECTION = "budget-project-483219:us-south1:budget-app"

Write-Host "🚀 Deploying Budget API to Cloud Run..." -ForegroundColor Cyan
Write-Host "Project: $PROJECT_ID"
Write-Host "Region: $REGION"
Write-Host "Service: $SERVICE_NAME"
Write-Host ""

# Deploy with optimized settings
gcloud run deploy $SERVICE_NAME `
  --source . `
  --project $PROJECT_ID `
  --region $REGION `
  --platform managed `
  --allow-unauthenticated `
  --port 80 `
  --memory 1Gi `
  --cpu 2 `
  --timeout 900 `
  --concurrency 80 `
  --min-instances 1 `
  --max-instances 10 `
  --add-cloudsql-instances $INSTANCE_CONNECTION `
  --set-env-vars NODE_ENV=production,PORT=80,DB_NAME=postgres,DB_USER=postgres `
  --set-secrets DB_PASSWORD=budget-db-password:latest

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Getting service URL..."
$SERVICE_URL = gcloud run services describe $SERVICE_NAME `
  --project $PROJECT_ID `
  --region $REGION `
  --format 'value(status.url)'

Write-Host ""
Write-Host "📍 Service URL: $SERVICE_URL" -ForegroundColor Yellow
Write-Host "📚 Swagger: $SERVICE_URL/swagger" -ForegroundColor Yellow
Write-Host ""
Write-Host "Test endpoints:"
Write-Host "  GET  $SERVICE_URL/"
Write-Host "  POST $SERVICE_URL/api/SalesBudget/InsertOrUpdateBudgetData"
