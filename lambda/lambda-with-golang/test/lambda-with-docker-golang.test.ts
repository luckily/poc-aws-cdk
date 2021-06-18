import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as LambdaWithDockerGolang from '../lib/lambda-with-golang-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new LambdaWithDockerGolang.LambdaWithGolangStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
