#!/bin/bash

# Deploy Budget API to Cloud Run with Cloud SQL Connection
# This script deploys the API with the necessary Cloud SQL configuration

PROJECT_ID="budget-project-483219"
SERVICE_NAME="budget-api"
REGION="us-south1"
INSTANCE_CONNECTION_NAME="budget-project-483219:us-south1:budget-app"

echo "Deploying Budget API to Cloud Run..."
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo "Service: $SERVICE_NAME"
echo ""

gcloud run deploy $SERVICE_NAME \
  --source . \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --port 80 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --timeout 300 \
  --add-cloudsql-instances $INSTANCE_CONNECTION_NAME \
  --set-env-vars NODE_ENV=production,PORT=80,DB_NAME=postgres,DB_USER=postgres \
  --set-secrets DB_PASSWORD=budget-db-password:latest \
  --project $PROJECT_ID

echo ""
echo "Deployment complete!"
echo ""
echo "Get service URL:"
echo "gcloud run services describe $SERVICE_NAME --region $REGION --format='value(status.url)'"
