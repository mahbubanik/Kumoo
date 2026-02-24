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
            <div className="relative aspect-[4/5] mb-5 bg-vanilla border-[1.5px] border-border rounded-[28px] overflow-hidden transition-all duration-500 group-hover:border-melon group-hover:shadow-tactile-hover group-hover:-translate-y-2">
                <div className="relative w-full h-full">
                    <Image
                        src={product.images[0]}
                        alt={product.name_en}
                        fill
                        unoptimized
                        className="object-cover rounded-[28px] transition-transform duration-700 ease-in-out group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                    />
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    {product.stock <= 3 && product.stock > 0 && (
                        <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white bg-danger rounded-full shadow-sm">
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
                        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 backdrop-blur-md border-[1.5px] border-border text-charcoal text-[11px] uppercase tracking-widest font-bold px-4 py-2 rounded-full shadow-sm hover:border-melon hover:text-melon hover:shadow-tactile transform translate-y-2 group-hover:translate-y-0"
                    >
                        Quick Look
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
