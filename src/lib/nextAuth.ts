// src/lib/nextAuth.ts

import NextAuth, { type DefaultSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { comparePasswords } from "@/lib/passwordChecker";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;
        const valid = await comparePasswords(
          credentials.password,
          user.password
        );
        if (!valid) return null;
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
    callbacks: {
      async signIn({ user, account, profile }) {
        console.log("✅ signIn callback fired");
        if (account?.provider === "google" && profile?.email) {
          console.log("🌈 Google OAuth sign-in");
          
          // 1️⃣ Find or create User
          let existingUser = await db.user.findUnique({
            where: { email: profile.email },
          });
    
          console.log("✅ Existing user:", existingUser);
    
          if (!existingUser) {
            existingUser = await db.user.create({
              data: {
                email: profile.email,
                name: profile.name ?? "Google User",
                password: "", // placeholder for OAuth
              },
            });
            console.log("✅ Created new user:", existingUser);
          }
    
          // 2️⃣ Check if Account exists
          const existingAccount = await db.account.findFirst({
            where: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          });
    
          console.log("✅ Existing account:", existingAccount);
    
          // 3️⃣ If missing, link it
          if (!existingAccount) {
            console.log("🔗 Linking new Google Account...");
            await db.account.create({
              data: {
                userId: existingUser.id,
                provider: account.provider,
                type: account.type,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token ?? null,
                access_token: account.access_token ?? null,
                expires_at:
                  typeof account.expires_at === "number" ? account.expires_at : null,
                token_type: account.token_type ?? null,
                scope: account.scope ?? null,
                id_token: account.id_token ?? null,
                session_state: account.session_state ?? null,
                refresh_token_expires_in:
                  typeof account.refresh_token_expires_in === "number"
                    ? account.refresh_token_expires_in
                    : null,
              },
            });
            console.log("✅ Google Account linked!");
          }
    
          // 🔄 Override user.id for session token
          user.id = existingUser.id;
        }
    
        return true;
      },
    jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user!,
          id: token.sub!,
        },
      };
    },
  },
  pages: { signIn: "/signIn" },
  secret: process.env.AUTH_SECRET,
};


