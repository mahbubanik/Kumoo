"use client";

import React from "react";
import { Product } from "@/lib/types";

export function DiarySnippet({ product }: { product: Product }) {
    if (!product) return null;

    return (
        <section className="py-20 border-t-2 border-dashed border-charcoal/10 bg-gradient-to-b from-white to-vanilla relative overflow-hidden">
            {/* Scrapbook Backdrop Elements */}
            <div className="absolute top-10 right-10 w-44 h-44 bg-rose/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-52 h-52 bg-mint/10 rounded-full blur-3xl pointer-events-none" />

            <div className="layout-container max-w-4xl relative z-10">
                {/* The Journal Page Wrapper */}
                <div className="bg-white rounded-[24px] sm:rounded-[40px] shadow-tactile border-[1.5px] border-border overflow-hidden relative">

                    {/* Ring Binder Holes Simulation */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 border-r-2 border-dashed border-charcoal/10 flex flex-col justify-evenly py-10 bg-vanilla/30">
                        {[1, 2, 3, 4, 5, 6, 7].map((hole) => (
                            <div key={hole} className="w-4 h-4 rounded-full bg-charcoal/5 shadow-inner mx-auto" />
                        ))}
                    </div>

                    <div className="pl-12 sm:pl-16 pr-6 sm:pr-12 pt-12 pb-16 relative">
                        {/* Washi Tape Corner */}
                        <div className="absolute -top-3 -right-6 w-24 h-8 bg-babyblue/30 rotate-45 backdrop-blur-sm" />

                        {/* Script Header */}
                        <div className="mb-8">
                            <span style={{ fontFamily: 'var(--font-handwriting)' }} className="text-3xl text-melon/80 block mb-2 -rotate-1">
                                Studio Notes:
                            </span>
                            <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal">
                                The story behind this {product.category.slice(0, -1)}.
                            </h3>
                        </div>

                        {/* Dotted Notebook Lines for Content */}
                        <div
                            className="text-lg leading-[2.5rem] sm:leading-[3rem] text-charcoal/80 font-medium"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, #00000010 40px)',
                                backgroundSize: '100% 40px',
                                backgroundAttachment: 'local'
                            }}
                        >
                            <p className="mb-6 pt-1">
                                Handcrafting this <strong className="text-charcoal bg-rose/20 px-1 rounded-sm">Handmade crochet {product.name_en}</strong> was an absolute joy!
                                This year, kawaii crochet amigurumi is all about maximizing the squish factor, and I think we totally nailed it here.
                            </p>

                            <p className="mb-6">
                                My main goal was to design something technically durable but overwhelmingly cute.
                                Whether you use it as a <strong className="text-charcoal bg-mint/20 px-1 rounded-sm">Cute stuffed animal</strong> for your desk, or attach it as a handmade bag charm, it&apos;s engineered to bring a smile.
                            </p>

                            <p className="mb-6">
                                We utilize premium, hypoallergenic yarn sourced exclusively for our handcrafted crochet gifts.
                                By keeping the production entirely handmade in Dhaka, Bangladesh, we ensure every single loop is packed with perfection.
                                Nothing beats authentic, <strong className="text-charcoal bg-babyblue/20 px-1 rounded-sm">Retro crochet toys</strong> that stand the test of time!
                            </p>
                        </div>

                        {/* Hand-drawn underline / signature area */}
                        <div className="mt-12 text-right">
                            <span style={{ fontFamily: 'var(--font-handwriting)' }} className="text-2xl text-charcoal block -rotate-3 mr-4">
                                Crafted with love 💖
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
