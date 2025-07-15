"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        title: "Upload your video",
        desc: "Drag and drop your podcast videos. Supports YouTube, Drive and more.",
        img: "/podcast.webp",
    },
    {
        title: "Clip with AI",
        desc: "Auto-generate subtitles, highlights & social-ready clips.",
        img: "/how-to-subtitle.png",
    },
    {
        title: "Download & Publish",
        desc: "Export your final clips, captions, and publish anywhere!",
        img: "/downlod.png",
    },
];

export function HowItWorks() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const smoothY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        mass: 0.5,
    });

    useEffect(() => {
        cardsRef.current.forEach((card) => {
            if (!card) return;
            gsap.fromTo(
                card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 bg-gradient-to-br from-black via-blue-950 to-black overflow-hidden"
        >
            {/* Particles */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: Math.random() * 4 + 2,
                            delay: Math.random() * 5,
                        }}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyan-100 drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]"
                >
                    How It Works
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-12">
                    {steps.map((step, i) => {
                        const parallaxY = useTransform(smoothY, [0, 1], [0, (i + 1) * 30]);

                        return (
                            <motion.div key={i} style={{ y: parallaxY }}>
                                <Tilt
                                    glareEnable={true}
                                    glareMaxOpacity={0.3}
                                    scale={1.05}
                                    tiltMaxAngleX={10}
                                    tiltMaxAngleY={10}
                                    className="transition-transform duration-300 ease-in-out"
                                >
                                    <motion.div
                                        ref={(el) => {
                                            cardsRef.current[i] = el; // ✅ Correct ref assignment
                                        }}
                                        className="relative flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-cyan-400/20 shadow-[0_0_60px_10px_rgba(0,255,255,0.05)] hover:shadow-[0_0_80px_20px_rgba(0,255,255,0.2)] transition-all duration-500 group"
                                    >
                                        <div className="w-full h-52 mb-6 relative rounded-2xl overflow-hidden shadow-lg">
                                            <Image
                                                src={step.img}
                                                alt={step.title}
                                                fill
                                                className="object-cover opacity-80 group-hover:opacity-100 transition duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/30" />
                                        </div>

                                        <h3 className="text-2xl font-bold mb-4 text-cyan-200 drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                                            {i + 1}. {step.title}
                                        </h3>

                                        <p className="text-gray-300">{step.desc}</p>
                                    </motion.div>
                                </Tilt>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
