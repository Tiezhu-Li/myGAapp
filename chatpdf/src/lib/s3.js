import { S3 } from "aws-sdk";

export async function uploadToS3(file) {
  try {
    const s3 = new S3({
      region: "ap-southeast-2",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
      },
    });

    const file_key =
      "uploads/" + Date.now().toString() + file.name.replace(" ", "-");

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: file_key,
      Body: file,
    };
    s3.putObject(params, (err, data) => {
      return {
        file_key,
        file_name: file.name,
      };
    });
  } catch (error) {
    console.log(error);
  }
}

export function getS3Url(file_key) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-southeast-2.amazonaws.com/${file_key}`;
  return url;
}
