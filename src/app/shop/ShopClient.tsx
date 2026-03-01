"use client";

import React, { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { PeekSheet } from "@/components/PeekSheet";
import { Product } from "@/lib/types";
import { useSearchParams } from "next/navigation";

export function ShopClient({ products }: { products: Product[] }) {
    const searchParams = useSearchParams();
    const initialCat = searchParams.get("cat") || "all";

    const [activeCategory, setActiveCategory] = useState(initialCat);
    const [peekProduct, setPeekProduct] = useState<Product | null>(null);
    const [isPeekOpen, setIsPeekOpen] = useState(false);

    const categories = [
        { id: "all", label: "Everything", count: products.length },
        { id: "plushies", label: "Plushies", count: products.filter(p => p.category === "plushies").length },
        { id: "bags", label: "Bags", count: products.filter(p => p.category === "bags").length },
        { id: "accessories", label: "Accessories", count: products.filter(p => p.category === "accessories").length },
        { id: "clothing", label: "Clothing", count: products.filter(p => p.category === "clothing").length },
    ];

    const filteredProducts = useMemo(() => {
        if (activeCategory === "all") return products;
        return products.filter((p) => p.category === activeCategory);
    }, [activeCategory, products]);

    const handleQuickView = (product: Product) => {
        setPeekProduct(product);
        setIsPeekOpen(true);
    };

    const closePeek = () => {
        setIsPeekOpen(false);
        setTimeout(() => setPeekProduct(null), 250);
    };

    return (
        <div className="relative">
            {/* Bear pattern background */}
            <div
                className="fixed inset-0 z-0 opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage: 'url(/bear-pattern.png)',
                    backgroundSize: '400px',
                    backgroundRepeat: 'repeat',
                }}
            />
            <div className="layout-container relative z-10 pt-36 sm:pt-44 pb-20">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="font-display font-bold text-charcoal mb-3">
                        The Collection
                    </h1>
                    <p className="text-charcoal/45 text-base max-w-md mx-auto font-medium leading-relaxed">
                        Handcrafted pieces requiring deliberate patience.
                    </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-14">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold tracking-[0.12em] transition-all duration-200 ${activeCategory === cat.id
                                ? "bg-charcoal text-white"
                                : "bg-white text-charcoal/50 border border-border hover:border-charcoal/30 hover:text-charcoal"
                                }`}
                        >
                            <span className="uppercase">{cat.label}</span>
                            <span className={`text-[10px] ${activeCategory === cat.id ? 'text-white/50' : 'text-charcoal/25'}`}>
                                {cat.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-charcoal/40 font-medium text-base">
                            No products in this category yet. Check back soon!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
                        {filteredProducts.map((product, i) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onQuickView={handleQuickView}
                                index={i}
                            />
                        ))}
                    </div>
                )}

                {/* Count */}
                <p className="text-center text-charcoal/25 text-[12px] mt-12 tracking-widest font-medium uppercase">
                    {filteredProducts.length} of {products.length} products
                </p>

                <PeekSheet
                    product={peekProduct}
                    isOpen={isPeekOpen}
                    onClose={closePeek}
                />
            </div>
        </div>
    );
}
