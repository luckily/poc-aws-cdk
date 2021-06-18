import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

interface BucketStorageLifecycleStackProps extends cdk.StackProps {
  existedBucketArn: string;
}

export class BucketStorageLifecycleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BucketStorageLifecycleStackProps) {
    super(scope, id, props);

    const bucketFromImported = s3.Bucket.fromBucketArn(this, 'ExistedBucket', props.existedBucketArn);
    this.createNewBucketForDemo();
  }

  createNewBucketForDemo(): void {
    const bucket = new s3.Bucket(this, 'NewBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    bucket.addLifecycleRule({
      enabled: true,
      tagFilters: [
        '{"type": "png"}',
      ],
      transitions: [
        {
          storageClass: s3.StorageClass.INTELLIGENT_TIERING,
          transitionAfter: cdk.Duration.days(1),
        },
      ],
      expiration: cdk.Duration.days(2),
    });
  }
}
