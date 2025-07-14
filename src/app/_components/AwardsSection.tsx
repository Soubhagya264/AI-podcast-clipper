
import { Star, TrendingUp, Award } from "lucide-react";
import { AnimatedList } from "@/components/magicui/animated-list";
export const AwardsSection = () => {
    return (
        <div className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="mb-6">
                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-200 text-sm">
                                <Award className="w-4 h-4 mr-2" />
                                Recognition
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            An award-winning
                            <br />
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                podcast solution
                            </span>
                        </h2>

                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Recognized by industry leaders and trusted by top podcasters worldwide.
                            Our AI technology sets the standard for podcast content creation.
                        </p>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-400 mb-2">#1</div>
                                <div className="text-sm text-gray-400">AI Podcast Tool</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-400 mb-2">12</div>
                                <div className="text-sm text-gray-400">Industry Awards</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-400 mb-2">4.9/5</div>
                                <div className="text-sm text-gray-400">User Rating</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold">Recent Awards</h3>
                                    <Star className="w-6 h-6 text-yellow-400" />
                                </div>

                                <div className="space-y-4">
                                    <AnimatedList>
                                    {[
                                        { award: "Best AI Tool 2024", org: "Podcast Awards", year: "2024" },
                                        { award: "Innovation Excellence", org: "Tech Leaders", year: "2024" },
                                        { award: "Creator's Choice", org: "Content Summit", year: "2023" },
                                        { award: "Rising Star", org: "AI Conference", year: "2023" }
                                    ].map((item, index) => (
                                        <div key={index} className="flex shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group bg-gradient-to-b from-transparent via-gray-900/30 to-transparent items-center space-x-4 p-4 rounded-xl">
                                            
                                                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                                                    <Award className="w-6 h-6 text-white" />
                                                </div>
                                         
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-white">{item.award}</h4>
                                                    <p className="text-sm text-gray-400">{item.org} • {item.year}</p>
                                                </div>
                                      
                                        </div>
                                    ))}
                                    </AnimatedList>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
