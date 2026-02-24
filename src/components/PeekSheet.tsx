"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/useCartStore";
import { Check } from "lucide-react";

interface PeekSheetProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export function PeekSheet({ product, isOpen, onClose }: PeekSheetProps) {
    const [isAdded, setIsAdded] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

    const handleClose = useCallback(() => {
        setIsAdded(false);
        onClose();
    }, [onClose]);

    // Manage body scroll and escape key
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };

        if (isOpen) document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, handleClose]);

    const handleAddToCart = () => {
        if (!product) return;

        addItem({
            id: product.id,
            name: product.name_en,
            price: product.price,
            image: product.images[0],
            quantity: 1,
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    if (!product) return null;

    return (
        <>
            {/* Soft Blurred Backdrop */}
            <div
                className={`fixed inset-0 bg-charcoal/40 z-50 backdrop-blur-sm transition-opacity duration-400 ease-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={handleClose}
            />

            {/* The Sheet */}
            <div
                className={`fixed bottom-0 left-0 right-0 sm:left-auto sm:right-0 sm:top-0 sm:w-[450px] sm:h-full z-[51] bg-vanilla sm:rounded-none rounded-t-[32px] sm:border-l-4 border-border transition-transform duration-500 ease-in-out max-h-[92vh] sm:max-h-none overflow-y-auto shadow-[-10px_0_30px_rgba(255,139,167,0.1)] ${isOpen ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-y-0 sm:translate-x-full"
                    }`}
            >
                {/* Mobile Drag Handle */}
                <div className="w-12 h-1 bg-border rounded-full mx-auto mt-4 mb-2 sm:hidden" />

                <div className="p-6 sm:p-8 flex flex-col h-full">

                    <button onClick={handleClose} className="absolute top-6 right-6 w-10 h-10 bg-white border-2 border-border rounded-full flex items-center justify-center text-charcoal shadow-sm hover:bg-melon hover:border-melon hover:text-white hover:shadow-tactile transition-all hidden sm:flex">
                        ✕
                    </button>

                    <div className="flex-grow flex flex-col pt-4 sm:pt-8">
                        {/* Product Image */}
                        <div className="relative aspect-square w-full rounded-[32px] overflow-hidden bg-white mb-8 border-2 border-border p-4 shadow-sm anim-float-y">
                            <Image
                                src={product.images[0]}
                                alt={product.name_en}
                                fill
                                className="object-cover p-4 drop-shadow-md"
                                unoptimized
                                priority
                            />

                            {/* Stock Tag on Image */}
                            {product.stock <= 3 && product.stock > 0 && (
                                <span className="absolute top-4 right-4 z-10 inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white bg-danger rounded-full shadow-sm">
                                    LOW STOCK
                                </span>
                            )}
                            {product.stock === 0 && (
                                <span className="absolute top-4 right-4 z-10 inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-ink-muted border-2 border-border bg-white rounded-full">
                                    SOLD OUT
                                </span>
                            )}
                        </div>

                        {/* Name + Price */}
                        <div className="mb-6 flex flex-col items-center text-center">
                            <h2 className="font-display font-bold text-3xl text-charcoal leading-tight mb-2">
                                {product.name_en}
                            </h2>
                            <div className="flex items-center justify-center gap-3">
                                <span className="text-price font-bold text-2xl text-melon bg-white px-4 py-1 rounded-full border-2 border-melon shadow-sm">
                                    ৳{product.price}
                                </span>
                                {product.compare_at_price && (
                                    <span className="text-ink-muted line-through text-lg font-body font-bold">
                                        ৳{product.compare_at_price}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="prose prose-sm text-charcoal/80 font-body font-medium mb-10 text-center mx-auto line-clamp-3">
                            {product.description_en}
                        </div>

                        {/* Actions */}
                        <div className="mt-auto">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className={`btn-primary w-full py-4 text-lg flex justify-center items-center gap-2 transition-all ${isAdded ? '!bg-mint !border-mint !text-charcoal shadow-tactile' : ''}`}
                            >
                                {product.stock === 0
                                    ? "Sold Out"
                                    : isAdded
                                        ? <><Check size={20} /> Added to Cart</>
                                        : "Add to Cart"}
                            </button>
                            <button
                                onClick={handleClose}
                                className="w-full py-4 text-charcoal/50 text-xs uppercase tracking-widest font-bold hover:text-melon mt-3 transition-colors rounded-full"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
