PRODUCT="gierkinet"
ENVIRONMENT="prod"
CLIENT_BUCKET ?= $(PRODUCT)-$(ENVIRONMENT)-s3-client

package:
	npm run build

deploy: package
	aws s3 sync --delete ./out s3://$(CLIENT_BUCKET)
