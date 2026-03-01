import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: "Contact Us | Kumoo Studio",
    description: "Get in touch with Kumoo Studio.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-44 pb-32 flex flex-col items-center justify-center text-center px-4 relative">
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-babyblue/10 rounded-full blur-3xl -z-10" />

            <div className="w-16 h-16 rounded-full bg-canvas border-[1.5px] border-border flex items-center justify-center mb-8 shadow-sm text-2xl">
                👋
            </div>

            <h1 className="font-display font-bold text-4xl lg:text-5xl text-charcoal mb-6 tracking-tight">Say Hello</h1>
            <p className="text-charcoal/60 text-base max-w-lg mx-auto font-medium">
                Have a question, custom request, or just want to say hi? We&apos;d love to hear from you.
            </p>

            <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}?text=Inquiry:%20General`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-10 py-5 text-lg"
            >
                Message on WhatsApp
            </a>

            <Link href="/" className="mt-12 text-charcoal/40 font-bold text-[12px] uppercase tracking-[0.2em] hover:text-charcoal transition-colors border-b-2 border-transparent hover:border-charcoal pb-1">
                Return Home
            </Link>
        </div>
    );
}
