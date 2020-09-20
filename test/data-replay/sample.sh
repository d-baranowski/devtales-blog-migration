#!/usr/bin/env bash
docker run -e AWS_REGION="$AWS_REGION" -e AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" -e AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" -e AWS_SESSION_TOKEN="$AWS_SESSION_TOKEN" sgp-data-reset ./load-data.sh state-1-round-open Predictor
