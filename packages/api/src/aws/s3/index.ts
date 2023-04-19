import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: process.env.AWS_REGION },
    identityPoolId: process.env.AWS_IDENTITY_POOL_ID ?? '',
  }),
})
export const S3 = client

export type PresignedUrlInput = {
  bucket: string
  key: string
}

export const createUploadPresignedUrl = async ({
  bucket,
  key,
}: PresignedUrlInput) => {
  const command = new PutObjectCommand({ Bucket: bucket, Key: key })
  return getSignedUrl(client, command, { expiresIn: 3600 })
}

export const createDownloadPresignedUrl = async ({
  bucket,
  key,
}: PresignedUrlInput) => {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key })
  return getSignedUrl(client, command, { expiresIn: 3600 })
}
