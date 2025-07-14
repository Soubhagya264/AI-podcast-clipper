"use client";

import { signIn } from "next-auth/react";
type GoogleButtonProps = {
    handleGoogle: () => void;
  };
export default function GoogleButton({ handleGoogle }: GoogleButtonProps) {
    return (
        <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-600   px-4 py-2 shadow-sm"
        >
            <img src="/icons-google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
        </button>
    );
}
