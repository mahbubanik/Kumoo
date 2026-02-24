"use client";

import React, { useState } from "react";
import { login } from "./actions";
import Link from "next/link";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={`w-full bg-charcoal text-white font-display font-bold py-3.5 rounded-full transition-all duration-300 hover:bg-[#4a4152] hover:shadow-tactile hover:-translate-y-0.5 mt-2 ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {pending ? "Authenticating..." : "Access Command Center"}
        </button>
    );
}

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setError(null);
        const result = await login(formData);
        if (result?.error) {
            setError(result.error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center pt-24 pb-20 px-4 bg-vanilla relative">
            <div className="absolute top-20 left-10 w-64 h-64 bg-melon/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-lilac/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md bg-white p-10 rounded-[32px] shadow-sm border border-border relative z-10">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block p-2 bg-charcoal text-white rounded-lg mb-6 hover:-translate-y-0.5 transition-transform">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"></path>
                        </svg>
                    </Link>
                    <h1 className="font-display font-bold text-2xl text-charcoal mb-2">Kumoo Admin</h1>
                    <p className="font-body text-charcoal/50 text-sm font-medium">Verify your credentials to continue.</p>
                </div>

                <form action={handleSubmit} className="flex flex-col gap-5">
                    {error && (
                        <div className="bg-rose/20 text-[#a33945] p-4 rounded-xl text-sm font-bold text-center border border-rose/30">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-charcoal/40" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="bg-surface border border-border px-4 py-3 rounded-xl outline-none focus:border-charcoal/30 transition-colors font-medium text-charcoal"
                            placeholder="admin@kumoo.com"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-charcoal/40" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="bg-surface border border-border px-4 py-3 rounded-xl outline-none focus:border-charcoal/30 transition-colors font-medium text-charcoal"
                            placeholder="••••••••"
                        />
                    </div>

                    <SubmitButton />
                </form>
            </div>
        </div>
    );
}
