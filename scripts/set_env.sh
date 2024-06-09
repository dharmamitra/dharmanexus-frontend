#!/bin/bash

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
    echo "Usage: $0 <environment>"
    exit 1
fi

echo NEXT_PUBLIC_API_URL=https://dharmamitra.org/api-db/ > .env
echo NEXT_PUBLIC_DOWNLOAD_URL=https://dharmamitra.org/download/ >>.env
echo "NEXT_PUBLIC_DEPLOYMENT=$ENVIRONMENT" >>.env

# Optional: Add other environment-specific configurations
# echo "Other configurations can be added here"
# echo NEXT_PUBLIC_DM_API_BASE_URL=https://dharmamitra.org/api >>.env.production

echo ".env updated for $ENVIRONMENT environment"
