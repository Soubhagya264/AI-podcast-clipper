"use server";

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";
import { inngest } from "@/inngest/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function processVideo(uploadedFileId: string) {
  const uploadedVideo = await db.uploadedFile.findUniqueOrThrow({
    where: {
      id: uploadedFileId,
    },
    select: {
      uploaded: true,
      id: true,
      userId: true,
    },
  });
  if (uploadedVideo.uploaded) return;

  await inngest.send({
    name: "process-video-events",
    data: { uploadedFileId: uploadedVideo.id, userId: uploadedVideo.userId },
  });

  await db.uploadedFile.update({
    where: {
      id: uploadedFileId,
    },
    data: {
      uploaded: true,
    },
  });

  revalidatePath("/Dashboard");
}

export async function getClipPlayUrl(
  clipId: string
): Promise<{ succes: boolean; url?: string; error?: string }> {
  console.log(clipId,"clipId1");
  const session = await getServerSession(authOptions);
  // if (!session?.user?.id) {
  //   return { succes: false, error: "Unauthorized" };
  // }

  try {
    console.log(clipId,"clipId");
    const clip = await db.clip.findUniqueOrThrow({
      where: {
        id: clipId,
        userId: session?.user?.id,
      },
    });

    const region = process.env.NEXT_PUBLIC_AWS_REGION!;
    const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!;
    const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!;

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error("Missing AWS credentials in environment variables");
    }

    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
    const command = new GetObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: clip.s3Key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    return { succes: true, url: signedUrl };
  } catch (error) {
    return { succes: false, error: "Failed to generate play URL." };
  }
}
