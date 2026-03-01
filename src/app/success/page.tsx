"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { KawaiiCloud } from "@/components/illustrations/KawaiiCloud";
import { KawaiiSparkle } from "@/components/illustrations/KawaiiSparkle";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("id")?.split("-")[0].toUpperCase() || "NEW";

    // Sanitize URLs to prevent open redirect and image injection
    const rawWaUrl = searchParams.get("wa") || "";
    const waUrl = rawWaUrl.startsWith("https://wa.me/") ? rawWaUrl : "#";

    const rawImg = searchParams.get("img") || "";
    const productImg = rawImg.includes(".supabase.co/") ? rawImg : null;

    return (
        <div className="min-h-screen pt-32 pb-24 relative overflow-hidden flex items-center justify-center">
            {/* Background Decorations */}
            <div className="absolute top-20 left-[10%] w-32 h-32 opacity-20 pointer-events-none">
                <KawaiiCloud />
            </div>
            <div className="absolute bottom-20 right-[15%] w-24 h-24 opacity-20 pointer-events-none">
                <KawaiiCloud />
            </div>
            <KawaiiSparkle className="absolute top-40 right-[25%] w-12 h-12 opacity-30" delay="0.5s" />
            <KawaiiSparkle className="absolute bottom-40 left-[20%] w-8 h-8 opacity-30" delay="1.2s" />

            <div className="layout-container relative z-10 max-w-lg">
                <div className="bg-white rounded-[40px] border-[1.5px] border-border shadow-tactile p-6 sm:p-10 text-center anim-float-y">
                    {/* Mascot Holder with Product Overlay */}
                    <div className="relative w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-vanilla shadow-lg z-10">
                            <Image
                                src="/mascot.jpeg"
                                alt="Kumoo Mascot"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Compact Product Picture Hint */}
                        {productImg && (
                            <div className="absolute -bottom-2 -right-4 w-18 h-18 bg-white rounded-2xl border-2 border-vanilla shadow-md z-20 overflow-hidden transform rotate-6 scale-110">
                                <Image
                                    src={productImg}
                                    alt="Ordered item"
                                    fill
                                    className="object-cover p-1"
                                />
                            </div>
                        )}
                        {!productImg && (
                            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white rounded-2xl border-2 border-vanilla shadow-md z-20 overflow-hidden transform rotate-6">
                                <KawaiiSparkle className="absolute inset-0 opacity-20 p-2" color="#FFD166" />
                                <div className="flex items-center justify-center h-full text-[20px]">
                                    🎁
                                </div>
                            </div>
                        )}
                    </div>

                    <h1 className="font-display font-bold text-3xl sm:text-4xl text-charcoal mb-4">
                        Thank You! ✿
                    </h1>
                    <p className="text-charcoal/50 font-medium text-lg mb-8 leading-relaxed">
                        Order <span className="text-melon font-bold">#{orderId}</span> has been successfully registered. We&apos;re getting your yarn ready!
                    </p>

                    <div className="space-y-4">
                        <a
                            href={waUrl}
                            className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-3 shadow-glow-melon"
                        >
                            <span>Continue to WhatsApp</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        <Link
                            href="/shop"
                            className="block w-full py-4 text-xs font-bold uppercase tracking-widest text-charcoal/30 hover:text-charcoal transition-colors focus:outline-none"
                        >
                            Or Back to Shop
                        </Link>
                    </div>

                    <div className="mt-10 pt-8 border-t border-border/60">
                        <p className="text-[11px] font-bold text-charcoal/30 uppercase tracking-[0.2em]">
                            Artisan Handcrafted in Dhaka
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-border border-t-melon rounded-full animate-spin" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
