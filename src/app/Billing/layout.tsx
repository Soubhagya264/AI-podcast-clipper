"use server"
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { authOptions } from "@/lib/auth";
import db from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export default async function BillingLayout({
    children,
}: {
    children: ReactNode;
}) {
    // ✅ Fetch the session correctly
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect("/signIn");
    }
    return (
        <div className="flex min-h-screen flex-col">
            <main className="container mx-auto">{children}</main>
        </div>
    );
}