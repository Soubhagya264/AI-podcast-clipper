"use client";

import { Sparkles } from "lucide-react";
import { BentoDemo } from "./BentoGrid";

export const Features = () => {
    return (
        <section className="relative py-20 bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden w-full">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Label */}
                <div className="text-center mb-8">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 text-indigo-300 text-sm backdrop-blur-lg font-semibold tracking-wide">
                        <Sparkles className="w-4 h-4 mr-2 animate-pulse text-pink-400" />
                        Smart AI-Powered Features
                    </span>
                </div>

                {/* Heading */}
                <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
                    Your AI Assistant for
                    <br />
                    <span className="text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text font-extrabold">
                        Viral Clip Generation
                    </span>
                </h2>

                {/* Bento Grid */}
                <div className="mt-20">
                    <BentoDemo />
                </div>

                {/* CTA */}
                <div className="text-center mt-20 text-gray-400 text-sm max-w-xl mx-auto tracking-wide">
                    Join 2M+ creators using ClipAI to capture their audience’s attention in seconds.
                </div>
            </div>
        </section>
    );
};
