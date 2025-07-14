"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthForm({ isSignUp = false }: { isSignUp?: boolean }) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        if (isSignUp) {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                alert("Sign up failed");
                setLoading(false);
                return;
            }
        }

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.ok) {
            router.push("/Dashboard");
        } else {
            alert(res?.error);
        }

        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-md"
            />
            <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-md"
            />
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition"
            >
                {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
            </button>
        </form>
    );
}
