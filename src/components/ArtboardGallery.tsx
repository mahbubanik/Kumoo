"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

// --- Subcomponents for Chaos Elements ---

const PaperNote = ({ text, rotate = 'rotate-0', color = 'text-charcoal', tapeCol = 'bg-babyblue' }: { text: React.ReactNode, rotate?: string, color?: string, tapeCol?: string }) => (
    <div className={`break-inside-avoid mb-10 sm:mb-16 flex items-center justify-center p-2 transform transition-transform duration-500 hover:scale-[1.03] hover:z-40 ${rotate}`}>
        <div className="relative bg-[#fdfaf5] p-6 sm:p-8 shadow-[2px_5px_15px_rgba(0,0,0,0.06)] border border-charcoal/10 max-w-[260px] w-full">
            {/* Washi Tape */}
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-7 ${tapeCol}/60 backdrop-blur-md -rotate-3 z-10 shadow-sm`} />
            <p className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${color} text-center leading-relaxed`} style={{ fontFamily: 'var(--font-handwriting)' }}>
                {text}
            </p>
        </div>
    </div>
);

const DoodleBlock = ({ text, rotate = 'rotate-0', children }: { text?: string, rotate?: string, children?: React.ReactNode }) => (
    <div className={`break-inside-avoid mb-10 sm:mb-16 p-6 flex flex-col items-center justify-center transform ${rotate}`}>
        <div className="text-charcoal/20 mb-4 animate-[pulse_10s_ease-in-out_infinite]">
            {children}
        </div>
        {text && (
            <p className="text-3xl sm:text-4xl font-bold text-charcoal/60 text-center leading-tight drop-shadow-sm" style={{ fontFamily: 'var(--font-handwriting)' }}>
                {text}
            </p>
        )}
    </div>
);

// Ambient background vectors
const YarnSwirl = ({ top, left, scale = 1, flip = false, opacity = 0.3 }: { top: string, left: string, scale?: number, flip?: boolean, opacity?: number }) => (
    <svg className="absolute z-0 pointer-events-none text-rose" style={{ top, left, transform: `scale(${scale}) ${flip ? 'scaleX(-1)' : ''}`, opacity }} width="250" height="250" viewBox="0 0 250 250" fill="none">
        <path d="M22.5 155C-5.5 106 35 15 111.5 54.5C188 94 250 43.5 241 113.5C232 183.5 168.5 245 102 240.5C35.5 236 50.5 204 50.5 204" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 8" />
    </svg>
);

const SafetyPin = ({ top, left, rotate = 'rotate-0', scale = 1 }: { top: string, left: string, rotate?: string, scale?: number }) => (
    <div className={`absolute z-0 pointer-events-none text-zinc-400 opacity-60 ${rotate}`} style={{ top, left, transform: `scale(${scale})` }}>
        <svg width="24" height="60" viewBox="0 0 24 60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4 C16 4 18 7 18 10 L18 45 C18 50 14 54 12 54 C10 54 6 50 6 45 L6 10 C6 7 8 4 12 4 Z" />
            <circle cx="12" cy="50" r="4" />
            <path d="M8 12 L16 12" />
        </svg>
    </div>
);

