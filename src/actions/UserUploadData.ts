import { authOptions } from "@/lib/nextAuth";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

export async function getUserUploadData() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userData = await db.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      credits: true,
      uploadedFiles: {
        where: { uploaded: true },
        select: {
          id: true,
          s3Key: true,
          displayName: true,
          status: true,
          createdAt: true,
          _count: { select: { clips: true } },
        },
      },
      clips: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const formattedFiles = userData.uploadedFiles.map((file) => ({
    id: file.id,
    s3Key: file.s3Key,
    filename: file.displayName ?? "Unknown filename",
    status: file.status,
    clipsCount: file._count.clips,
    createdAt: file.createdAt,
  }));

  return {
    user: {
      id: userData.id,
      name: userData.name,
      credits: userData.credits,
      clips: userData.clips,
      uploadedFiles: userData.uploadedFiles, // raw if needed
    },
    files: formattedFiles,
  };
}
