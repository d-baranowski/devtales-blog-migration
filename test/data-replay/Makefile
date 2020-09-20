SHELL := /bin/bash
export AWS_DEFAULT_REGION ?= eu-west-1
DEV_TABLE ?= gierkinet-dev-dynamodb-main
TABLE ?= gierkinet-prod-dynamodb-main
ENV ?= dev
PWD := $(shell pwd)
NETWORK ?= gierkinet-local
IMAGE_TAG= gierkinet-data-reset

ifeq ($(ENV), dev)
  TABLE = gierkinet-dev-dynamodb-main
endif

build:
	docker build . -t $(IMAGE_TAG)

wipe-test-database: build
	docker run --rm -v "$(PWD)/data:/code/data" -e AWS_REGION="$(AWS_REGION)" -e AWS_ACCESS_KEY_ID="$(AWS_ACCESS_KEY_ID)" -e AWS_SECRET_ACCESS_KEY="$(AWS_SECRET_ACCESS_KEY)" -e AWS_SESSION_TOKEN="$(AWS_SESSION_TOKEN)" $(IMAGE_TAG) ./recreate-table.sh $(TABLE) test

start-dev-database:
	docker network create $(NETWORK) || true
	docker-compose -f dev/docker-compose.yml up -d || true
	aws dynamodb delete-table --table-name $(DEV_TABLE) --endpoint-url http://localhost:8000 || true
	aws dynamodb wait table-not-exists --table-name $(DEV_TABLE) --endpoint-url http://localhost:8000 || true
	aws dynamodb create-table --cli-input-json file://data/schema.json --endpoint-url http://localhost:8000 || true
	aws dynamodb wait table-exists --table-name $(DEV_TABLE) --endpoint-url http://localhost:8000 || true

data-replay-state-1: build
	docker run --net $(NETWORK) --rm -v "$(PWD)/data:/code/data" -e AWS_REGION="$(AWS_REGION)" -e AWS_ACCESS_KEY_ID="$(AWS_ACCESS_KEY_ID)" -e AWS_SECRET_ACCESS_KEY="$(AWS_SECRET_ACCESS_KEY)" -e AWS_SESSION_TOKEN="$(AWS_SESSION_TOKEN)" $(IMAGE_TAG) ./load-data.sh data/state-1 $(TABLE) $(ENV)
