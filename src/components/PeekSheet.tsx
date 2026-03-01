"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/useCartStore";
import { Check } from "lucide-react";
import { DELIVERY_ZONES } from "@/lib/config";

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

    const sheetRef = useRef<HTMLDivElement>(null);

    // Manage body scroll, escape key, and focus trap
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Focus the sheet when opened
            setTimeout(() => sheetRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = "";
        }

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();

            // Focus trap: keep Tab within the sheet
            if (e.key === "Tab" && isOpen && sheetRef.current) {
                const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
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
            ...(product.options?.sizes?.length ? { size: product.options.sizes[0] } : {}),
            ...(product.options?.colors?.length ? { color: product.options.colors[0].name, colorHex: product.options.colors[0].hex } : {}),
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    if (!product) return null;

    return (
        <>
            {/* Soft Blurred Backdrop */}
            <div
                className={`fixed inset-0 bg-charcoal/40 z-50 backdrop-blur-sm transition-opacity duration-300 ease-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={handleClose}
            />

            {/* The Sheet */}
            <div
                ref={sheetRef}
                role="dialog"
                aria-modal="true"
                aria-label={product ? `Quick view: ${product.name_en}` : "Product quick view"}
                tabIndex={-1}
                className={`fixed bottom-0 left-0 right-0 sm:left-auto sm:right-0 sm:top-0 sm:w-[500px] sm:h-full max-h-[85vh] sm:max-h-full z-[51] bg-vanilla sm:rounded-l-[40px] rounded-t-[32px] sm:rounded-tr-none sm:rounded-br-none sm:border-l-[1.5px] border-border transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[-20px_0_60px_rgba(169,143,190,0.15)] outline-none flex flex-col ${isOpen ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-y-0 sm:translate-x-[110%]"
                    }`}
            >
                {/* Mobile Drag Handle */}
                <div className="w-12 h-1.5 bg-border rounded-full mx-auto mt-4 mb-2 sm:hidden" />

                <div className="p-6 sm:px-10 flex flex-col flex-1 overflow-y-auto overflow-x-hidden relative pb-[120px] custom-scrollbar">
                    <div className="flex justify-between items-center mb-6 pt-2 sm:pt-6">
                        <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-melon flex items-center gap-2">
                            Peek-a-Boo!
                        </h2>
                        <button onClick={handleClose} className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-border text-charcoal shadow-sm hover:border-melon hover:text-melon hover:shadow-tactile active:scale-90 transition-all z-20">
                            ✕
                        </button>
                    </div>

                    <div className="flex flex-col gap-5">
                        {/* Hero Header */}
                        <div className="flex flex-col gap-1 items-center text-center">
                            <h2 className="font-display font-bold text-3xl sm:text-4xl text-charcoal leading-tight tracking-tight">
                                {product.name_en}
                            </h2>
                            <span className="text-2xl font-bold text-melon font-body">
                                ৳{product.price}
                            </span>
                        </div>

                        {/* Product Feature Image */}
                        <div className="relative w-[65%] max-w-[240px] aspect-[4/5] rounded-[32px] overflow-hidden bg-white border-[2px] border-border mx-auto shrink-0 shadow-tactile my-2">
                            <Image
                                src={product.images[0]}
                                alt={product.name_en}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                                sizes="240px"
                            />
                        </div>

                        {/* Description Section */}
                        <div className="bg-vanilla/50 rounded-[24px] p-5 border-[1.5px] border-border/60">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-charcoal/40 mb-2 flex items-center gap-2">
                                📝 The Squish Details
                            </h4>
                            <p className="text-[14px] text-charcoal/70 leading-relaxed font-medium line-clamp-4">
                                {product.description_en}
                            </p>
                        </div>

                        {/* Useful Summary Details */}
                        <div className="space-y-3 mb-6 flex-1">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest bg-white py-3 px-4 rounded-xl border border-border mt-2">
                                <span className="text-charcoal/40 flex items-center gap-2">📦 Availability</span>
                                <span className={product.stock > 0 ? "text-mint" : "text-danger"}>
                                    {product.stock > 0 ? "In Stock" : "All gone! 🥺"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest bg-white py-3 px-4 rounded-xl border border-border">
                                <span className="text-charcoal/40 flex items-center gap-2">🚚 Standard Delivery</span>
                                <span className="text-charcoal/70">{DELIVERY_ZONES.inside.eta} (৳{DELIVERY_ZONES.inside.fee}-{DELIVERY_ZONES.outside.fee})</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest bg-white py-3 px-4 rounded-xl border border-border">
                                <span className="text-charcoal/40 flex items-center gap-2">☁️ Material</span>
                                <span className="text-charcoal/70">Premium Plush</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions Pin to Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-vanilla/80 backdrop-blur-xl p-6 sm:px-10 border-t border-border z-20">
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className={`btn-primary w-full py-4 text-base sm:text-lg flex justify-center items-center gap-2 transition-all font-bold tracking-wide ${isAdded ? '!bg-mint !border-mint !text-charcoal shadow-tactile' : ''}`}
                    >
                        {product.stock === 0
                            ? "Out of Stock"
                            : isAdded
                                ? <><Check size={20} /> Popped in Cart!</>
                                : "Add to my Cart"}
                    </button>
                </div>
            </div>
        </>
    );
}
