
import { Play, Download, Star } from "lucide-react";

export const ProductShowcase = () => {
    return (
        <div className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700">
                            <div className="bg-black rounded-2xl p-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <span className="text-gray-400 text-sm">ClipAI Dashboard</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
                                        <div className="w-16 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
                                            <Play className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-white font-medium">Marketing Mastery Ep. 12</div>
                                            <div className="text-gray-400 text-sm">Generated 8 clips • 2.3M views</div>
                                        </div>
                                        <Download className="w-5 h-5 text-gray-400" />
                                    </div>

                                    <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
                                        <div className="w-16 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded flex items-center justify-center">
                                            <Play className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-white font-medium">Tech Talk Weekly #89</div>
                                            <div className="text-gray-400 text-sm">Generated 12 clips • 1.8M views</div>
                                        </div>
                                        <Download className="w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-full">
                                    <Star className="w-4 h-4 text-green-400" />
                                    <span className="text-green-400 text-sm">Processing Complete</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="mb-6">
                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-200 text-sm">
                                <Play className="w-4 h-4 mr-2" />
                                Product
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            See our product in action for
                            <br />
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                real creators
                            </span>
                        </h2>

                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Watch how top podcasters use ClipAI to transform their long-form content
                            into viral clips that drive massive engagement across all social platforms.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-300">Automatic highlight detection</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-300">Professional caption generation</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="text-gray-300">Multi-platform optimization</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
