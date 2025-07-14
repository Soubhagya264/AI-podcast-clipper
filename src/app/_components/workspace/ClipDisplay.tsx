"use client";

import type { Clip } from "@prisma/client";
import { Download, Loader2, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { getClipPlayUrl } from "@/actions/generation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function ClipCard({ clip }: { clip: Clip }) {
    const [playUrl, setPlayUrl] = useState<string | null>(null);
    const [isLoadingUrl, setIsLoadingUrl] = useState(true);

    useEffect(() => {
        async function fetchPlayUrl() {
            try {
                console.log(process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
                    process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
                    process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
                    process.env.NEXT_PUBLIC_S3_BUCKET_NAME
                )
                const result = await getClipPlayUrl(clip.id);
                if (result.succes && result.url) {
                    setPlayUrl(result.url);
                } else if (result.error) {
                    console.error("Failed to get play url: " + result.error);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingUrl(false);
            }
        }

        void fetchPlayUrl();
    }, [clip.id]);

    const handleDownload = () => {
        if (playUrl) {
            const link = document.createElement("a");
            link.href = playUrl;
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 25px #7f5af0" }}
            className="relative flex flex-col overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-black/50 p-3 backdrop-blur-md shadow-lg transition duration-300"
        >
            <div className="relative overflow-hidden rounded-lg border border-purple-600/30 bg-gradient-to-br from-blue-950 via-purple-900 to-black shadow-inner aspect-[9/16]">
                {isLoadingUrl ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-purple-400/70" />
                    </div>
                ) : playUrl ? (
                    <video
                        src={playUrl}
                        controls
                        preload="metadata"
                        className="w-full h-full object-cover rounded-md"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full">
                        <Play className="h-10 w-10 text-purple-500/50" />
                    </div>
                )}
            </div>

            <div className="mt-3 flex justify-between">
                <Button
                    onClick={handleDownload}
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white shadow-md hover:shadow-purple-500/50 hover:scale-105 transition duration-200"
                >
                    <Download className="mr-1.5 h-4 w-4" />
                    Download
                </Button>
            </div>
            {/* Neon glow ring effect */}
            <div className="pointer-events-none absolute inset-0 rounded-xl border border-purple-500/20 blur-[2px] [box-shadow:0_0_20px_#7f5af0]"></div>
        </motion.div>
    );
}

export function ClipDisplay({ clips }: { clips: Clip[] }) {
    if (clips.length === 0) {
        return (
            <div className="p-6 text-center text-purple-400/70">
                No clips generated yet. ⚡🎬
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {clips.map((clip) => (
                <ClipCard key={clip.id} clip={clip} />
            ))}
        </div>
    );
}
