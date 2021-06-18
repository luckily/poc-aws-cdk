import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda-go';
import * as apigatewayv2 from '@aws-cdk/aws-apigatewayv2';
import * as apigintegration from '@aws-cdk/aws-apigatewayv2-integrations';
import * as path from 'path';
import { exec } from 'child_process';

export class LambdaWithGolangStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const handler = new lambda.GoFunction(this, 'GoFunction', {
      entry: path.join(__dirname, 'assets'),
      bundling: {
        environment: {
          CGO_ENABLED: '0',
          GOOS: 'linux',
          GOARCH: 'amd64',
        },
        goBuildFlags: ['-ldflags "-s -w"'],
      },
    });

    // // old way
    // const handler = new lambda.GoFunction(this, 'Function', {
    //   code: lambda.Code.fromAsset(entry, {
    //     bundling: {
    //       // for local build
    //       local: {
    //         tryBundle(outputDir: string) {
    //           exec(
    //             [
    //               `go mod download`,
    //               `go build -o ${path.join(outputDir, 'main')}`,
    //             ].join(' && '),
    //             {
    //               env: { ...process.env, ...environment},
    //               cwd: entry,
    //             },
    //           );
    //           return true;
    //         }
    //       },

    //       // for remote machine build
    //       image: lambda.Runtime.GO_1_X.bundlingImage,
    //       command: [
    //         'bash', '-c', [
    //           `go mod download`,
    //           `go build -o /asset-output/main`,
    //         ].join(' && '),
    //       ],
    //     },
    //   }),
    //   runtime: lambda.Runtime.GO_1_X,
    //   handler: 'main',
    // });

    const api = new apigatewayv2.HttpApi(this, 'Api', {
      createDefaultStage: true,
      corsPreflight: {
        allowMethods: [apigatewayv2.CorsHttpMethod.GET],
        allowOrigins: ['*']
      },
    });

    api.addRoutes({
      path: '/hello',
      methods: [apigatewayv2.HttpMethod.GET],
      integration: new apigintegration.LambdaProxyIntegration({
        handler,
      })
    });

    new cdk.CfnOutput(this, 'ApiUrlOutput', { value: api.url! });
  }
}
