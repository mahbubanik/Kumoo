"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const cartCount = useCartStore((state) => state.getCartCount());

    useEffect(() => {
        setTimeout(() => setMounted(true), 0);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
                ? "bg-canvas/90 backdrop-blur-md border-b-[1.5px] border-border py-3 shadow-sm"
                : "bg-transparent py-8"
                }`}
        >
            <div className="layout-container flex items-center justify-between">
                {/* Logo & Navigation (Left) */}
                <div className="flex items-center gap-12">
                    <Link
                        href="/"
                        className="flex items-center group transition-opacity hover:opacity-80"
                    >
                        <div className="w-10 h-10 bg-melon rounded-[12px] flex items-center justify-center text-white font-display font-bold text-xl border-[1.5px] border-charcoal shadow-tactile mr-3">
                            K
                        </div>
                        <span className="font-display font-bold text-charcoal text-2xl tracking-wide">
                            Kumoo.
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <nav className="hidden md:flex items-center gap-4">
                        <Link
                            href="/shop"
                            className={`px-5 py-2 rounded-full font-body font-bold text-[15px] transition-all ${pathname.includes("/shop") ? "bg-charcoal text-white shadow-md" : "text-charcoal/70 hover:bg-white hover:text-charcoal hover:shadow-sm"
                                }`}
                        >
                            Shop
                        </Link>
                        <Link
                            href="/about"
                            className="px-5 py-2 rounded-full font-body font-bold text-[15px] text-charcoal/70 hover:bg-white hover:text-charcoal hover:shadow-sm transition-all"
                        >
                            About
                        </Link>
                    </nav>
                </div>

                {/* Actions (Right) */}
                <div className="flex items-center gap-6">
                    {/* Cart Icon */}
                    <Link href="/cart" className="relative flex items-center gap-2 px-5 py-2.5 bg-white border-[1.5px] border-border rounded-full text-charcoal hover:border-[1.5px] hover:border-melon hover:text-melon hover:shadow-tactile transition-all group">
                        <span className="font-body font-bold text-[15px] hidden sm:block">Cart</span>
                        <svg className="w-5 h-5 transition-transform group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {mounted && cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-melon border-[1.5px] border-charcoal text-white text-[11px] font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
