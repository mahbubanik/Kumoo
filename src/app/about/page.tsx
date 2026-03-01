import React from "react";
import Link from "next/link";

export const metadata = {
    title: "About | Kumoo Studio",
    description: "The studio behind the softness — handcrafted crochet plushies, bags, and accessories made in Dhaka.",
};

export default function AboutPage() {
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
                <div className="text-center mb-16 sm:mb-20">
                    <h1 className="font-display font-bold text-charcoal mb-4">
                        About Kumoo
                    </h1>
                    <p className="text-charcoal/50 text-base max-w-md mx-auto font-medium leading-relaxed">
                        The studio behind the softness.
                    </p>
                </div>

                {/* Story */}
                <div className="max-w-2xl mx-auto space-y-10">
                    <section>
                        <h2 className="font-display font-bold text-charcoal mb-4 text-xl sm:text-2xl">
                            Our Story
                        </h2>
                        <p className="font-body text-charcoal/70 text-base leading-relaxed font-medium">
                            Kumoo started as a quiet hobby - a single crochet hook, a ball of yarn, and a desire
                            to create something soft and meaningful. What began as gifts for friends slowly grew
                            into a small studio dedicated to handcrafted plushies, bags, and accessories.
                        </p>
                        <p className="font-body text-charcoal/70 text-base leading-relaxed font-medium">
                            Every piece is made by hand in Dhaka, Bangladesh. No machines, no mass production -
                            just deliberate patience and premium yarn.
                        </p>
                    </section>

                    <hr className="border-border/40 max-w-xs mx-auto" />

                    <section>
                        <h2 className="font-display font-bold text-charcoal mb-4 text-xl sm:text-2xl">
                            What We Believe
                        </h2>
                        <div className="space-y-4">
                            {[
                                { emoji: "🧶", title: "Craft Over Speed", desc: "Each piece takes hours of careful stitching. We never rush." },
                                { emoji: "💖", title: "Made With Love", desc: "Every plushie carries intentional detail - from blush marks to tiny accessories." },
                                { emoji: "🌿", title: "Premium Materials", desc: "We use only soft, durable yarn that's safe and long-lasting." },
                            ].map((value) => (
                                <div key={value.title} className="flex gap-4 items-start p-5 bg-vanilla border-[1.5px] border-border rounded-[20px]">
                                    <span className="text-2xl flex-shrink-0 mt-0.5">{value.emoji}</span>
                                    <div>
                                        <h3 className="font-display font-bold text-charcoal text-base mb-1">{value.title}</h3>
                                        <p className="font-body text-charcoal/60 text-sm leading-relaxed font-medium mb-0">{value.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <hr className="border-border/40 max-w-xs mx-auto" />

                    {/* CTA */}
                    <section className="text-center py-8">
                        <h2 className="font-display font-bold text-charcoal mb-3 text-xl sm:text-2xl">
                            Want something custom?
                        </h2>
                        <p className="font-body text-charcoal/60 text-sm mb-8 max-w-sm mx-auto font-medium">
                            We love bringing your ideas to life. Send us a message and let&apos;s create something special together.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                            <Link href="/shop" className="btn-primary text-center px-8">
                                Browse Collection
                            </Link>
                            <a
                                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}?text=Hi!%20I%27d%20love%20to%20know%20more%20about%20Kumoo.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary text-center px-8"
                            >
                                Contact Studio
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
