"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// Delicate background SVG motif
const SubtleYarnBg = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-32 -left-20 w-[600px] h-[600px] text-melon/5 -rotate-12 pointer-events-none z-0">
        <path d="M50 8C26.804 8 8 26.804 8 50S26.804 92 50 92 92 73.196 92 50 73.196 8 50 8zM31 30c5.523 0 10-4.477 10-10M69 30c-5.523 0-10-4.477-10-10M31 70c5.523 0 10 4.477 10 10M69 70c-5.523 0-10 4.477-10 10M50 20c0 5.523-4.477 10-10 10M50 80c0-5.523-4.477-10-10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 6" />
        <path d="M25 50h50M35 35l30 30M65 35L35 65" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
);

export function Footer() {
    return (
        <footer className="bg-[#faf8f5] text-charcoal relative overflow-hidden font-body border-t border-border/50">
            <SubtleYarnBg />

            <div className="layout-container py-12 sm:py-16 relative z-10 px-6 sm:px-12 lg:px-24">

                {/* Top Section: Newsletter & Brand Focus */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10 pb-8 border-b-2 border-dashed border-charcoal/10">

                    {/* Brand Statement */}
                    <div className="max-w-md text-center lg:text-left flex flex-col items-center lg:items-start z-10 w-full">
                        <Link href="/" className="inline-block mb-6 transition-transform hover:scale-105 duration-300">
                            <Image src="/brand-logo.png" alt="Kumoo Logo" width={200} height={69} className="h-14 sm:h-16 w-auto" priority />
                        </Link>
                        <p className="font-medium leading-relaxed text-charcoal/70 tracking-wide text-lg">
                            Crafting joy in every stitch. Handmade crochet artifacts designed for a softer, fluffier world.
                        </p>
                    </div>

                    {/* Custom Order CTA (Replaces Newsletter) */}
                    <div className="w-full lg:w-auto lg:min-w-[440px] bg-white p-6 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/50 z-10">
                        <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl text-charcoal mb-2 tracking-wide text-center lg:text-left">
                            Dream it. We&apos;ll crochet it
                        </h3>
                        <p className="text-sm mb-4 text-charcoal/60 leading-relaxed text-center lg:text-left font-medium max-w-sm">
                            Looking for a specific animal, color, or character? Our commissions are currently open for custom handmade designs.
                        </p>
                        <div className="flex justify-center lg:justify-start w-full">
                            <Link
                                href="/contact"
                                className="group bg-charcoal text-white font-bold px-8 py-4 rounded-full border-2 border-charcoal hover:bg-melon hover:border-melon hover:shadow-[0_0_20px_rgba(255,148,148,0.4)] transition-all duration-300 active:scale-95 flex items-center gap-3 z-10"
                            >
                                Request Custom Order
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Main Link Columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 mb-10 text-sm sm:text-base font-bold text-charcoal/80 z-10 relative">

                    {/* Collection */}
                    <div className="flex flex-col gap-4">
                        <h4 style={{ fontFamily: 'var(--font-display)' }} className="text-xl text-melon mb-2 tracking-wide">Collection</h4>
                        <Link href="/shop?cat=plushies" className="hover:text-rose hover:translate-x-1 transition-all w-fit rounded-full px-3 -ml-3 hover:bg-rose/10 py-1.5">Plushies</Link>
                        <Link href="/shop?cat=bags" className="hover:text-babyblue hover:translate-x-1 transition-all w-fit rounded-full px-3 -ml-3 hover:bg-babyblue/10 py-1.5">Handmade Bags</Link>
                        <Link href="/shop?cat=accessories" className="hover:text-mint hover:translate-x-1 transition-all w-fit rounded-full px-3 -ml-3 hover:bg-mint/10 py-1.5">Accessories</Link>
                        <Link href="/shop?cat=clothing" className="hover:text-melon hover:translate-x-1 transition-all w-fit rounded-full px-3 -ml-3 hover:bg-melon/10 py-1.5">Apparel</Link>
                    </div>

                    {/* Support */}
                    <div className="flex flex-col gap-4">
                        <h4 style={{ fontFamily: 'var(--font-display)' }} className="text-xl text-babyblue mb-2 tracking-wide">Support</h4>
                        <Link href="/faq" className="hover:text-babyblue hover:translate-x-1 transition-all w-fit rounded-full px-3 -ml-3 hover:bg-babyblue/10 py-1.5">Help Center & FAQ</Link>
                        <Link href="/shipping" className="hover:text-babyblue hover:translate-x-1 transition-all w-fit rounded-full px-3 -ml-3 hover:bg-babyblue/10 py-1.5">Shipping & Returns</Link>
                        <Link href="/contact" className="hover:text-babyblue hover:translate-x-1 transition-all w-fit rounded-full px-3 -ml-3 hover:bg-babyblue/10 py-1.5">Contact Studio</Link>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col gap-4">
                        <h4 style={{ fontFamily: 'var(--font-display)' }} className="text-xl text-mint mb-2 tracking-wide">Legal</h4>
                        <Link href="/privacy" className="hover:text-mint hover:translate-x-1 transition-all w-fit rounded-full px-3 -ml-3 hover:bg-mint/10 py-1.5">Privacy Policy</Link>
                    </div>

                    {/* Connect */}
                    <div className="flex flex-col gap-4 items-start md:items-end md:text-right">
                        <h4 style={{ fontFamily: 'var(--font-display)' }} className="text-xl text-rose mb-2 tracking-wide w-full">Connect</h4>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/kumoo_04/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-border/80 bg-white flex items-center justify-center text-charcoal/70 hover:bg-rose hover:text-white hover:border-rose hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(255,148,148,0.4)] transition-all duration-300" aria-label="Instagram">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            <a href="https://www.tiktok.com/@kumoo044?fbclid=IwY2xjawQMSd1leHRuA2FlbQIxMABicmlkETJDbmhYOVo5UldZZVVSS0lKc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHhzQ0ri8D--i6SbpQKiK9OeUrIj1SCsK5rmsCP3wmwM7DXImpoNpn-is42eD_aem_swGgVKjfQ__4fVhKKx48gw" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-border/80 bg-white flex items-center justify-center text-charcoal/70 hover:bg-babyblue hover:text-white hover:border-babyblue hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(157,203,245,0.4)] transition-all duration-300" aria-label="TikTok">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/kumoo04" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-border/80 bg-white flex items-center justify-center text-charcoal/70 hover:bg-mint hover:text-white hover:border-mint hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(167,233,175,0.4)] transition-all duration-300" aria-label="Facebook">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Absolute Bottom: Copyright & Fine Print */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-5 mt-6 border-t-[3px] border-dashed border-charcoal/10 text-xs sm:text-sm font-bold tracking-wide text-charcoal/50 z-10 relative">
                    <p>© {new Date().getFullYear()} Kumoo Studio. All rights reserved.</p>
                    <p className="mt-4 md:mt-0 flex items-center gap-2">
                        Designed in Dhaka <span className="text-melon animate-pulse text-lg leading-none">❤</span> Crafted for the World
                    </p>
                </div>

            </div>
        </footer>
    );
}
