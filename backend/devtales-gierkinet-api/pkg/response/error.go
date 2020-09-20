package response

import "github.com/aws/aws-lambda-go/events"

var (
	ServerSideError = events.APIGatewayProxyResponse{
		Body:       "It's not you it's us",
		StatusCode: 500,
	}
)
