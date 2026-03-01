import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: "Custom Orders | Kumoo Studio",
    description: "Request custom artisan crochet commissions.",
};

export default function CustomOrdersPage() {
    return (
        <div className="min-h-screen pt-44 pb-32 flex flex-col items-center justify-center text-center px-4 relative">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-melon/10 rounded-full blur-3xl -z-10" />

            <span className="inline-block px-4 py-1.5 bg-white text-melon font-display font-bold text-[11px] uppercase tracking-widest rounded-full shadow-sm mb-6 border-[1.5px] border-melon/20">
                Open for Commissions
            </span>
            <h1 className="font-display font-bold text-4xl lg:text-5xl text-charcoal mb-6 tracking-tight">Custom Orders</h1>
            <p className="text-charcoal/70 mb-10 max-w-lg mx-auto font-medium text-lg leading-relaxed">
                Got a wild idea? We&apos;d love to bring it to life! Custom crochet commissions are currently open. Reach out to us directly to discuss your vision, sizing, and colors.
            </p>

            <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}?text=Inquiry:%20Custom%20Commission`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-10 py-5 text-lg"
            >
                Message on WhatsApp
            </a>

            <Link href="/shop" className="mt-12 text-charcoal/40 font-bold text-[12px] uppercase tracking-[0.2em] hover:text-charcoal transition-colors border-b-2 border-transparent hover:border-charcoal pb-1">
                Explore Pre-made Collection
            </Link>
        </div>
    );
}
