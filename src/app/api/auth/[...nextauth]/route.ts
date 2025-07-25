import NextAuth from "next-auth";
import { authOptions } from "@/lib/nextAuth";

export const runtime = "nodejs";

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
