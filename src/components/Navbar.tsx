"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen]);

    const navLinks = [
        { href: "/shop", label: "Shop" },
        { href: "/about", label: "About" },
        { href: "/custom", label: "Custom Orders" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
                    ? "bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] py-3"
                    : "bg-transparent py-8"
                    }`}
            >
                <div className="layout-container flex items-center justify-between">
                    {/* Logo & Navigation (Left) */}
                    <div className="flex items-center gap-6 lg:gap-12">
                        <Link
                            href="/"
                            className="flex items-center group transition-transform hover:scale-105"
                        >
                            <Image src="/brand-logo.png" alt="Kumoo Logo" width={280} height={96} className="w-auto h-[88px] sm:h-[96px] md:h-[104px]" priority />
                        </Link>

                        {/* Desktop Links */}
                        <nav className="hidden md:flex items-center gap-4" aria-label="Main navigation">
                            {navLinks.slice(0, 2).map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-5 py-2 rounded-full font-body font-bold text-[15px] transition-all ${pathname.includes(link.href) ? "bg-charcoal text-white shadow-md" : "text-charcoal/70 hover:bg-white hover:text-charcoal hover:shadow-sm"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Actions (Right) */}
                    <div className="flex items-center gap-4">
                        {/* Cart Icon */}
                        <Link href="/cart" aria-label="Shopping Cart" className="relative flex items-center gap-2 px-5 py-2.5 bg-white border-[1.5px] border-border rounded-full text-charcoal hover:border-[1.5px] hover:border-melon hover:text-melon hover:shadow-tactile transition-all group">
                            <span className="font-body font-bold text-[15px] hidden sm:block">Cart</span>
                            <svg className="w-5 h-5 transition-transform group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {mounted && cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-melon text-white text-[10px] font-bold rounded-full w-[22px] h-[22px] flex items-center justify-center ring-[2.5px] ring-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white border-[1.5px] border-border text-charcoal hover:border-melon hover:text-melon transition-all active:scale-90"
                            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <line x1="4" y1="7" x2="20" y2="7" />
                                    <line x1="4" y1="12" x2="20" y2="12" />
                                    <line x1="4" y1="17" x2="20" y2="17" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[39] bg-charcoal/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu Drawer */}
            <nav
                className={`fixed top-0 right-0 z-[41] h-full w-[280px] bg-white shadow-[-16px_0_40px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] md:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                aria-label="Mobile navigation"
            >
                <div className="flex flex-col h-full pt-28 pb-8 px-8">
                    {/* Nav Links */}
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`px-5 py-4 rounded-2xl font-body font-bold text-lg transition-all ${pathname.includes(link.href)
                                    ? "bg-melon/10 text-melon"
                                    : "text-charcoal/80 hover:bg-vanilla hover:text-charcoal"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-auto flex flex-col gap-4">
                        <hr className="border-border" />
                        <Link
                            href="/cart"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between px-5 py-4 rounded-2xl bg-charcoal text-white font-bold text-base transition-all active:scale-95"
                        >
                            <span>View Cart</span>
                            {mounted && cartCount > 0 && (
                                <span className="bg-melon text-white text-xs font-bold rounded-full px-3 py-1">
                                    {cartCount} items
                                </span>
                            )}
                        </Link>
                        <p className="text-center text-charcoal/40 text-xs font-bold tracking-wide">
                            © {new Date().getFullYear()} Kumoo Studio
                        </p>
                    </div>
                </div>
            </nav>
        </>
    );
}
