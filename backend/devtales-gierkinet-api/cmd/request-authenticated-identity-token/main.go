package main

import (
	"devtales-gierkinet-api/pkg/response"
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/d-baranowski/gierkinetlib/config"
	"github.com/d-baranowski/gierkinetlib/sessions"
	log "github.com/sirupsen/logrus"
)

func handler(events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	session, err := sessions.GenerateGuestSession(log.StandardLogger())

	if err != nil {
		return response.ServerSideError, nil
	}

	output, err := json.Marshal(session)

	if err != nil {
		log.WithFields(log.Fields{ "error": err, "code": "dW6sFVI" }).Fatalf("Failed to marshal session")
		return response.ServerSideError, nil
	}

	return events.APIGatewayProxyResponse{
		Body:      string(output),
		StatusCode: 200,
	}, nil
}

func init() {
	config.ConfigureLogrus(log.StandardLogger())
}

func main() {
	lambda.Start(handler)
}
