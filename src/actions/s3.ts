"use server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@/env";
import { v4 as uuidv4 } from "uuid";

import db from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function generateUploadUrl(fileInfo: {
  filename: string;
  contentType: string;
}): Promise<{
  success: boolean;
  signedUrl: string;
  key: string;
  uploadedFileId: string;
}>{
 
  const session = await getServerSession(authOptions);
  
  if (!session) {
    console.log("NO SESSION FOUND");
    throw new Error("Unauthorized");
  }
  
 
  const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
  });
  
  
  const fileExtension = fileInfo.filename.split(".").pop() ?? "";
  const uniqueId = uuidv4();
  const key = `${uniqueId}/original.${fileExtension}`;
  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: key,
    ContentType: fileInfo.contentType,
  });
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });
  console.log(db, "db");
  console.log(signedUrl,"signedURL");
  const uploadedFileDbRecord = await db.uploadedFile.create({
    data: {
      userId: session?.user?.id,
      s3Key: key,
      displayName: fileInfo.filename,
      uploaded: false,
    },
    select: {
      id: true,
    },
  });

  return {
    success: true,
    signedUrl,
    key,
    uploadedFileId: uploadedFileDbRecord.id,
  };

}