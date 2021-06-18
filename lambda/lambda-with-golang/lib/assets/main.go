package main

import (
	"context"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-lambda-go/events"
)

func HandleRequest(ctx context.Context, event events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	return events.APIGatewayV2HTTPResponse{
		StatusCode: 200,
		Body:       "CDK!",
	}, nil
}

func main() {
    lambda.Start(HandleRequest)
}