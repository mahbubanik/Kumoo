"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface ImageGalleryProps {
    images: string[];
    alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    const totalImages = images.length;
    const hasMultiple = totalImages > 1;

    // Auto-slide every 4 seconds
    const startAutoPlay = useCallback(() => {
        if (!hasMultiple || isPaused) return;
        autoPlayRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalImages);
        }, 4000);
    }, [hasMultiple, isPaused, totalImages]);

    const stopAutoPlay = useCallback(() => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    }, []);

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, [startAutoPlay, stopAutoPlay]);

    // Scroll to current image
    useEffect(() => {
        if (scrollRef.current) {
            const target = scrollRef.current.children[currentIndex] as HTMLElement;
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
            }
        }
    }, [currentIndex]);

    const goTo = (index: number) => {
        setCurrentIndex(index);
        stopAutoPlay();
        setIsPaused(true);
        // Resume after 8 seconds of inactivity
        setTimeout(() => setIsPaused(false), 8000);
    };

    const goPrev = () => goTo((currentIndex - 1 + totalImages) % totalImages);
    const goNext = () => goTo((currentIndex + 1) % totalImages);

    // Zoom handler
    const handleZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({ x, y });
    };

    return (
        <>
            {/* Main Gallery */}
            <div
                className="relative group"
                onMouseEnter={() => { stopAutoPlay(); setIsPaused(true); }}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Image Strip */}
                <div
                    ref={scrollRef}
                    className="relative aspect-[4/5] bg-vanilla border-2 border-border rounded-[32px] overflow-hidden"
                >
                    {images.map((src, i) => (
                        <div
                            key={i}
                            className="absolute inset-0 transition-opacity duration-500 ease-in-out cursor-zoom-in"
                            style={{ opacity: i === currentIndex ? 1 : 0 }}
                            onClick={() => setIsZoomed(true)}
                        >
                            <Image
                                src={src}
                                alt={`${alt} — view ${i + 1}`}
                                fill
                                sizes="(max-width: 1024px) 100vw, 58vw"
                                className="object-cover"
                                priority={i === 0}
                            />
                        </div>
                    ))}

                    {/* Arrow controls (show on hover) */}
                    {hasMultiple && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white z-10"
                                aria-label="Previous image"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#332C39" strokeWidth="2.5">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); goNext(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white z-10"
                                aria-label="Next image"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#332C39" strokeWidth="2.5">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Zoom hint */}
                    <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 text-[11px] font-bold text-charcoal/50 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="11" y1="8" x2="11" y2="14" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        Zoom
                    </div>
                </div>

                {/* Dot Indicators */}
                {hasMultiple && (
                    <div className="flex justify-center gap-2 mt-4">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentIndex
                                    ? "bg-melon scale-110"
                                    : "bg-border hover:bg-charcoal/30"
                                    }`}
                                aria-label={`Go to image ${i + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Thumbnail strip */}
                {hasMultiple && (
                    <div className="flex gap-3 mt-4">
                        {images.map((src, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${i === currentIndex
                                    ? "border-melon shadow-sm"
                                    : "border-border/50 opacity-60 hover:opacity-100"
                                    }`}
                            >
                                <Image
                                    src={src}
                                    alt={`${alt} thumbnail ${i + 1}`}
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Zoom Modal */}
            {isZoomed && (
                <div
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center cursor-zoom-out"
                    onClick={() => setIsZoomed(false)}
                >
                    {/* Close button */}
                    <button
                        onClick={() => setIsZoomed(false)}
                        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[100]"
                        aria-label="Close zoom"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {/* Zoomable image */}
                    <div
                        className="relative w-[90vw] h-[90vh] cursor-crosshair"
                        onMouseMove={handleZoomMove}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="w-full h-full overflow-hidden rounded-2xl"
                        >
                            <Image
                                src={images[currentIndex]}
                                alt="Zoomed view"
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-75 ease-out"
                                style={{
                                    transform: 'scale(2.5)',
                                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Modal arrows */}
                    {hasMultiple && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[100]"
                                aria-label="Previous"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); goNext(); }}
                                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[100]"
                                aria-label="Next"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Modal dots */}
                    {hasMultiple && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-[100]">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => { e.stopPropagation(); goTo(i); }}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex
                                        ? "bg-white scale-110"
                                        : "bg-white/40 hover:bg-white/60"
                                        }`}
                                    aria-label={`Go to image ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
