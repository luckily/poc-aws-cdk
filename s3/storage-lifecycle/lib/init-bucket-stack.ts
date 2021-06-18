import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

export interface InitBucketStackProps extends cdk.StackProps {}

export class InitBucketStack extends cdk.Stack {
  readonly bucket: s3.IBucket;
  constructor(scope: cdk.Construct, id: string, props?: InitBucketStackProps) {
    super(scope, id, props);
    
    this.bucket = new s3.Bucket(this, 'ExistedBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
  }
}