#!/bin/bash
# Deploy Budget API to Cloud Run with optimized settings for large POST requests

PROJECT_ID="budget-project-483219"
REGION="us-south1"
SERVICE_NAME="budget-api"
INSTANCE_CONNECTION="budget-project-483219:us-south1:budget-app"

echo "🚀 Deploying Budget API to Cloud Run..."
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo "Service: $SERVICE_NAME"
echo ""

# Deploy with optimized settings
gcloud run deploy $SERVICE_NAME \
  --source . \
  --project $PROJECT_ID \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --port 80 \
  --memory 1Gi \
  --cpu 2 \
  --timeout 900 \
  --concurrency 80 \
  --min-instances 1 \
  --max-instances 10 \
  --add-cloudsql-instances $INSTANCE_CONNECTION \
  --set-env-vars NODE_ENV=production,PORT=80,DB_NAME=postgres,DB_USER=postgres \
  --set-secrets DB_PASSWORD=budget-db-password:latest

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Getting service URL..."
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME \
  --project $PROJECT_ID \
  --region $REGION \
  --format 'value(status.url)')

echo ""
echo "📍 Service URL: $SERVICE_URL"
echo "📚 Swagger: $SERVICE_URL/swagger"
echo ""
echo "Test endpoints:"
echo "  GET  $SERVICE_URL/"
echo "  POST $SERVICE_URL/api/SalesBudget/InsertOrUpdateBudgetData"
