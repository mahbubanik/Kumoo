"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { PeekSheet } from "@/components/PeekSheet";
import { ArtboardGallery } from "@/components/ArtboardGallery";
import { Product } from "@/lib/types";

export function HomeClient({ featuredProducts }: { featuredProducts: Product[] }) {
    const [peekProduct, setPeekProduct] = useState<Product | null>(null);
    const [isPeekOpen, setIsPeekOpen] = useState(false);

    const handleQuickView = (product: Product) => {
        setPeekProduct(product);
        setIsPeekOpen(true);
    };

    const closePeek = () => {
        setIsPeekOpen(false);
        setTimeout(() => setPeekProduct(null), 250);
    };

    // Carousel auto-scroll loop
    const carouselRef = useRef<HTMLDivElement>(null);
    const [carouselHovered, setCarouselHovered] = useState(false);

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        const pixelsPerSecond = 45; // Slightly faster for visual cue
        let rafId: number;
        let lastTime: number | null = null;
        let accumulatedScroll = 0;

        const step = (timestamp: number) => {
            if (!lastTime) lastTime = timestamp;
            const deltaTime = timestamp - lastTime;
            lastTime = timestamp;

            if (!carouselHovered && el) {
                // Disable snap during auto-scroll to allow sub-pixel movement
                if (el.style.scrollSnapType !== 'none') {
                    el.style.scrollSnapType = 'none';
                }

                const moveAmount = (pixelsPerSecond * deltaTime) / 1000;
                accumulatedScroll += moveAmount;

                if (accumulatedScroll >= 1) {
                    const pixelsToMove = Math.floor(accumulatedScroll);
                    accumulatedScroll -= pixelsToMove;

                    // With duplicated content, we reset to half the scrollWidth
                    // The gap makes it slightly tricky, but scrollWidth / 2 is exact because we duplicate the exact elements and gap.
                    const halfScroll = el.scrollWidth / 2;
                    if (el.scrollLeft >= halfScroll) {
                        el.scrollLeft -= halfScroll; // Jump seamlessly back
                    } else {
                        el.scrollLeft += pixelsToMove;
                    }
                }
            } else if (el && el.style.scrollSnapType === 'none') {
                // Re-enable snap when hovered/interacting
                el.style.scrollSnapType = 'x mandatory';
            }

            rafId = requestAnimationFrame(step);
        };

        // Start after short delay
        const timer = setTimeout(() => {
            rafId = requestAnimationFrame(step);
        }, 2000);

        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(rafId);
            if (el) el.style.scrollSnapType = 'x mandatory';
        };
    }, [carouselHovered, featuredProducts.length]);

    return (
        <>
            {/* Bear pattern background — extends across entire landing page */}
            <div className="relative">
                <div
                    className="fixed inset-0 z-0 opacity-[0.06] pointer-events-none"
                    style={{
                        backgroundImage: 'url(/bear-pattern.png)',
                        backgroundSize: '400px',
                        backgroundRepeat: 'repeat',
                    }}
                />
                {/* ═══════════════════════════════════════════════════
          HERO — Typography-Driven
          ═══════════════════════════════════════════════════ */}
                <section className="relative pt-48 pb-24 sm:pt-[22vh] sm:pb-32 overflow-hidden">

                    {/* Soft ambient blobs */}
                    <div className="absolute top-20 left-1/4 w-80 h-80 bg-melon/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-lilac/10 rounded-full blur-3xl" />

                    <div className="layout-container relative z-10 flex flex-col items-center text-center">

                        {/* Centered Typography */}
                        <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-[1.15] mb-5 max-w-2xl tracking-tight">
                            Quiet moments,{" "}
                            <span className="text-melon relative inline-block">softly woven.</span>
                        </h1>

                        <p className="font-body text-charcoal/70 text-base sm:text-lg mb-10 max-w-lg leading-relaxed font-medium">
                            A curated collection of artisan plushies and effortless accessories.
                        </p>

                        {/* CTA Buttons — center aligned */}
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                            <Link href="/shop" className="btn-primary text-center px-10">
                                Shop Collection
                            </Link>
                            <Link href="/custom" className="btn-secondary text-center px-10">
                                Custom Orders
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Section divider */}
                <hr className="border-border/40 mx-auto max-w-5xl my-4 sm:my-8" />

                {/* ═══════════════════════════════════════════════════
          FEATURED PRODUCTS
          ═══════════════════════════════════════════════════ */}
                <section className="py-20 sm:py-24 relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-lilac/20 rounded-full blur-3xl" />
                    <div className="layout-container relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div>
                                <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal mb-3">
                                    Selected Works 🌸
                                </h2>
                                <p className="font-body text-charcoal/70 text-base max-w-md font-medium">
                                    Our most loved, cuddly, and painstakingly engineered crochet items. Pick your favorite squish!
                                </p>
                            </div>
                            <Link href="/shop" className="font-display font-bold text-xs uppercase tracking-widest text-melon hover:text-[#8C73A1] transition-colors shrink-0 bg-white px-5 py-2.5 rounded-full border-[1.5px] border-melon shadow-sm hover:shadow-tactile">
                                View Entire Catalog
                            </Link>
                        </div>

                        {/* Horizontal Scroll Carousel */}
                        <div
                            ref={carouselRef}
                            className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth"
                            style={{
                                scrollSnapType: 'x mandatory',
                                WebkitOverflowScrolling: 'touch',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                            onMouseEnter={() => setCarouselHovered(true)}
                            onMouseLeave={() => setCarouselHovered(false)}
                            onTouchStart={() => setCarouselHovered(true)}
                            onTouchEnd={() => setCarouselHovered(false)}
                        >
                            {/* Original Set */}
                            {featuredProducts.map((product, i) => (
                                <div
                                    key={`orig-${product.id}`}
                                    className="min-w-[240px] sm:min-w-[260px] lg:min-w-[280px] flex-shrink-0"
                                    style={{ scrollSnapAlign: 'start' }}
                                >
                                    <ProductCard
                                        product={product}
                                        onQuickView={handleQuickView}
                                        index={i}
                                    />
                                </div>
                            ))}
                            {/* Cloned Set for Seamless Loop */}
                            {featuredProducts.length > 0 && featuredProducts.map((product, i) => (
                                <div
                                    key={`clone-${product.id}`}
                                    className="min-w-[240px] sm:min-w-[260px] lg:min-w-[280px] flex-shrink-0"
                                    style={{ scrollSnapAlign: 'start' }}
                                    aria-hidden="true"
                                >
                                    <ProductCard
                                        product={product}
                                        onQuickView={handleQuickView}
                                        index={i + featuredProducts.length}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section divider */}
                <hr className="border-border/40 mx-auto max-w-5xl my-4 sm:my-8" />

                {/* ═══════════════════════════════════════════════════
          COLLECTIONS — Pastel Pebble Style
          ═══════════════════════════════════════════════════ */}
                <section className="py-20 sm:py-24 relative">
                    <div className="layout-container">
                        <div className="text-center mb-12">
                            <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal inline-block relative">
                                Explore Categories
                                <span className="absolute -bottom-1 left-0 w-full h-2.5 bg-melon/30 rounded-full -z-10 transform -rotate-1"></span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            {[
                                {
                                    title: "Plushies",
                                    desc: "Soft companions.",
                                    image: "/products/24730378-3746-4e7f-88e5-58a5d0d49ee4.jpg",
                                    href: "/shop?cat=plushies",
                                    bg: "bg-[#F2CDCD]/20",
                                    border: "border-[#F2CDCD]/40",
                                },
                                {
                                    title: "Bags",
                                    desc: "Everyday carriers.",
                                    image: "/products/836512a4-3cc2-44d6-a136-2ebe41efe0e0.jpg",
                                    href: "/shop?cat=bags",
                                    bg: "bg-[#E5DEF7]/20",
                                    border: "border-[#E5DEF7]/40",
                                },
                                {
                                    title: "Accessories",
                                    desc: "Small details.",
                                    image: "/products/9e28e265-e205-4b3d-a37b-d46bddd7d772.jpg",
                                    href: "/shop?cat=accessories",
                                    bg: "bg-[#FDF1CC]/30",
                                    border: "border-[#FDF1CC]/50",
                                },
                                {
                                    title: "Clothing",
                                    desc: "Wearable art.",
                                    image: "/products/floral-mesh-top.jpeg",
                                    href: "/shop?cat=clothing",
                                    bg: "bg-[#A98FBE]/20",
                                    border: "border-[#A98FBE]/40",
                                },
                            ].map((cat) => (
                                <Link
                                    href={cat.href}
                                    key={cat.title}
                                    className={`group relative overflow-hidden flex flex-col items-center justify-between ${cat.bg} border-[1.5px] ${cat.border} rounded-[28px] p-6 sm:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out`}
                                >
                                    {/* Category Text */}
                                    <div className="text-center z-10 w-full mb-6">
                                        <h3 className="font-display font-bold text-xl sm:text-2xl text-charcoal mb-1.5">{cat.title}</h3>
                                        <p className="text-charcoal/50 text-sm uppercase tracking-widest font-medium">{cat.desc}</p>
                                    </div>

                                    {/* Category Image — rounded white frame, uniform size */}
                                    <div className="relative w-full aspect-[4/3] bg-white border-[1.5px] border-border rounded-[20px] overflow-hidden z-10">
                                        <Image
                                            src={cat.image}
                                            alt={cat.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    </div>

                                    {/* Hover arrow indicator */}
                                    <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2C2C" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section divider */}
                <hr className="border-border/40 mx-auto max-w-5xl my-4 sm:my-8" />

                {/* ═══════════════════════════════════════════════════
          CUSTOM ORDERS & REVIEWS
          ═══════════════════════════════════════════════════ */}
                <section className="py-20 sm:py-24 mb-24 sm:mb-32 bg-vanilla overflow-hidden relative">
                    <div className="layout-container">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                            {/* Custom Orders - Pastel Card */}
                            <div className="flex flex-col justify-center border-2 border-charcoal bg-rose rounded-[36px] p-8 sm:p-12 shadow-[8px_8px_0px_rgba(44,44,44,1)] transform hover:-translate-y-2 transition-transform">
                                <span className="inline-block px-4 py-1 bg-white text-charcoal font-display font-bold text-[13px] uppercase tracking-widest rounded-full shadow-sm mb-6 w-max border-2 border-charcoal">
                                    Commission Work
                                </span>
                                <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal leading-tight mb-5">
                                    Got a wild idea? <br />Let&apos;s make it real.
                                </h2>
                                <p className="font-body text-charcoal/80 text-base leading-relaxed mb-12 max-w-sm font-medium">
                                    Want a giant amigurumi octopus or a custom-colored tote? Send us your dreams, and we&apos;ll hook them into reality with premium yarn.
                                </p>

                                <div className="mt-auto">
                                    <a
                                        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}?text=Inquiry:%20Custom%20Commission`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-charcoal text-white font-display font-bold text-base px-7 py-4 rounded-full flex items-center justify-center gap-3 hover:bg-[#4a4152] hover:shadow-tactile hover:-translate-y-1 transition-all"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                        Contact Studio
                                    </a>
                                </div>
                            </div>

                            {/* Testimonials - Scrapbook */}
                            <div className="flex flex-col gap-6 relative">
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="font-display font-bold text-3xl text-charcoal relative inline-block">
                                        Happy Logs 💌
                                        <span className="absolute -bottom-2 left-0 w-full h-3 bg-mint/50 rounded-full -z-10"></span>
                                    </h2>
                                </div>

                                <div className="space-y-8 pl-4 border-l-4 border-dashed border-melon/50">
                                    {[
                                        {
                                            quote: "The fluffiness of this piece is exceptional. Cuddly and perfectly crafted!",
                                            name: "F. Rahman",
                                            color: "bg-surface"
                                        },
                                        {
                                            quote: "Ordered a custom piece. The studio delivered exactly the cuteness I requested. Highly recommended.",
                                            name: "N. Ahamed",
                                            color: "bg-babyblue/20"
                                        },
                                        {
                                            quote: "Quality materials and perfect execution. The tiny blush details show the love put into it.",
                                            name: "S. Hossain",
                                            color: "bg-mint/20"
                                        },
                                    ].map((review, i) => (
                                        <div
                                            key={i}
                                            className={`p-8 border-2 border-border rounded-[32px] relative transform transition-transform hover:-translate-y-1 hover:shadow-sm ${review.color} ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
                                        >
                                            <div className="absolute -top-4 -left-4 w-8 h-8 bg-melon text-white font-display font-bold flex items-center justify-center rounded-full border-2 border-charcoal">
                                                {i + 1}
                                            </div>
                                            <p className="font-body text-charcoal text-base leading-relaxed mb-6 max-w-md font-medium">
                                                &quot;{review.quote}&quot;
                                            </p>
                                            <p className="text-melon font-display font-bold text-sm uppercase tracking-widest text-right">
                                                — {review.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Maker's Diary SEO + Visual Artboard Additive Extension */}
                <ArtboardGallery products={featuredProducts} />

                {/* Peek Sheet Integration */}
                <PeekSheet
                    product={peekProduct}
                    isOpen={isPeekOpen}
                    onClose={closePeek}
                />
            </div>{/* end bear-pattern wrapper */}
        </>
    );
}
