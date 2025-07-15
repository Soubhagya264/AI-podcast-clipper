"use client";



import SidebarCommon from "../_components/SidebarCommon";
import DashboardClient from "../_components/workspace/Dashboard-client";

export default function SidebarContent({ user, files }: any) {
 

    // 👇 Pass actual data props down
    return (
        <div className="relative flex h-screen w-full overflow-hidden">
            <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#020409] via-[#020409] to-black" />
           <SidebarCommon />
            <main className="flex-1 overflow-auto p-6">
                <DashboardClient
                    userName={user?.name}
                    credits={user?.credits}
                    videosUploaded={files?.length}
                    clipsGenerated={user?.clips.length}
                    dailyClipQuota={100}

                />
            </main>
        </div>
    );
}
