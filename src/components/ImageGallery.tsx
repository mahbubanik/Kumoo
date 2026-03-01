"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface ImageGalleryProps {
    images: string[];
    alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
    const [displayImages, setDisplayImages] = useState<string[]>(images && images.length > 0 ? images : ["/placeholder.png"]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    const totalImages = displayImages.length;
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
            {/* Main Gallery Area */}
            <div
                className="relative group w-full"
                onMouseEnter={() => { stopAutoPlay(); setIsPaused(true); }}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Sideways Scrollable Frame - bg-vanilla, 28px radius, with Spotlight Padding */}
                <div
                    ref={scrollRef}
                    className="relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-tactile flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
                >
                    {displayImages.map((src, i) => (
                        <div
                            key={i}
                            className="relative min-w-full h-full snap-start flex items-center justify-center transition-transform duration-500"
                        >
                            <div className="relative w-full h-full cursor-zoom-in" onClick={() => setIsZoomed(true)}>
                                <Image
                                    src={src}
                                    alt={`${alt} — view ${i + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 500px"
                                    className="object-cover transition-transform duration-700 ease-in-out"
                                    priority={i === 0}
                                    unoptimized
                                    onError={() => {
                                        const newImages = [...displayImages];
                                        newImages[i] = "/placeholder.png";
                                        setDisplayImages(newImages);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dot Indicators - Consolidated to bottom center */}
                {hasMultiple && (
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10 pointer-events-none">
                        {displayImages.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); goTo(i); }}
                                className={`w-2 h-2 rounded-full transition-all duration-300 pointer-events-auto ${i === currentIndex
                                    ? "bg-melon scale-125 shadow-sm"
                                    : "bg-white/40 border border-charcoal/10 hover:bg-white/60"
                                    }`}
                                aria-label={`Go to image ${i + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Thumbnail strip - Sideways scrollable as well */}
            {hasMultiple && (
                <div className="flex gap-4 mt-6 overflow-x-auto no-scrollbar pb-2">
                    {displayImages.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`relative w-20 h-20 flex-shrink-0 rounded-[12px] overflow-hidden border-2 transition-all duration-300 ${i === currentIndex
                                ? "border-melon shadow-sm"
                                : "border-border/50 opacity-60 hover:opacity-100"
                                }`}
                        >
                            <Image
                                src={src}
                                alt={`${alt} thumbnail ${i + 1}`}
                                fill
                                sizes="80px"
                                className="object-cover"
                                unoptimized
                                onError={() => {
                                    const newImages = [...displayImages];
                                    newImages[i] = "/placeholder.png";
                                    setDisplayImages(newImages);
                                }}
                            />
                        </button>
                    ))}
                </div>
            )}

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
                            className="w-full h-full overflow-hidden rounded-[28px] border-[1.5px] border-white/20"
                        >
                            <Image
                                src={displayImages[currentIndex]}
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
                            {displayImages.map((_, i) => (
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
