import aws from 'aws-sdk';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const bucketName = process.env.AWS_BUCKETNAME

const s3 = new aws.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESKEYID,
  secretAccessKey: process.env.AWS_SECRETACCESS_KEY,
  signatureVersion  : "v4"
});


export const generatePreSignedUrl = async () => {
  const uniqueId = uuidv4();
  const newFileName = uniqueId.toString('hex');
  // console.log(newFileName)
  const params = {
    Bucket: bucketName,
    Key: newFileName,
    Expires: 60, // expires in 1 minute
  };

  const signedUrl = await s3.getSignedUrlPromise('putObject', params);
  return signedUrl;
};