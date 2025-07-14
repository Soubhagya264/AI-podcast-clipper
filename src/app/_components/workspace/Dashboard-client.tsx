"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React from "react";
import { SparklesIcon, FilmIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
    ssr: false,
});

export default function DashboardClient({
    userName = "Creator",
    credits = 0,
    videosUploaded = 0,
    clipsGenerated = 0,
    engagementRates = [65, 70, 80, 75, 85, 90, 95],
    dailyClipQuota = 100,
}: {
    userName?: string | null;
    credits?: number | null;
    videosUploaded?: number | null;
    clipsGenerated?: number | null;
    engagementRates?: number[] | null;
    dailyClipQuota?: number | null;
}) {
    const safeEngagementRates = engagementRates ?? [50, 60, 70, 80, 90, 100, 75];
    const safeDailyQuota = dailyClipQuota ?? 100;
    const safeClipsGenerated = clipsGenerated ?? 0;

    const clipUsage = Math.min(
        safeDailyQuota > 0 ? Math.round((safeClipsGenerated / safeDailyQuota) * 100) : 0,
        100
    );

    const chartData = useMemo(
        () => ({
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
                {
                    label: "Engagement (%)",
                    data: safeEngagementRates,
                    backgroundColor: "rgba(127, 90, 240, 0.7)",
                    borderRadius: 8,
                },
            ],
        }),
        [safeEngagementRates]
    );

    const chartOptions = useMemo(
        () => ({
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 100 } },
        }),
        []
    );

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-10">
            {/* Neon grid background */}
            <div className="absolute inset-0 -z-30 bg-[radial-gradient(#ffffff0b_1px,transparent_1px)] [background-size:30px_30px]" />

            {/* Animated neon blob */}
            <motion.div
                initial={{ opacity: 0.3, scale: 0.9 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                className="absolute left-[-20%] top-[-20%] -z-20 h-[80rem] w-[80rem] rounded-full bg-gradient-to-br from-purple-800 via-blue-800 to-black opacity-30 blur-[200px]"
            />

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
                    Welcome back, {userName || "Creator"}!
                </h1>
                <p className="mt-2 text-sm text-purple-200/70">
                    Your <span className="text-blue-400">AI podcast dashboard</span> at a glance.
                </p>
            </motion.div>

            {/* Stats grid */}
            <div className="grid w-full max-w-7xl grid-cols-2 gap-6 md:grid-cols-4">
                <StatCard label="Credits" value={credits ?? 0} Icon={SparklesIcon} gradient="from-pink-500 to-purple-500" />
                <StatCard label="Videos" value={videosUploaded ?? 0} Icon={VideoCameraIcon} gradient="from-blue-500 to-cyan-500" />
                <StatCard label="Clips" value={safeClipsGenerated} Icon={FilmIcon} gradient="from-green-400 to-emerald-500" />

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-blue-900/40 via-purple-900/20 to-black/30 p-4 backdrop-blur-md text-center shadow-lg"
                >
                    <h3 className="mb-2 text-xs text-purple-200/80">Daily Quota</h3>
                    <div className="mx-auto w-16">
                        <CircularProgressbar
                            value={clipUsage}
                            text={`${clipUsage}%`}
                            styles={buildStyles({
                                textSize: "24px",
                                textColor: "#fff",
                                pathColor: "#7f5af0",
                                trailColor: "#1E3A8A",
                            })}
                        />
                    </div>
                    <p className="mt-2 text-xs text-purple-100/70">
                        {safeClipsGenerated}/{safeDailyQuota} clips
                    </p>
                </motion.div>
            </div>

            {/* Engagement Chart */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 w-full max-w-7xl rounded-2xl border border-purple-500/30 bg-gradient-to-br from-blue-900/40 via-purple-900/20 to-black/30 p-4 backdrop-blur-md shadow-lg"
            >
                <h2 className="mb-4 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Engagement This Week
                </h2>
                <Bar data={chartData} options={chartOptions} height={60} />
            </motion.div>

            {/* Actions */}
            <div className="mt-10 flex flex-wrap gap-4">
                <Link
                    href="/UploadVideo"
                    className="inline-block rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-6 py-3 text-sm font-medium text-white shadow-md backdrop-blur-md transition hover:scale-105 hover:shadow-purple-500/40"
                >
                    Upload New Video →
                </Link>
                <Link
                    href="/Billing"
                    className="inline-block rounded-full border border-purple-500/30 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-3 text-sm font-medium text-white shadow-md backdrop-blur-md transition hover:scale-105 hover:shadow-pink-500/40"
                >
                    Manage Billing 💳
                </Link>
            </div>
        </div>
    );
}

const StatCard = React.memo(function StatCard({
    label,
    value,
    Icon,
    gradient,
}: {
    label: string;
    value: number;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    gradient: string;
}) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px #7f5af0" }}
            className="flex flex-col items-center rounded-2xl border border-purple-500/30 bg-gradient-to-br from-blue-900/40 via-purple-900/20 to-black/30 p-4 backdrop-blur-md text-center shadow-lg transition"
        >
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${gradient}`}>
                <Icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-3xl font-extrabold text-transparent">
                {value ?? 0}
            </h3>
            <p className="mt-1 text-xs text-purple-100/80">{label}</p>
        </motion.div>
    );
});
