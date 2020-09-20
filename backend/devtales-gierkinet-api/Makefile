PRODUCT=gierkinet
ENVIRONMENT=prod
PARAMS=`cat params.${ENVIRONMENT}`
APP ?= $(PRODUCT)-$(ENVIRONMENT)-cf-api
BUCKET ?= $(PRODUCT)-$(ENVIRONMENT)-s3-api


package: build
	@aws s3api head-bucket --bucket $(BUCKET) || aws s3 mb s3://$(BUCKET)
	sam package \
   	--output-template-file packaged.yaml \
    --s3-bucket $(BUCKET)

deploy: PARAMS ?= =
deploy: package
		AWS_REGION=eu-west-1 sam deploy \
			--template-file packaged.yaml \
			--parameter-overrides $(PARAMS) \
			--stack-name $(APP) \
			--capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND \
			--confirm-changeset

build:
	sam build
