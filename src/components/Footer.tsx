import React from "react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-charcoal text-white relative overflow-hidden">
            {/* Playful Wavy Top Border */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-full h-[30px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C69.67,25.86,137.93,52.48,206.19,65.37-251.78,74.79-286.73,63.46-321.39,56.44Z" className="fill-canvas"></path>
                </svg>
            </div>

            <div className="layout-container pt-8 py-20 sm:py-24 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10">
                    {/* Brand */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="font-display font-medium text-3xl text-melon tracking-wide uppercase">Kumoo.</span>
                        </div>
                        <p className="text-white/80 font-body text-base leading-relaxed max-w-sm">
                            Handcrafted crochet plushies & accessories made with premium yarn and
                            strict attention to detail. Every piece is unique.
                        </p>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="font-display text-lg tracking-widest text-mint mb-6">
                            Shop
                        </h4>
                        <div className="space-y-4 font-body font-bold">
                            <Link href="/shop?cat=plushies" className="block text-base text-white/80 hover:text-melon hover:translate-x-1 transition-all">
                                Plushies
                            </Link>
                            <Link href="/shop?cat=bags" className="block text-base text-white/80 hover:text-melon hover:translate-x-1 transition-all">
                                Bags
                            </Link>
                            <Link href="/shop?cat=accessories" className="block text-base text-white/80 hover:text-melon hover:translate-x-1 transition-all">
                                Accessories
                            </Link>
                            <Link href="/custom" className="block text-base text-white/80 hover:text-melon hover:translate-x-1 transition-all">
                                Custom Orders
                            </Link>
                        </div>
                    </div>

                    {/* Help */}
                    <div>
                        <h4 className="font-display text-lg tracking-widest text-babyblue mb-6">
                            Help
                        </h4>
                        <div className="space-y-4 font-body font-bold">
                            <Link href="/faq" className="block text-base text-white/80 hover:text-babyblue hover:translate-x-1 transition-all">
                                FAQ
                            </Link>
                            <Link href="/shipping" className="block text-base text-white/80 hover:text-babyblue hover:translate-x-1 transition-all">
                                Shipping & Delivery
                            </Link>
                            <Link href="/contact" className="block text-base text-white/80 hover:text-babyblue hover:translate-x-1 transition-all">
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-display text-lg tracking-widest text-rose mb-6">
                            Contact
                        </h4>
                        <p className="font-body text-base text-white/80 mb-6 leading-relaxed">
                            Reach out for custom orders or inquiries.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-12 h-12 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-melon hover:border-melon hover:shadow-glow-melon hover:-translate-y-1 transition-all"
                                aria-label="Instagram"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" />
                                    <circle cx="12" cy="12" r="5" />
                                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-12 h-12 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-babyblue hover:border-babyblue hover:shadow-glow-melon hover:-translate-y-1 transition-all"
                                aria-label="Facebook"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t-2 border-white/10 mt-16 pt-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="font-body font-bold text-white/50 text-sm tracking-widest">
                        © {new Date().getFullYear()} Kumoo Studio
                    </p>
                    <p className="font-body font-bold text-white/50 text-sm tracking-widest">
                        Handmade with 💖 in Dhaka, Bangladesh
                    </p>
                </div>
            </div>
        </footer>
    );
}
