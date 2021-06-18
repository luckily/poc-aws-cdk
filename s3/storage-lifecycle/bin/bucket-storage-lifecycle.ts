#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { InitBucketStack } from '../lib/init-bucket-stack';
import { BucketStorageLifecycleStack } from '../lib/bucket-storage-lifecycle-stack';

const app = new cdk.App();

const initBucket = new InitBucketStack(app, 'InitBucketStack');

const storageLifecycle = new BucketStorageLifecycleStack(app, 'BucketStorageLifecycleStack', {
  existedBucketArn: initBucket.bucket.bucketArn,
});

storageLifecycle.addDependency(initBucket);

app.synth();