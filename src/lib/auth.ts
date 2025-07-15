// src/lib/auth.ts

import NextAuth from "next-auth";
import { authOptions } from "./nextAuth";

export const handler = NextAuth(authOptions);
