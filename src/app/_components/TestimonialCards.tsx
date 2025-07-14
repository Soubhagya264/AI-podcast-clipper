"use client"
import { Star, Quote } from "lucide-react";

export const TestimonialCards = () => {
    const testimonials = [
        {
            title: "Game-changing ROI",
            content: "ClipAI helped me create 50+ viral clips from my podcast. My social media engagement increased by 300% and revenue doubled.",
            author: "Sarah Chen",
            role: "Podcast Host & Entrepreneur",
            avatar: "SC",
            gradient: "from-indigo-500 to-purple-600",
            rating: 5
        },
        {
            title: "Incredible efficiency",
            content: "What used to take me hours now takes minutes. The AI finds perfect moments I would have missed. Absolutely revolutionary.",
            author: "Marcus Johnson",
            role: "Content Creator",
            avatar: "MJ",
            gradient: "from-purple-500 to-pink-600",
            rating: 5
        },
        {
            title: "Professional quality",
            content: "Every podcaster needs this. The quality of clips and auto-captions is incredible. It's like having a professional editor 24/7.",
            author: "Lisa Rodriguez",
            role: "Marketing Director",
            avatar: "LR",
            gradient: "from-pink-500 to-red-600",
            rating: 5
        },
        {
            title: "Viral content machine",
            content: "My clips are getting more views than my full episodes. ClipAI knows what content works and delivers consistently.",
            author: "David Park",
            role: "Tech Influencer",
            avatar: "DP",
            gradient: "from-cyan-500 to-blue-600",
            rating: 5
        }
    ];

    return (
        <div className="py-32 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <div className="mb-6">
                        <span className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-yellow-500/30 text-yellow-200 text-sm backdrop-blur-xl">
                            <Star className="w-4 h-4 mr-2" />
                            Customer Success Stories
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Nothing less than
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                            excellence
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="group relative"
                        >
                            {/* Card background with gradient border */}
                            <div className={`absolute  inset-0 bg-gradient-to-r ${testimonial.gradient} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-20`}></div>

                            <div className="relative shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group bg-gradient-to-b from-transparent via-gray-600 to-transparent backdrop-blur-xl border rounded-3xl p-8 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 group h-full flex flex-col">
                                {/* Quote icon */}
                                <div className="mb-6">
                                    <Quote className="w-8 h-8 text-gray-400" />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-4">{testimonial.title}</h3>
                                    <p className="text-gray-300 leading-relaxed mb-6">{testimonial.content}</p>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                    ))}
                                </div>

                                {/* Author */}
                                <div className="flex items-center space-x-3">
                                    <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                                        <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">{testimonial.author}</div>
                                        <div className="text-gray-400 text-sm">{testimonial.role}</div>
                                    </div>
                                </div>

                                {/* Hover glow effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-all duration-500`}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom stats */}
                <div className="text-center mt-20">
                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                        <div>
                            <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
                            <div className="text-gray-400">Average Rating</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-2">98%</div>
                            <div className="text-gray-400">Satisfaction Rate</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-2">2M+</div>
                            <div className="text-gray-400">Happy Users</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
