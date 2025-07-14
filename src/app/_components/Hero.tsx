"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Play, ArrowRight, Sparkles } from "lucide-react";
import { LightingBeam } from "./LightingBeam";
// import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "../../components/ui/button";
import { ThemeToggle } from "./toggleTheme";
import { useRouter } from "next/navigation";

export const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const router = useRouter();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        }),
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 20, rotateX: -90 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.03,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        }),
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950/60 to-blue-950/60 dark:from-gray-950 dark:via-purple-950/60 dark:to-blue-950/60 light:from-gray-50 light:via-blue-50/40 light:to-indigo-100/40">
            {/* Enhanced Animated Grid Background - More Visible */}
            <div className="absolute inset-0 overflow-hidden opacity-40 dark:opacity-30">
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
      `,
                        backgroundSize: '40px 40px',
                    }}
                    animate={{
                        x: [0, 40],
                        y: [0, 40],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
      `,
                        backgroundSize: '80px 80px',
                    }}
                    animate={{
                        x: [40, 0],
                        y: [40, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
      `,
                        backgroundSize: '70px 70px',
                    }}
                    animate={{
                        x: [20, 0],
                        y: [20, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
                    style={{ left: "10%", top: "10%" }}
                    animate={{
                        x: [0, 20, -20, 0],
                        y: [0, -30, 30, 0],
                        scale: [1, 1.1, 0.95, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>


            {/* Enhanced Gradient Backgrounds */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
                    style={{ left: "10%", top: "10%" }}
                    animate={{
                        x: [0, 20, -20, 0],
                        y: [0, -30, 30, 0],
                        scale: [1, 1.1, 0.95, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute w-[900px] h-[900px] bg-gradient-to-r from-purple-600/25 via-magenta-600/20 to-blue-600/25 rounded-full blur-3xl"
                    style={{
                        left: '5%',
                        top: '15%',
                    }}
                    animate={{
                        x: mousePosition.x * 0.008,
                        y: mousePosition.y * 0.008,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                    }}
                />
                <motion.div
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/20 to-purple-600/25 rounded-full blur-3xl"
                    animate={{
                        y: [-40, 40, -40],
                        scale: [1, 1.08, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-magenta-600/20 to-purple-600/25 rounded-full blur-3xl"
                    animate={{
                        x: [-50, 50, -50],
                        scale: [1, 1.12, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-magenta-600/20 to-purple-600/25 rounded-full blur-3xl"
                    animate={{
                        x: [40, -40, 40],
                        scale: [1, 1.12, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Professional Navigation */}
            <nav className="absolute top-2 left-0 right-0 z-50 px-4 lg:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-black/20 dark:bg-black/30 light:bg-white/25 backdrop-blur-2xl border border-white/20 dark:border-white/15 light:border-black/15 rounded-2xl px-4 lg:px-6 py-2">
                        <div className="flex items-center justify-between">
                            {/* Logo Section */}
                            <motion.div
                                className="flex items-center space-x-3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                                    <Play className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                                </div>
                                <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-white to-gray-300 dark:from-white dark:to-gray-300 light:from-gray-900 light:to-gray-700 bg-clip-text text-transparent">
                                    ClipAI
                                </span>
                            </motion.div>

                            {/* Nav Links */}
                            <motion.div
                                className="hidden md:flex items-center space-x-4 lg:space-x-6"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                {["Product", "Features", "Pricing", "About"].map((item, index) => (
                                    <motion.a
                                        key={item}
                                        href="#"
                                        className="text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-all duration-300 font-medium text-sm"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                    >
                                        {item}
                                    </motion.a>
                                ))}
                            </motion.div>

                            {/* Buttons */}
                            <motion.div
                                className="flex items-center space-x-2 lg:space-x-3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <ThemeToggle />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hidden sm:flex text-white dark:text-white light:text-gray-900 hover:text-purple-300 hover:bg-white/5 backdrop-blur-xl border border-white/10 text-sm px-3 lg:px-4"
                                    onClick={() => { router.push("/signIn") }}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-purple-500 via-magenta-500 to-blue-500 hover:from-purple-600 hover:via-magenta-600 hover:to-blue-600 shadow-xl shadow-purple-500/25 border-0 backdrop-blur-xl text-xs lg:text-sm px-3 lg:px-4"
                                    onClick={() => { router.push("/Dashboard") }}
                                >
                                    <span className="hidden sm:inline">Get Started</span>
                                    <span className="sm:hidden">Start</span>
                                    <ArrowRight className="w-3 h-3 ml-1" />
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </nav>


            {/* Main Content */}
            <div className="relative z-10 max-w-7xl top-10 mx-auto px-4 lg:px-6">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left side - Content */}
                    <div className="text-left order-2 lg:order-1">
                        <motion.div
                            className="mb-4 lg:mb-6"
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            custom={0}
                        >
                            <span className="inline-flex items-center px-3 lg:px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 via-magenta-500/15 to-blue-500/20 border border-purple-500/30 text-purple-200 dark:text-purple-200 light:text-purple-800 text-xs font-medium backdrop-blur-xl">
                                <Sparkles className="w-3 h-3 mr-2" />
                                AI-Powered Video Podcast Shorts
                            </span>
                        </motion.div>

                        <div className="mb-4 lg:mb-6">
                            <motion.h1
                                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight"
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.div
                                    className="block bg-gradient-to-r from-white via-purple-200 to-blue-200 dark:from-white dark:via-purple-200 dark:to-blue-200 light:from-gray-900 light:via-purple-800 light:to-blue-800 bg-clip-text text-transparent mb-2"
                                    variants={textVariants}
                                    custom={1}
                                >
                                    {"Create viral".split("").map((letter, index) => (
                                        <motion.span
                                            key={index}
                                            variants={letterVariants}
                                            custom={index}
                                            className="inline-block"
                                        >
                                            {letter === " " ? "\u00A0" : letter}
                                        </motion.span>
                                    ))}
                                </motion.div>
                                <motion.div
                                    className="block bg-gradient-to-r from-purple-400 via-magenta-400 to-blue-400 bg-clip-text text-transparent mb-2"
                                    variants={textVariants}
                                    custom={2}
                                >
                                    {"podcast clips".split("").map((letter, index) => (
                                        <motion.span
                                            key={index}
                                            variants={letterVariants}
                                            custom={index + 12}
                                            className="inline-block"
                                        >
                                            {letter === " " ? "\u00A0" : letter}
                                        </motion.span>
                                    ))}
                                </motion.div>
                                <motion.div
                                    className="block text-2xl md:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-r from-white to-gray-300 dark:from-white dark:to-gray-300 light:from-gray-900 light:to-gray-700 bg-clip-text text-transparent"
                                    variants={textVariants}
                                    custom={3}
                                >
                                    {"in seconds".split("").map((letter, index) => (
                                        <motion.span
                                            key={index}
                                            variants={letterVariants}
                                            custom={index + 24}
                                            className="inline-block"
                                        >
                                            {letter === " " ? "\u00A0" : letter}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </motion.h1>
                        </div>

                        <motion.p
                            className="text-base lg:text-lg text-gray-300 dark:text-gray-300 light:text-gray-700 mb-6 lg:mb-8 max-w-xl leading-relaxed opacity-90"
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            custom={4}
                        >
                            Transform your long-form podcasts into engaging short clips automatically with our cutting-edge AI.
                            Perfect moments, professional captions, viral potential.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row items-start gap-3 lg:gap-4 mb-6 lg:mb-8"
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            custom={5}
                        >
                            <Button
                                size="lg"
                                className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-purple-500 via-magenta-500 to-blue-500 hover:from-purple-600 hover:via-magenta-600 hover:to-blue-600 text-white px-6 py-3 shadow-2xl shadow-purple-500/25 border-0 backdrop-blur-xl group font-medium"
                                onClick={() => { router.push("/Dashboard") }}
                            >
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative flex items-center justify-center">
                                    <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                    Start Creating Clips
                                </div>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full sm:w-auto relative overflow-hidden border-gray-600/50 bg-black/20 text-white dark:text-white light:text-gray-900 hover:bg-white/10 px-6 py-3 backdrop-blur-xl border border-white/20 font-medium"
                            >
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-lg opacity-0 hover:opacity-100 transition-opacity" />
                                <div className="relative flex items-center justify-center">
                                    Watch Demo
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="flex items-center justify-center sm:justify-start space-x-4 lg:space-x-6"
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            custom={6}
                        >
                            {[
                                { value: "2M+", label: "Creators" },
                                { value: "50M+", label: "Clips Generated" },
                                { value: "4.9/5", label: "Rating" }
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="text-center"
                                    whileHover={{ scale: 1.05 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 + index * 0.1 }}
                                >
                                    <div className="text-xl lg:text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-1">{stat.value}</div>
                                    <div className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right side - Enhanced Product Showcase with New Images */}
                    <motion.div
                        className="relative order-1 lg:order-2"
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <div className="relative max-w-lg mx-auto lg:max-w-none">
                            {/* Main product interface */}
                            <motion.div
                                className="relative "
                                
                                transition={{ duration: 0.3 }}
                            >
                                <motion.img
                                    src="/heroimg2.png"
                                    alt="AI Podcast Clipper"
                                    className="w-full  max-h-[500px] object-contain transition duration-500 ease-in-out"
                                    whileHover={{ scale: 1.03 }}
                                />
                            </motion.div>

                            {/* Floating secondary interface */}
                            <motion.div
                                className="absolute -bottom-4 lg:-bottom-6 -right-4 lg:-right-6 w-48 lg:w-72 bg-gradient-to-br from-black/50 via-purple-900/40 to-blue-900/40 rounded-2xl p-1 backdrop-blur-3xl border border-white/10 shadow-xl shadow-blue-500/15"
                                initial={{ opacity: 0, y: 30, x: 30, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                                transition={{ duration: 1, delay: 1.2 }}
                                whileHover={{ scale: 1.05, rotateY: -3 }}
                            >
                                <LightingBeam className="rounded-3xl" />
                                <div className="bg-gradient-to-br mt-[-10px]  from-gray-900/95 via-purple-900/60 to-blue-900/60 rounded-2xl overflow-hidden relative backdrop-blur-xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/8 to-purple-500/8" />
                                    <motion.img
                                        src="/heroImgClipAi.png"
                                        alt="AI Podcast Clipper"
                                        className="w-full max-h-[400px] left-10 object-contain  rounded-3xl shadow-2xl transition duration-500 ease-in-out"
                                        whileHover={{ scale: 1.03 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-purple-900/20" />
                                </div>
                            </motion.div>

                            {/* Floating accent elements - Reduced motion */}
                            <motion.div
                                className="absolute -top-2 lg:-top-4 -left-2 lg:-left-4 w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-r from-purple-500/25 to-blue-500/25 rounded-full backdrop-blur-xl border border-white/15"
                                animate={{
                                    y: [-5, 5, -5],
                                    opacity: [0.6, 0.9, 0.6],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            <motion.div
                                className="absolute top-6 lg:top-8 -right-4 lg:-right-8 w-8 lg:w-12 h-8 lg:h-12 bg-gradient-to-r from-magenta-500/25 to-purple-500/25 rounded-full backdrop-blur-xl border border-white/15"
                                animate={{
                                    x: [-3, 3, -3],
                                    opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 lg:h-32 bg-gradient-to-t from-gray-950 dark:from-gray-950 light:from-gray-50 to-transparent"></div>
        </div>
    );
};
