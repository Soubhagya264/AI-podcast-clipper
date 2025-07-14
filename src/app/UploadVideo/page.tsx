// app/upload/page.tsx
import { getUserUploadData } from "@/actions/UserUploadData";
import SidebarCommon from "../_components/SidebarCommon";
import UploadClient from "../_components/workspace/UploadClient";
import { auth } from "@/lib/auth-handler";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function UploadVideo() {
    const { user, files } = await getUserUploadData();

    return (
        <div className="relative flex h-screen w-full overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#020409] via-[#020409] to-black" />



            {/* Sidebar */}
            <SidebarCommon />

            {/* Main content */}
            <main className="flex-1 overflow-auto p-8 z-10">
                <UploadClient  uploadedFiles={files} clips={user.clips} />
            </main>
        </div>
    );
}
