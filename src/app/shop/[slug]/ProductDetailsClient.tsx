"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { ImageGallery } from "@/components/ImageGallery";
import { ProductCard } from "@/components/ProductCard";
import { DiarySnippet } from "@/components/DiarySnippet";
import { Product } from "@/lib/types";
import { DELIVERY_ZONES, getEstimatedDelivery } from "@/lib/config";

export function ProductDetailsClient({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    // Variant State
    const hasSizes = product.options?.sizes && product.options.sizes.length > 0;
    const hasColors = product.options?.colors && product.options.colors.length > 0;

    const [selectedSize, setSelectedSize] = useState<string | undefined>(hasSizes ? product.options!.sizes![0] : undefined);
    const [selectedColor, setSelectedColor] = useState<{ name: string, hex: string } | undefined>(hasColors ? product.options!.colors![0] : undefined);

    // Quantity State
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    // Sticky CTA: show when inline CTA scrolls out of view
    const ctaRef = useRef<HTMLDivElement>(null);
    const [showStickyCTA, setShowStickyCTA] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setShowStickyCTA(!entry.isIntersecting),
            { threshold: 0 }
        );
        if (ctaRef.current) observer.observe(ctaRef.current);
        return () => observer.disconnect();
    }, []);

    // Hydrate dynamic delivery date purely on the client side
    const [estimatedDate, setEstimatedDate] = useState<string>("");
    useEffect(() => {
        setEstimatedDate(getEstimatedDelivery('inside'));
    }, []);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name_en,
            price: product.price,
            image: product.images[0],
            quantity: quantity,
            size: selectedSize,
            color: selectedColor?.name,
            colorHex: selectedColor?.hex
        });

        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
            router.push('/cart', { scroll: false });
        }, 400);
    };

    return (
        <div className="min-h-screen pt-28 sm:pt-28 pb-32 bg-white">
            <div className="layout-container max-w-5xl px-4 sm:px-6">
                <nav className="mb-4 pt-0">
                    <Link href="/shop" className="text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal/30 hover:text-charcoal transition-colors flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                        Collection
                    </Link>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-24 items-start">
                    {/* Left: Product Image — full width on mobile */}
                    <div className="w-full lg:max-w-[420px] mx-auto">
                        <div className="relative">
                            <ImageGallery
                                images={product.images}
                                alt={product.name_en}
                            />
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col pt-0 max-w-[500px]">
                        {/* Title & Price - Tighter element Spacing */}
                        <div className="mb-4">
                            <h1 className="font-display font-bold text-[32px] sm:text-[36px] text-charcoal leading-[1.1] mb-1 relative inline-block">
                                {product.name_en}
                                <span className="absolute -bottom-1 left-0 w-full h-3 bg-melon/15 rounded-full -z-10"></span>
                            </h1>
                            <p className="text-[26px] font-display font-bold text-melon">
                                ৳{product.price}
                            </p>
                        </div>

                        {/* Description - 16px Section Spacing (Consolidated) */}
                        <div className="mb-3 sm:mb-4">
                            <p className="text-[16px] text-[#333333]/80 leading-[1.5] max-w-prose">
                                {product.description_en || "A meticulously handcrafted piece designed with minimal aesthetic intent. Knitted with sustainable yarn sourced directly for quality."}
                            </p>
                        </div>

                        {/* Options - Consistently spaced */}
                        {(hasColors || hasSizes) && (
                            <div className="space-y-4 mb-6">
                                {/* Color Swatches */}
                                {hasColors && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-charcoal/40">Color</span>
                                            <span className="text-[13px] font-medium text-charcoal/80">{selectedColor?.name}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            {product.options!.colors!.map((c, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setSelectedColor(c)}
                                                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${selectedColor?.name === c.name ? 'border-charcoal ring-2 ring-charcoal/20 scale-110 shadow-sm z-10' : 'border-white ring-1 ring-border shadow-sm hover:scale-110'}`}
                                                    style={{ backgroundColor: c.hex }}
                                                    aria-label={`Select ${c.name} color`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Size Buttons */}
                                {hasSizes && (
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-widest text-charcoal/40 mb-2 block">Pick Size</span>
                                        <div className="flex gap-3">
                                            {product.options!.sizes!.map((s, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setSelectedSize(s)}
                                                    className={`px-6 py-3 rounded-full border-[1.5px] text-[13px] font-display font-bold transition-all duration-300 ${selectedSize === s ? 'border-melon text-melon bg-melon/5 shadow-sm' : 'border-border text-charcoal/60 hover:border-melon hover:text-melon'}`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Add to Cart Actions */}
                        <div ref={ctaRef} className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8 pt-4 sm:pt-6 border-t border-border/40">
                            {/* Quantity Selector - Branded Rounded */}
                            <div className="flex items-center bg-vanilla rounded-full border-[1.5px] border-border overflow-hidden">
                                <button onClick={() => handleQuantityChange(-1)} className="w-12 h-12 flex items-center justify-center text-xl text-charcoal/40 hover:text-melon transition-colors md:hover:bg-charcoal/5">-</button>
                                <span className="w-8 text-center font-display font-bold text-charcoal">{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)} className="w-12 h-12 flex items-center justify-center text-xl text-charcoal/40 hover:text-melon transition-colors md:hover:bg-charcoal/5">+</button>
                            </div>

                            {/* Add to Cart - Kumoo Primary */}
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className={`btn-primary flex-1 w-full sm:w-auto h-12 py-0 text-[14px] uppercase tracking-widest ${isAdded ? '!bg-mint !text-charcoal' : ''
                                    }`}
                            >
                                {product.stock === 0 ? "Sold Out" : isAdded ? "Added ✓" : "Add to Cart"}
                            </button>
                        </div>

                        {/* Delivery Row */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-8 text-[12px] text-zinc-400 tracking-wide">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold">DHAKA</span>
                                    <span>{DELIVERY_ZONES.inside.fee} BDT</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-zinc-200"></div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold">OUTSIDE</span>
                                    <span>{DELIVERY_ZONES.outside.fee} BDT</span>
                                </div>
                            </div>
                            {/* Estimated Delivery Date */}
                            <p className="text-[12px] text-charcoal/50 font-medium h-4">
                                {estimatedDate ? (
                                    <>📦 Get it by <span className="font-bold text-charcoal/70">{estimatedDate}</span> (Dhaka)</>
                                ) : (
                                    <span className="animate-pulse">📦 Calculating delivery date...</span>
                                )}
                            </p>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border/30">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-vanilla border border-border/60 text-[11px] font-bold text-charcoal/50 tracking-wide">
                                🧶 Handmade
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-vanilla border border-border/60 text-[11px] font-bold text-charcoal/50 tracking-wide">
                                🌿 Premium Yarn
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-vanilla border border-border/60 text-[11px] font-bold text-charcoal/50 tracking-wide">
                                🔒 Secure Checkout
                            </span>
                        </div>
                    </div>
                </div>

                {/* The Maker's Diary SEO Additive Extension */}
                <div className="mt-20 sm:mt-24">
                    <DiarySnippet product={product} />
                </div>

                {/* ═══════════════════════════════════════════════════
                    Related Products (You May Also Like)
                ═══════════════════════════════════════════════════ */}
                {relatedProducts.length > 0 && (
                    <div className="mt-32 pt-16 border-t border-border/60">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div>
                                <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal mb-3">
                                    You May Also Like ✿
                                </h2>
                                <p className="font-body text-charcoal/60 text-base max-w-sm font-medium">
                                    Handpicked companions that pair perfectly with this piece.
                                </p>
                            </div>
                            <Link href={`/shop?cat=${product.category}`} className="font-display font-bold text-xs uppercase tracking-widest text-charcoal/60 hover:text-charcoal transition-colors">
                                View Similar
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard
                                    key={relatedProduct.id}
                                    product={relatedProduct}
                                    index={0}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky Mobile CTA */}
            <div className={`fixed bottom-0 left-0 right-0 z-30 lg:hidden transition-transform duration-300 ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="bg-white/90 backdrop-blur-xl border-t border-border/60 px-4 py-3 flex items-center gap-3 safe-area-bottom">
                    <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-[15px] text-charcoal truncate">{product.name_en}</p>
                        <p className="text-melon font-bold text-[14px]">৳{product.price}</p>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className={`btn-primary px-6 py-3 text-[13px] uppercase tracking-widest shrink-0 ${isAdded ? '!bg-mint !text-charcoal' : ''}`}
                    >
                        {product.stock === 0 ? "Sold Out" : isAdded ? "Added ✓" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
}
