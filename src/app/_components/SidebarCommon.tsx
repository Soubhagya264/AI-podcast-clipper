"use client";

import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from "@/components/AceternityUI/sidebar";
import {
    IconArrowLeft,
    IconLayoutDashboard,
    IconCloudUpload,
    IconCreditCard,
} from "@tabler/icons-react";
import { motion } from 'framer-motion';
import { signOut } from "next-auth/react";

// ✅ CORRECT: export default not exports default
export default function SidebarCommon() {
    const [open, setOpen] = useState(false);

    const links = [
        { label: "Dashboard", href: "/Dashboard", icon: <IconLayoutDashboard className="h-5 w-5 text-white" /> },
        { label: "UploadVideo", href: "/UploadVideo", icon: <IconCloudUpload className="h-5 w-5 text-white" /> },
        { label: "Billing", href: "/Billing", icon: <IconCreditCard className="h-5 w-5 text-white" /> },
        {
            label: "Logout",
            href: "#",
            icon: <IconArrowLeft className="h-5 w-5 text-white" />,
            onClick: () => signOut({ callbackUrl: "/signIn" }),
        },
    ];

    return (
        <div>
            <motion.div
                initial={{ opacity: 0.3, scale: 0.9 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                className="absolute left-[-20%] top-[-20%] -z-10 h-[80rem] w-[80rem] rounded-full bg-gradient-to-br from-blue-950 to-blue-950 opacity-30 blur-[200px]"
            />
            <Sidebar
                open={open}
                setOpen={setOpen}
                animate={false}
                className="w-64 bg-black/80 backdrop-blur-lg border-r border-white/10"
            >
                <SidebarBody className="justify-between gap-10 text-white">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        <Logo />
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink
                                    key={idx}
                                    link={link}
                                    onClick={link?.onClick}
                                    className="text-white"
                                />
                            ))}
                        </div>
                    </div>
                </SidebarBody>
            </Sidebar>
        </div>
    );
}

// ✅ CORRECT: Named export for reusable component
export const Logo = () => (
    <a href="/" className="flex items-center space-x-2 py-1 text-lg font-bold text-white">
        <img src="/CLIPAISVG.svg" className="h-8 w-8" alt="ClipAi" />
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="whitespace-pre"
        >
            ClipAi
        </motion.span>
    </a>
);
