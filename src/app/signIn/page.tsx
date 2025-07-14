"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconBrandGoogle } from "@tabler/icons-react";
import GoogleButton from "@/components/Authentication/GoogleButton";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        if (res?.error) {
            setError("Invalid email or password.");
        } else {
            router.push("/Dashboard");
        }

        setIsSubmitting(false);
    };

    const handleGoogle = () => {
        signIn("google", { callbackUrl: "/Dashboard" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-black to-blue-900 p-6">
            <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 shadow-2xl">
                <h2 className="text-4xl font-extrabold text-white mb-6 text-center">
                    Welcome Back
                </h2>
                <p className="text-base text-white/70 mb-8 text-center">
                    Log in with credentials or Google
                </p>

                {/* Google Button */}
                <GoogleButton handleGoogle={handleGoogle} />
                <div className="flex items-center gap-2 mb-4 mt-4">
                    <hr className="flex-1 border-white/20" />
                    <span className="text-white/50 text-sm">or</span>
                    <hr className="flex-1 border-white/20" />
                </div>

                {/* Manual Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-white/80 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-5 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                        />
                    </div>
                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-white/80 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            className="w-full px-5 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                        />
                    </div>

                    {error && (
                        <div className="p-4 bg-red-900/50 rounded-lg">
                            <p className="text-sm text-red-300 text-center">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative w-full px-8 py-3 text-white font-semibold rounded-xl overflow-hidden shadow-lg before:absolute before:inset-0 before:border-2 before:border-transparent before:bg-gradient-to-r before:from-pink-500 before:via-purple-500 before:to-blue-500 before:bg-[length:200%_200%] before:transition-transform before:duration-1000 hover:before:translate-x-full"
                    >
                        <span className="relative z-10">
                            {isSubmitting ? "Logging in..." : "Log In"}
                        </span>
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-white/60">
                    Don’t have an account?{" "}
                    <Link href="/signUp" className="text-blue-400 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
