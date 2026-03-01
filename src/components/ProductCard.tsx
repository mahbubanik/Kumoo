"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

interface ProductCardProps {
    product: Product;
    index?: number;
    onQuickView?: (product: Product) => void;
}

export function ProductCard({
    product,
    index = 0,
    onQuickView
}: ProductCardProps) {
    const delay = `${index * 50}ms`;

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevents the Link from routing
        if (onQuickView) onQuickView(product);
    };

    return (
        <Link
            href={`/shop/${product.slug}`}
            className="group flex flex-col h-full cursor-pointer animate-fade-in"
            style={{ animationDelay: delay }}
            aria-label={`View ${product.name_en}`}
        >
            {/* Visual Metaphor: Kawaii Window */}
            <div className="relative aspect-[4/5] mb-4 bg-vanilla border-[1.5px] border-border rounded-[28px] overflow-hidden transition-all duration-500 group-hover:border-melon group-hover:shadow-tactile-hover group-hover:-translate-y-2">
                <div className="relative w-full h-full">
                    <Image
                        src={product.images[0]}
                        alt={product.name_en}
                        fill
                        className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 50vw, 33vw"
                    />
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    {product.stock <= 3 && product.stock > 0 && (
                        <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-charcoal bg-rose rounded-full shadow-sm">
                            LOW STOCK
                        </span>
                    )}
                    {product.stock === 0 && (
                        <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-ink-muted border-2 border-border bg-white rounded-full">
                            SOLD OUT
                        </span>
                    )}
                </div>

                {onQuickView && (
                    <button
                        onClick={handleQuickView}
                        className="absolute bottom-5 left-1/2 -translate-x-1/2 w-max opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform translate-y-2 lg:translate-y-6 lg:group-hover:translate-y-0 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(169,143,190,0.2)] text-charcoal hover:bg-white hover:text-melon hover:border-melon hover:shadow-[0_12px_40px_rgba(169,143,190,0.3)] group/peek z-20"
                    >
                        <svg className="w-[18px] h-[18px] transition-transform duration-300 group-hover/peek:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span className="font-display font-bold text-[13px] tracking-wide">Take a Peek</span>
                    </button>
                )}
            </div>

            {/* Info: Name & Price */}
            <div className="flex-grow flex flex-col px-2 text-center items-center">
                <h3 className="font-display font-bold text-base text-charcoal leading-snug group-hover:text-melon transition-colors mb-1">
                    {product.name_en}
                </h3>
                <span className="font-body text-sm font-bold text-ink-muted">৳{product.price}</span>
            </div>
        </Link>
    );
}
