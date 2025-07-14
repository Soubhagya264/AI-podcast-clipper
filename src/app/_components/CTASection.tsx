"use client"
import { Button } from "@/components/ui/button";
import { Play, Star } from "lucide-react";
import router from "next/router";

export const CTASection = () => {
    return (
        <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#09091e] via-[#00000a] to-[#000000] text-white">
            {/* Animated Blobs */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-black rounded-full blur-[160px] animate-pulse-fast" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-black rounded-full blur-[140px] animate-pulse-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[black]/20 to-transparent rounded-full blur-[240px] z-0" />

            {/* Glass Card Content */}
            <div className="relative shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] z-10 max-w-5xl mx-auto px-6 text-center backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl ">
                <div className="mb-6 mt-12">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-blue-400/30 text-blue-300 text-sm backdrop-blur-md">
                        <Star className="w-4 h-4 mr-2 text-blue-300" />
                        AI-Powered Podcast Tools
                    </span>
                </div>

                <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-300 to-cyan-400 bg-clip-text text-transparent leading-tight drop-shadow-xl">
                    Clip Smarter.<br />Grow Faster.
                </h2>

                <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Join creators using ClipAI to turn podcasts into viral video clips that explode across social media. AI-powered, effortless, and lightning-fast.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white text-lg px-8 py-4 shadow-xl hover:scale-105 transition-transform"
                        onClick={() => { router.push("/Dashboard") }}
                    >
                        <Play className="w-5 h-5 mr-2" />
                        Start Creating Clips
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-white/30 text-blue-200 hover:bg-white/10 text-lg px-8 py-4 backdrop-blur-md"
                    >
                        Join us
                    </Button>
                </div>

                <p className="text-sm text-blue-300 pb-12">
                    7-day free trial • No credit card required • Cancel anytime
                </p>
            </div>
        </section>
    );
};
