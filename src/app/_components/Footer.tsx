"use client"
import {
    Play,
    Mic,
    Sparkles,
    Wand2,
    Bot,
    BrainCircuit,
    Share2,
} from "lucide-react";

export const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-br from-[#0f0f3c] via-[#000238] to-[#050514] dark:from-black dark:to-[#0b0b36] py-20 text-white overflow-hidden">
            {/* Gradient Glow Effects */}
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 blur-[180px] rounded-full z-0" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[160px] rounded-full z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* Brand & Description */}
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <Play className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-300 to-purple-300 bg-clip-text text-transparent">
                                ClipAI
                            </span>
                        </div>
                        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                            Turn long podcasts into viral AI-powered clips. Automate your content creation and grow your reach.
                        </p>

                        {/* Themed icons to match brand */}
                        <div className="flex space-x-4 text-blue-400">
                            <Mic className="w-5 h-5 hover:text-white transition"  />
                            <Wand2 className="w-5 h-5 hover:text-white transition"  />
                            <BrainCircuit className="w-5 h-5 hover:text-white transition"  />
                            <Share2 className="w-5 h-5 hover:text-white transition" />
                        </div>
                    </div>

                    {/* Footer Columns */}
                    {[
                        { title: "Product", links: ["Features", "Pricing", "API", "Integrations"] },
                        { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
                        { title: "Support", links: ["Help Center", "Documentation", "Community", "Status"] },
                    ].map((section, i) => (
                        <div key={i}>
                            <h3 className="text-white font-semibold mb-4 tracking-wide">
                                {section.title}
                            </h3>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="hover:text-white transition-colors duration-200">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>© 2024 ClipAI. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {["Privacy", "Terms", "Security"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="hover:text-white transition-colors duration-200"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
  