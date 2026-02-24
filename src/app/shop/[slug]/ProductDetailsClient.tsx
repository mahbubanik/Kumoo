"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { ImageGallery } from "@/components/ImageGallery";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/lib/types";

export function ProductDetailsClient({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name_en,
            price: product.price,
            image: product.images[0],
            quantity: 1,
        });

        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
            router.push('/cart');
        }, 400);
    };

    return (
        <div className="min-h-screen pt-28 pb-32">
            <div className="layout-container">
                {/* Breadcrumb */}
                <nav className="mb-10 pt-2">
                    <Link href="/shop" className="text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal/35 hover:text-charcoal transition-colors flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                        Back to Collection
                    </Link>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    {/* Left: Product Image */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            {product.featured && (
                                <div className="absolute top-6 left-6 z-20 badge-premium bg-[#FDF1CC]/80 backdrop-blur-sm border border-[#FDF1CC] text-charcoal">
                                    Featured
                                </div>
                            )}
                            <ImageGallery
                                images={product.images}
                                alt={product.name_en}
                            />
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-8">
                        {/* Badges */}
                        <div className="mb-4 flex gap-2">
                            {product.stock > 0 && product.stock <= 5 && (
                                <span className="badge-premium bg-rose/20 text-charcoal border border-rose/30">
                                    Only {product.stock} left
                                </span>
                            )}
                            {product.stock === 0 && (
                                <span className="badge-premium bg-charcoal/5 text-charcoal/40">
                                    Sold Out
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="font-display font-bold text-3xl lg:text-4xl text-charcoal leading-tight mb-3">
                            {product.name_en}
                        </h1>

                        {/* Price */}
                        <p className="text-xl font-bold text-charcoal/50 mb-8 pb-8 border-b border-border">
                            {product.price} BDT
                        </p>

                        {/* Description */}
                        <p className="text-charcoal/50 leading-relaxed mb-10 max-w-sm font-medium text-[15px]">
                            {product.description_en || "A meticulously handcrafted piece designed with minimal aesthetic intent. Knitted with sustainable yarn sourced directly for quality."}
                        </p>

                        {/* Add to Cart */}
                        <div className="mb-10 py-8 border-y border-border">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className={`w-full bg-charcoal text-white font-display font-bold text-[15px] py-4.5 rounded-full transition-all duration-300 hover:bg-[#4a4152] hover:-translate-y-0.5 ${isAdded ? '!bg-mint !text-charcoal' : ''
                                    } ${product.stock === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
                                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
                            >
                                {product.stock === 0 ? "Currently Unavailable" : isAdded ? "Added ✓" : "Add to Cart"}
                            </button>
                        </div>

                        {/* Delivery Details */}
                        <div className="bg-white rounded-[20px] p-7 border border-border shadow-sm">
                            <h3 className="text-[11px] font-bold tracking-[0.18em] uppercase text-charcoal/40 mb-5 flex items-center gap-2.5">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="1" y="3" width="15" height="13"></rect>
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                                </svg>
                                Delivery
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center pb-3 border-b border-border/60">
                                    <span className="text-charcoal/45">Inside Dhaka</span>
                                    <span className="font-bold text-charcoal">70 BDT</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-charcoal/45">Outside Dhaka</span>
                                    <span className="font-bold text-charcoal">120 – 150 BDT</span>
                                </div>
                            </div>
                        </div>
                    </div>
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
        </div>
    );
}
