import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import db from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderID, credits } = await req.json();

  // TODO: Verify orderID with PayPal if needed

  const user = await db.user.update({
    where: { id: session.user.id },
    data: {
      credits: {
        increment: credits,
      },
    },
  });

  return NextResponse.json({ credits: user.credits });
}
