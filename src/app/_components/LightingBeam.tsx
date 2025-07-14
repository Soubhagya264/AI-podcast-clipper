
"use client"
import { motion } from "framer-motion";

interface LightingBeamProps {
    className?: string;
}

export const LightingBeam: React.FC<LightingBeamProps> = ({ className = "" }) => {
    return (
        <div className={`absolute inset-0 rounded-3xl overflow-hidden ${className}`}>
            <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(147,51,234,0.4), rgba(59,130,246,0.3), transparent)',
                    backgroundSize: '100% 100%',
                }}
                animate={{
                    backgroundPosition: ['-100% 0%', '100% 0%'],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
            <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.2), rgba(147,51,234,0.2), transparent)',
                    backgroundSize: '100% 50%',
                }}
                animate={{
                    backgroundPosition: ['100% 0%', '-100% 0%'],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1,
                }}
            />
        </div>
    );
};
