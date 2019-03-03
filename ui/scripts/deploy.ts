// TODO: Write deploy script and remove gulp from the project

import aws from 'aws-sdk';
import winston from 'winston';
import fs from 'fs';
import { ManagedUpload } from 'aws-sdk/clients/s3';
console.log();

const bucket: string = process.env.AWS_S3_BUCKET || '';

const s3 = new aws.S3({
  region: process.env.AWS_REGION,
  // endpoint: process.env.AWS_S3_BUCKET,
});

async function uploadFiles(path: string) {
  const data: string = fs.readFileSync(path, 'utf-8');

  winston.info(`Uploading file ${path}`);

  const result: ManagedUpload.SendData = await s3.upload({
    Bucket: bucket,
    Body: data,
    Key: 'index.html',
  }).promise();

  console.log(result);

  winston.info(`File uploaded file ${path}`);
}


uploadFiles('public/index.html');

