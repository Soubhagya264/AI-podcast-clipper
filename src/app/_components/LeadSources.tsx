"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Upload, Clock } from "lucide-react";

function AnimatedCounter({ value }: { value: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTimestamp: number | null = null;
        const duration = 1500; // ms

        function step(timestamp: number) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;
            const progressPercent = Math.min(progress / duration, 1);
            setCount(Math.floor(progressPercent * value));
            if (progress < duration) requestAnimationFrame(step);
            else setCount(value);
        }
        requestAnimationFrame(step);
    }, [value]);

    return <>{count.toLocaleString()}</>;
}

export const LeadSources = () => {
    return (
        <section className="py-20 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="grid lg:grid-cols-2 gap-20 items-center"
                >
                    {/* Left Info Section */}
                    <div>
                        <span className="inline-flex items-center px-5 py-2 rounded-full bg-orange-500/30 border border-orange-500/40 text-orange-300 font-semibold tracking-wide text-sm mb-6">
                            <Upload className="w-5 h-5 mr-2" />
                            Import Sources
                        </span>

                        <h2 className="text-5xl font-extrabold mb-6 tracking-tight text-white leading-tight">
                            Import podcasts from anywhere, start clipping instantly
                        </h2>

                        <p className="text-lg text-gray-300 mb-10 max-w-lg leading-relaxed">
                            Effortlessly bring in your podcasts via Spotify, Apple Podcasts, RSS feeds, or direct file uploads. Auto-sync with your hosting platform to keep everything up to date.
                        </p>

                        <ul className="space-y-5 max-w-md">
                            {[
                                { color: "bg-green-400", text: "Spotify, Apple Podcasts, RSS feeds" },
                                { color: "bg-blue-400", text: "Direct uploads (MP3, WAV, M4A)" },
                                { color: "bg-purple-400", text: "Auto-sync with your podcast host" },
                            ].map(({ color, text }, idx) => (
                                <li key={idx} className="flex items-center space-x-4">
                                    <span className={`w-3 h-3 rounded-full ${color} flex-shrink-0`}></span>
                                    <span className="text-gray-300 text-base">{text}</span>
                                </li>
                            ))}
                        </ul>

                        
                    </div>

                    {/* Right Stats Section */}
                    <div>
                        <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-3xl p-10 border border-gray-700 shadow-lg backdrop-blur-md">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                                className="flex justify-between items-center mb-8"
                            >
                                <h3 className="text-2xl font-bold text-white">Import Analytics</h3>
                                <TrendingUp className="w-7 h-7 text-green-400" />
                            </motion.div>

                            <div className="grid grid-cols-2 gap-6 mb-10">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                                    className="bg-gray-900/50 rounded-xl p-6 flex flex-col items-center"
                                >
                                    <AnimatedCounter value={247} />
                                    <span className="text-gray-400 mt-2">Episodes Imported</span>
                                </motion.div>

                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                                    className="bg-gray-900/50 rounded-xl p-6 flex flex-col items-center"
                                >
                                    <AnimatedCounter value={89} />
                                    <span className="text-gray-400 mt-2">Success Rate (%)</span>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
                                className="bg-gray-900/50 rounded-xl p-6"
                            >
                                <div className="flex justify-between items-center mb-5">
                                    <span className="text-sm text-gray-400 font-medium">Processing Queue</span>
                                    <Users className="w-6 h-6 text-blue-400" />
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex justify-between items-center text-white font-semibold">
                                        <span>Episode 142: Tech Trends</span>
                                        <span className="text-green-400 text-lg">✓</span>
                                    </li>
                                    <li className="flex justify-between items-center text-yellow-400 font-semibold">
                                        <span>Episode 141: AI Revolution</span>
                                        <span className="text-yellow-400 text-lg animate-pulse">⚡</span>
                                    </li>
                                    <li className="flex justify-between items-center text-gray-400 italic">
                                        <span>Episode 140: Future Work</span>
                                        <span className="text-gray-500 text-lg">⏳</span>
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.7, ease: "easeOut" }}
                                className="flex items-center justify-between mt-8 text-gray-400"
                            >
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-5 h-5" />
                                    <span className="text-sm italic">Last imported: 2 hours ago</span>
                                </div>

                               
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
