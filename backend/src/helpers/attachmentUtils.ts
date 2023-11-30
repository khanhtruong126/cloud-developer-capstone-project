import * as AWS from 'aws-sdk'

const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)
const s3BucketName = process.env.S3_BUCKET;

// TODO: Implement the fileStogare logic
export async function getPresignedAttachmentUrl(todoId: string): Promise<string> {
    const bucketName = process.env.S3_BUCKET
    const urlExpireTime = parseInt(process.env.SIGNED_URL_EXPIRATION, 300);
    const s3 = new XAWS.S3({ signatureVersion: 'v4' });
    
    const signedUrl = s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: todoId,
      Expires: urlExpireTime
    });
  
    return signedUrl
  }

  export function getAttachmentUrl(photoKey: string): string {
    return `https://${s3BucketName}.s3.amazonaws.com/${photoKey}`
  }