import * as aws from 'aws-sdk'

aws.config.region = process.env.AWS_REGION // Region
aws.config.credentials = new aws.CognitoIdentityCredentials({
  IdentityPoolId: process.env.AWS_IDENTITY_POOL_ID ?? '',
})
export const AWS = aws

export const S3 = new aws.S3()
