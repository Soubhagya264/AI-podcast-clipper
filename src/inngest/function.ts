import { inngest } from "./client";
import { db } from "@/lib/prisma";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

export const processVideo = inngest.createFunction(
  {
    id: "process-video",
    retries: 1,
    concurrency: {
      limit: 1,
      key: "event.data.userId",
    },
  },
  { event: "process-video-events" },
  async ({ event, step }) => {
    const { uploadedFileId } = event.data as {
      uploadedFileId: string;
      userId: string;
    };

    // ✅ Extract all env vars up front with type checks
    const REGION = process.env.NEXT_PUBLIC_AWS_REGION;
    const ACCESS_KEY_ID = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
    const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
    const BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
    const PROCESS_VIDEO_ENDPOINT =
      process.env.NEXT_PUBLIC_PROCESS_VIDEO_ENDPOINT;
    const PROCESS_VIDEO_ENDPOINT_AUTH =
      process.env.NEXT_PUBLIC_PROCESS_VIDEO_ENDPOINT_AUTH;

    if (!REGION || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
      throw new Error("Missing AWS S3 credentials in environment variables");
    }

    if (!BUCKET_NAME) {
      throw new Error("Missing S3 bucket name in environment variables");
    }

    if (!PROCESS_VIDEO_ENDPOINT || !PROCESS_VIDEO_ENDPOINT_AUTH) {
      throw new Error(
        "Missing PROCESS_VIDEO_ENDPOINT or its auth token in env variables"
      );
    }

    const s3Client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    });

    try {
      const { userId, credits, s3Key } = await step.run(
        "check-credits",
        async () => {
          const uploadedFile = await db.uploadedFile.findUniqueOrThrow({
            where: {
              id: uploadedFileId,
            },
            select: {
              user: {
                select: {
                  id: true,
                  credits: true,
                },
              },
              s3Key: true,
            },
          });

          return {
            userId: uploadedFile.user.id,
            credits: uploadedFile.user.credits,
            s3Key: uploadedFile.s3Key,
          };
        }
      );

      if (credits > 0) {
        await step.run("set-status-processing", async () => {
          await db.uploadedFile.update({
            where: { id: uploadedFileId },
            data: { status: "processing" },
          });
        });

        await step.fetch(PROCESS_VIDEO_ENDPOINT, {
          method: "POST",
          body: JSON.stringify({ s3_key: s3Key }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${PROCESS_VIDEO_ENDPOINT_AUTH}`,
          },
        });

        const { clipsFound } = await step.run(
          "create-clips-in-db",
          async () => {
            const folderPrefix = s3Key.split("/")[0]!;

            const allKeys = await listS3ObjectsByPrefix(
              s3Client,
              BUCKET_NAME,
              folderPrefix
            );

            const clipKeys = allKeys.filter(
              (key): key is string =>
                key !== undefined && !key.endsWith("original.mp4")
            );

            if (clipKeys.length > 0) {
              await db.clip.createMany({
                data: clipKeys.map((clipKey) => ({
                  s3Key: clipKey,
                  uploadedFileId,
                  userId,
                })),
              });
            }

            return { clipsFound: clipKeys.length };
          }
        );

        await step.run("deduct-credits", async () => {
          await db.user.update({
            where: { id: userId },
            data: {
              credits: {
                decrement: Math.min(credits, clipsFound),
              },
            },
          });
        });

        await step.run("set-status-processed", async () => {
          await db.uploadedFile.update({
            where: { id: uploadedFileId },
            data: { status: "processed" },
          });
        });
      } else {
        await step.run("set-status-no-credits", async () => {
          await db.uploadedFile.update({
            where: { id: uploadedFileId },
            data: { status: "no credits" },
          });
        });
      }
    } catch (error: unknown) {
      await db.uploadedFile.update({
        where: { id: uploadedFileId },
        data: { status: "failed" },
      });
    }
  }
);

// ✅ Pass the safe client & bucket explicitly
async function listS3ObjectsByPrefix(
  s3Client: S3Client,
  bucketName: string,
  prefix: string
) {
  const listCommand = new ListObjectsV2Command({
    Bucket: bucketName,
    Prefix: prefix,
  });

  const response = await s3Client.send(listCommand);
  return response.Contents?.map((item) => item.Key).filter(Boolean) ?? [];
}
