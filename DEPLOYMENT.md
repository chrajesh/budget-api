# Budget API - GCP Deployment Guide

## Deployment Options

This API can be deployed to Google Cloud Platform using several methods:

### Option 1: Cloud Run (Recommended)

Cloud Run is serverless, scales automatically, and only charges for actual usage.

#### Prerequisites
```bash
# Install Google Cloud SDK
# Visit: https://cloud.google.com/sdk/docs/install

# Login to GCP
gcloud auth login

# Set your project
gcloud config set project YOUR_PROJECT_ID
```

#### Deploy to Cloud Run
```bash
# Build and deploy in one command
gcloud run deploy budget-api \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 80 \
  --memory 512Mi \
  --set-env-vars NODE_ENV=production,PORT=80

# Or use Cloud Build (automated)
gcloud builds submit --config cloudbuild.yaml
```

#### Update Service
```bash
# Deploy new version
gcloud run deploy budget-api \
  --source . \
  --region us-central1
```

### Option 2: App Engine

App Engine provides automatic scaling and load balancing.

#### Deploy to App Engine
```bash
# Deploy using app.yaml
gcloud app deploy app.yaml

# View your app
gcloud app browse
```

### Option 3: Compute Engine with Docker

For more control over the infrastructure.

#### Create and Deploy VM
```bash
# Create a VM instance
gcloud compute instances create budget-api-vm \
  --zone=us-central1-a \
  --machine-type=e2-small \
  --image-family=cos-stable \
  --image-project=cos-cloud \
  --boot-disk-size=10GB \
  --tags=http-server,https-server

# SSH into the instance
gcloud compute ssh budget-api-vm --zone=us-central1-a

# On the VM, clone your repo and run:
docker-compose up -d

# Configure firewall
gcloud compute firewall-rules create allow-http \
  --allow tcp:80 \
  --target-tags http-server
```

### Option 4: Google Kubernetes Engine (GKE)

For microservices and advanced orchestration.

#### Deploy to GKE
```bash
# Create cluster
gcloud container clusters create budget-api-cluster \
  --num-nodes=2 \
  --zone=us-central1-a

# Build and push image
docker build -t gcr.io/YOUR_PROJECT_ID/budget-api:latest .
docker push gcr.io/YOUR_PROJECT_ID/budget-api:latest

# Deploy to Kubernetes
kubectl create deployment budget-api \
  --image=gcr.io/YOUR_PROJECT_ID/budget-api:latest

kubectl expose deployment budget-api \
  --type=LoadBalancer \
  --port=80 \
  --target-port=80
```

## Local Docker Testing

Test the Docker image locally before deploying:

```bash
# Build the image
docker build -t budget-api:latest .

# Run the container
docker run -p 80:80 budget-api:latest

# Or use docker-compose
docker-compose up

# Test the API
curl http://localhost:80
curl http://localhost:80/swagger
```

## Environment Variables

Set these in your GCP deployment:

- `PORT=80` - Application port
- `NODE_ENV=production` - Environment mode

## Monitoring & Logging

### Cloud Run Logs
```bash
gcloud run services logs read budget-api --region us-central1
```

### Set up Monitoring
```bash
# Enable Cloud Monitoring
gcloud services enable monitoring.googleapis.com

# View metrics in Cloud Console
# Navigate to: Cloud Run > budget-api > Metrics
```

## Cost Optimization

- **Cloud Run**: Pay only for actual requests (Free tier: 2M requests/month)
- **App Engine**: F1 instance ~$50/month
- **Compute Engine**: e2-micro ~$7/month (free tier eligible)
- **GKE**: Starting at ~$75/month for small cluster

## CI/CD Integration

### GitHub Actions with Cloud Run
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Cloud Run

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - uses: google-github-actions/setup-gcloud@v0
        with:
          service_account_key: ${{ secrets.GCP_SA_KEY }}
          project_id: ${{ secrets.GCP_PROJECT_ID }}
      
      - name: Deploy to Cloud Run
        run: |
          gcloud builds submit --config cloudbuild.yaml
```

## Security Best Practices

1. **Enable HTTPS**: Cloud Run provides automatic HTTPS
2. **Authentication**: Add API keys or OAuth2
3. **Rate Limiting**: Implement rate limiting middleware
4. **Secrets Management**: Use Secret Manager for sensitive data
5. **VPC**: Use VPC for internal services

## Scaling Configuration

Cloud Run auto-scales based on:
- CPU utilization: Target 65%
- Max instances: 10
- Min instances: 1
- Request timeout: 300s

Adjust in `cloudbuild.yaml` or via console.

## Troubleshooting

### Check service status
```bash
gcloud run services describe budget-api --region us-central1
```

### View logs
```bash
gcloud run services logs read budget-api --region us-central1 --limit 50
```

### Test endpoint
```bash
SERVICE_URL=$(gcloud run services describe budget-api --region us-central1 --format='value(status.url)')
curl $SERVICE_URL
curl $SERVICE_URL/swagger
```

## Cleanup

```bash
# Delete Cloud Run service
gcloud run services delete budget-api --region us-central1

# Delete App Engine version
gcloud app versions delete VERSION_ID

# Delete Compute Engine VM
gcloud compute instances delete budget-api-vm --zone us-central1-a
```
