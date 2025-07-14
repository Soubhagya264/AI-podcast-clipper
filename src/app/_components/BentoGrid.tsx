"use client";

import {
    Sparkles,
    Video,
    Eye,
    Flame,
    Scissors,
} from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { ShineBorder } from "@/components/magicui/shine-border";

const features = [
    {
        Icon: Sparkles,
        name: "AI Highlight Detection",
        description: "Automatically detects peak moments in your videos for clipping.",
        href: "/",
        cta: "Learn more",
        background: (
            <img
                src="/viralClip.jpg"
                alt="AI Highlight Detection"
                className="absolute inset-0 object-cover w-full h-full opacity-15"
            />
        ),
        className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
        Icon: Video,
        name: "Instant Clip Generation",
        description: "Create viral-ready short clips from long-form content in seconds.",
        href: "/",
        cta: "Learn more",
        background: (
            <img
                src="/clipAi2.png"
                alt="Instant Clip Generation"
                className="absolute inset-0 object-cover w-full h-full opacity-15"
            />
        ),
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
        Icon: Eye,
        name: "Engagement Boost",
        description: "Clips optimized for attention retention and viewer conversion.",
        href: "/",
        cta: "Learn more",
        background: (
            <img
                src="/clipAI3.png"
                alt="Engagement Boost"
                className="absolute inset-0 object-cover w-full h-full opacity-15"
            />
        ),
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
        Icon: Flame,
        name: "Viral Moment Detector",
        description: "AI scans emotional peaks, keywords, and reactions to find what's trending.",
        href: "/",
        cta: "Learn more",
        background: (
            <img
                src="/clipAi5.png"
                alt="Viral Moment Detector"
                className="absolute inset-0 object-cover w-full h-full opacity-15"
            />
        ),
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
        Icon: Scissors,
        name: "Auto Cutting & Trimming",
        description: "No editors needed — just upload and let AI do the slicing.",
        href: "/",
        cta: "Learn more",
        background: (
            <img
                src="/ClipAI4.png"
                alt="Auto Cutting & Trimming"
                className="absolute inset-0 object-cover w-full h-full opacity-15"
            />
        ),
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
];

export function BentoDemo() {
    return (
        <BentoGrid className="lg:grid-rows-3">
            {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
            ))}
        </BentoGrid>
    );
}
