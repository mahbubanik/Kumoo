"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

export function FloatingCart() {
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const getCartCount = useCartStore((state) => state.getCartCount);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 10);
        return () => clearTimeout(timer);
    }, []);

    // Don't show until mounted to prevent hydration mismatch on icon scale
    // Hide on cart page (redundant), admin pages, and product pages (to avoid clutter with sticky CTA)
    const isProductPage = pathname.startsWith('/shop/') && pathname.length > 6;
    if (!mounted || pathname === '/cart' || pathname.startsWith('/admin') || isProductPage) return null;

    const count = getCartCount();

    return (
        <Link
            href="/cart"
            className="fixed bottom-[100px] md:bottom-8 left-6 sm:left-8 z-50 w-14 h-14 bg-charcoal text-white rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
            aria-label="View Cart"
        >
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="group-hover:scale-110 transition-transform duration-300"
            >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>

            {/* Notification Badge */}
            {count > 0 && (
                <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-melon text-white text-[11px] font-bold font-display rounded-full flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.2)] border-2 border-white transform scale-100 animate-in zoom-in duration-300">
                    {count}
                </div>
            )}
        </Link>
    );
}
