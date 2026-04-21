#!/usr/bin/env bash
# Deploy Azure Function to moneycar-import-fn
# Usage: ./deploy.sh
# Requires: az CLI logged in, npm

set -e

RESOURCE_GROUP="moneycar-crm-rg"
FUNCTION_APP="moneycar-import-fn"
STORAGE_ACCOUNT="moneycarcrmsa"
CONTAINER="function-releases"
BLOB_NAME="moneycar-fn-final.zip"
BUILD_DIR="/tmp/moneycar-fn-deploy-$$"

echo "Building TypeScript..."
npm run build

echo "Creating clean deploy directory (no pnpm symlinks)..."
mkdir -p "$BUILD_DIR"
cp -r dist "$BUILD_DIR/"
cp host.json "$BUILD_DIR/"
cat > "$BUILD_DIR/package.json" << 'EOF'
{
  "name": "moneycar-import-service",
  "version": "0.1.0",
  "main": "dist/src/functions/importMdb.js",
  "dependencies": {
    "@azure/functions": "^4.5.0",
    "@azure/storage-blob": "^12.26.0",
    "@supabase/supabase-js": "^2.45.0",
    "cookie": "^1.0.0",
    "mdb-reader": "^3.2.0"
  }
}
EOF

echo "Installing production dependencies..."
cd "$BUILD_DIR"
HOME=/tmp npm install --production --silent

echo "Creating deployment zip..."
zip -r /tmp/moneycar-fn-deploy.zip . -x "*.DS_Store" -x "node_modules/.cache/*" > /dev/null

echo "Uploading to Azure Blob Storage..."
CONN=$(az storage account show-connection-string --name "$STORAGE_ACCOUNT" --resource-group "$RESOURCE_GROUP" --query connectionString -o tsv)
az storage blob upload \
  --container-name "$CONTAINER" \
  --file /tmp/moneycar-fn-deploy.zip \
  --name "$BLOB_NAME" \
  --connection-string "$CONN" \
  --overwrite \
  --output none

SAS_URL=$(az storage blob generate-sas \
  --container-name "$CONTAINER" \
  --name "$BLOB_NAME" \
  --connection-string "$CONN" \
  --permissions r \
  --expiry "$(date -v+2y +%Y-%m-%d)" \
  --full-uri \
  --output tsv)

echo "Updating Function App package URL..."
az functionapp config appsettings set \
  --name "$FUNCTION_APP" \
  --resource-group "$RESOURCE_GROUP" \
  --settings "WEBSITE_RUN_FROM_PACKAGE=$SAS_URL" \
  --output none

echo "Restarting Function App..."
az functionapp restart --name "$FUNCTION_APP" --resource-group "$RESOURCE_GROUP"

# Cleanup
cd /
rm -rf "$BUILD_DIR" /tmp/moneycar-fn-deploy.zip

echo ""
echo "Deployed to: https://${FUNCTION_APP}.azurewebsites.net"
