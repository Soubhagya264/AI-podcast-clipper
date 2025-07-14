"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef,useState ,useEffect} from "react";

const messages = [
    "Turn Long Videos Into Viral Shorts",
    "Auto-clip With AI Magic 🪄",
    "Grow On TikTok, Reels & Shorts!"
];

export  function ClipHero() {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <section
            ref={ref}
            className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center bg-black"
        >
            {/* Background Image with rounded corners */}
            <motion.div
                className="absolute inset-0 z-0 overflow-hidden"
                style={{ y }}
            >
                <Image
                    src="/clipProcess.png"
                    alt="ClipAI Process"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-black/40 rounded-3xl" />
            </motion.div>

            {/* Overlay Text with Typing Effect */}
            <div className="z-10 text-center px-6 max-w-3xl">
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
                >
                    <TypewriterText messages={messages} />
                </motion.h1>
                <p className="mt-6 text-lg md:text-xl text-gray-200">
                    Automatically generate short clips from podcasts, interviews, and long-form videos.
                </p>
            </div>
        </section>
    );
}

// Typing Effect Component
function TypewriterText({ messages }: { messages: string[] }) {
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentMessage = messages[index];
            if (charIndex < currentMessage.length) {
                setDisplayText((prev) => prev + currentMessage[charIndex]);
                setCharIndex((prev) => prev + 1);
            } else {
                setTimeout(() => {
                    setCharIndex(0);
                    setDisplayText("");
                    setIndex((prev) => (prev + 1) % messages.length);
                }, 2500);
            }
        }, 80);

        return () => clearInterval(interval);
    }, [charIndex, index, messages]);

    return <span>{displayText}</span>;
}