export function ArtboardGallery({ products }: { products: Product[] }) {
    if (!products || products.length === 0) return null;

    // Grab up to 15 products to scatter on the artboard
    const artboardItems = products.slice(0, 15);

    // Rotations to make it feel delightfully imperfect
    const rotations = [
        '-rotate-3', 'rotate-2', '-rotate-2', 'rotate-4',
        '-rotate-4', 'rotate-1', '-rotate-3', 'rotate-3',
        '-rotate-1', 'rotate-2', '-rotate-5', 'rotate-5',
        'rotate-2', '-rotate-4', 'rotate-3'
    ];

    const pinColors = [
        'bg-rose', 'bg-babyblue', 'bg-mint', 'bg-melon',
        'bg-rose', 'bg-mint', 'bg-babyblue', 'bg-melon',
        'bg-mint', 'bg-rose', 'bg-melon', 'bg-babyblue',
        'bg-babyblue', 'bg-rose', 'bg-mint'
    ];

    return (
        <section className="py-20 sm:py-32 xl:py-40 relative overflow-hidden bg-[#faf8f5] border-y-2 border-dashed border-border/50">
            {/* Subtle graph paper pattern */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none z-0"
                style={{
                    backgroundImage: 'linear-gradient(#A98FBE 1px, transparent 1px), linear-gradient(90deg, #A98FBE 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Ambient Background Glows */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-babyblue/20 rounded-full blur-3xl z-0 pointer-events-none" />
            <div className="absolute bottom-40 right-10 w-80 h-80 bg-rose/20 rounded-full blur-3xl z-0 pointer-events-none" />

            {/* Background Texture Motifs */}
            <YarnSwirl top="5%" left="2%" scale={0.7} />
            <YarnSwirl top="60%" left="85%" scale={1.1} flip={true} opacity={0.4} />
            <YarnSwirl top="85%" left="5%" scale={0.9} opacity={0.2} />

            <SafetyPin top="15%" left="80%" rotate="-rotate-12" scale={1.2} />
            <SafetyPin top="45%" left="5%" rotate="rotate-45" scale={1.5} />
            <SafetyPin top="75%" left="90%" rotate="-rotate-45" scale={1.1} />

            <div className="layout-container relative z-20 max-w-7xl px-4 sm:px-6">
                {/* Header Title */}
                <div className="text-center mb-16 sm:mb-24 relative z-50 pointer-events-none">
                    <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-charcoal inline-block relative -rotate-1 drop-shadow-sm">
                        The Maker&apos;s Diary
                        <span className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 w-[110%] h-4 sm:h-6 bg-melon/30 rounded-full -z-10 rotate-2"></span>
                    </h2>
                    <p style={{ fontFamily: 'var(--font-handwriting)' }} className="text-charcoal/80 text-2xl sm:text-4xl mt-6 max-w-3xl mx-auto leading-relaxed transform rotate-1">
                        Welcome to my chaotic little mind map. Everything I make starts somewhere!
                    </p>
                </div>

                {/* --- MASONRY LAYOUT --- */}
                {/* 
                    Using columns to perfectly pack items without any overlaps or massive empty spaces.
                    The "chaos" is injected via element rotations within their cells.
                */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-6 sm:gap-10 pb-10">

                    {/* Introductory Note to anchor the top left column and explicitly fill that dreaded empty space */}
                    <PaperNote
                        text={<>Current obsession:<br /><span className="text-rose">Chunky Knits!</span> 💕</>}
                        rotate="-rotate-4"
                        color="text-charcoal"
                        tapeCol="bg-mint"
                    />

                    {artboardItems.map((product, idx) => {
                        const rot = rotations[idx % rotations.length];
                        const pinCol = pinColors[idx % pinColors.length];

                        return (
                            <React.Fragment key={`artboard-chaos-${product.id}-${idx}`}>

                                {/* Interleave Tactical Elements to eliminate visual gaps */}
                                {idx === 2 && (
                                    <DoodleBlock text="Stitch by stitch..." rotate="rotate-3">
                                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                            <polyline points="14 2 14 8 20 8" />
                                            <line x1="16" y1="13" x2="8" y2="13" />
                                            <line x1="16" y1="17" x2="8" y2="17" />
                                            <line x1="10" y1="9" x2="8" y2="9" />
                                        </svg>
                                    </DoodleBlock>
                                )}
                                {idx === 5 && (
                                    <PaperNote
                                        text="Note to self: Order more pastel yarn ASAP 🧶"
                                        rotate="-rotate-2"
                                        color="text-charcoal"
                                        tapeCol="bg-rose"
                                    />
                                )}
                                {idx === 9 && (
                                    <PaperNote
                                        text={<>My absolute favorite <br /> project yet</>}
                                        rotate="rotate-4"
                                        color="text-melon"
                                        tapeCol="bg-babyblue"
                                    />
                                )}
                                {idx === 12 && (
                                    <DoodleBlock text="Oops, dropped a stitch..." rotate="-rotate-4">
                                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M15 9l-6 6" />
                                            <path d="M9 9l6 6" />
                                        </svg>
                                    </DoodleBlock>
                                )}

                                {/* Standard Product Polaroid Frame */}
                                <div className="break-inside-avoid mb-10 sm:mb-16">
                                    <Link
                                        href={`/shop/${product.slug}`}
                                        className={`group block relative transition-transform duration-500 hover:z-[60] hover:scale-[1.08] ${rot} z-30`}
                                    >
                                        {/* The Push-Pin */}
                                        <div className={`absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-7 sm:h-7 rounded-full ${pinCol} border border-charcoal/10 shadow-[1px_4px_10px_rgba(169,143,190,0.25)] z-40 flex items-center justify-center`}>
                                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/70 -translate-y-[2px]" />
                                        </div>

                                        {/* Polaroid Frame */}
                                        <div className="bg-white p-2.5 sm:p-4 pb-10 sm:pb-16 shadow-[0_10px_20px_-5px_rgba(169,143,190,0.12)] group-hover:shadow-[0_25px_50px_-12px_rgba(169,143,190,0.4)] transition-shadow duration-500 border border-border/80 rounded-sm">
                                            <div className="relative w-full aspect-square bg-[#f5f5f5] overflow-hidden rounded-sm">
                                                <Image
                                                    src={product.images[0]}
                                                    alt={`Handmade crochet ${product.category}`}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-out"
                                                    sizes="(max-width: 768px) 50vw, 33vw"
                                                />
                                            </div>

                                            {/* Sale/Stock Sticker */}
                                            {product.stock <= 5 && product.stock > 0 && (
                                                <div className="absolute bottom-[10%] text-center -right-3 sm:-right-6 bg-charcoal text-white font-display font-bold text-[9px] sm:text-[11px] uppercase tracking-widest px-3 sm:px-4 py-3 sm:py-4 rounded-full shadow-lg rotate-[-15deg] transform group-hover:scale-110 group-hover:rotate-[-5deg] transition-transform z-20 whitespace-nowrap">
                                                    {product.stock} Left!
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
