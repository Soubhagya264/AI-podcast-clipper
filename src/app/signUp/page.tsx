"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { signupSchema, type SignupFormValues } from "@/schemas/auth";
import { signUp } from "@/actions/auth";
import { IconBrandGoogle } from "@tabler/icons-react";
import GoogleButton from "@/components/Authentication/GoogleButton";

export default function SignUpPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormValues) => {
        setIsSubmitting(true);
        setError(null);

        // Manual signup
        const result = await signUp(data);
        if (!result.success) {
            setError(result.error || "Signup failed.");
            setIsSubmitting(false);
            return;
        }

        // Auto-login
        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (res?.error) {
            setError("Account created but sign-in failed.");
        } else {
            router.push("/Dashboard");
        }
        setIsSubmitting(false);
    };

    const handleGoogle = () => {
        // NextAuth Google flow; signIn will trigger the callback that upserts user
        signIn("google", { callbackUrl: "/Dashboard" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-black to-blue-900 p-6">
            <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 shadow-2xl">
                <h2 className="text-4xl font-extrabold text-white mb-6 text-center">
                    Create Account
                </h2>
                <p className="text-base text-white/70 mb-8 text-center">
                    Sign up manually or with Google
                </p>

                {/* Google Button */}
                <GoogleButton handleGoogle={handleGoogle}/>
                <div className="flex items-center gap-2 mb-4 mt-4">
                    <hr className="flex-1 border-white/20" />
                    <span className="text-white/50 text-sm">or</span>
                    <hr className="flex-1 border-white/20" />
                </div>

                {/* Manual Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-white/80 mb-2">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register("name")}
                            placeholder="Your Name"
                            className="w-full px-5 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-white/80 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="you@example.com"
                            className="w-full px-5 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-white/80 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password")}
                            placeholder="********"
                            className="w-full px-5 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                        />
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.password.message}
                            </p>
                        )}
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
                            {isSubmitting ? "Signing up..." : "Sign Up"}
                        </span>
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-white/60">
                    Already have an account?{" "}
                    <Link href="/signIn" className="text-blue-400 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
