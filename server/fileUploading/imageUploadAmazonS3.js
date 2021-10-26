const fs = require("fs");
const aws = require("aws-sdk");
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

aws.config.update({
  accessKeyId,
  secretAccessKey,
});

// create a new instance of s3
const s3 = new aws.S3();

// upload a file to s3

const uploadImageToS3 = (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    // ACL: "public-read",
  };
  return s3.upload(uploadParams).promise();
};

//download a file from s3

module.exports = uploadImageToS3;
