import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | Kumoo",
    description: "Our privacy policy and data handling practices at Kumoo.",
};

const colorMap: Record<string, { bg: string; text: string }> = {
    babyblue: { bg: "bg-babyblue/15", text: "text-babyblue" },
    mint: { bg: "bg-mint/15", text: "text-mint" },
    rose: { bg: "bg-rose/15", text: "text-rose" },
    lilac: { bg: "bg-lilac/15", text: "text-lilac" },
    melon: { bg: "bg-melon/15", text: "text-melon" },
};

const sections = [
    {
        num: "01",
        title: "Information We Collect",
        color: "babyblue",
        content: (
            <>
                <p>
                    When you visit Kumoo, we automatically collect certain information about your device, including your web browser type, IP address, time zone, and some cookies installed on your device.
                </p>
                <p className="mt-3">
                    When you make a purchase or attempt to make a purchase, we collect your name, shipping address, payment information (processed securely through our payment providers), and phone number. We refer to this as &quot;Order Information.&quot;
                </p>
            </>
        ),
    },
    {
        num: "02",
        title: "How We Use Your Information",
        color: "mint",
        content: (
            <>
                <p>
                    We use Order Information to fulfill orders placed through the Site, including processing payments, arranging shipping, and providing order confirmations.
                </p>
                <ul className="mt-3 space-y-2">
                    <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-mint mt-2 shrink-0" />
                        <span>Communicate with you about your order status</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-mint mt-2 shrink-0" />
                        <span>Screen orders for potential risk or fraud</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-mint mt-2 shrink-0" />
                        <span>Provide relevant information about our products when you&apos;ve opted in</span>
                    </li>
                </ul>
            </>
        ),
    },
    {
        num: "03",
        title: "Sharing Your Personal Information",
        color: "rose",
        content: (
            <>
                <p>
                    We share your Personal Information with third-party services that help us operate. We use Supabase for database and authentication - you can read their privacy policy at{" "}
                    <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-melon hover:text-lilac underline underline-offset-2 transition-colors">
                        supabase.com/privacy
                    </a>.
                </p>
                <p className="mt-3">
                    We may also share your information to comply with applicable laws and regulations, or to respond to a lawful request for information.
                </p>
            </>
        ),
    },
    {
        num: "04",
        title: "Data Retention & Your Rights",
        color: "lilac",
        content: (
            <p>
                We maintain your Order Information unless you ask us to delete it. European residents have the right to access, correct, update, or delete personal information we hold. To exercise this right, please contact us through our{" "}
                <Link href="/contact" className="text-melon hover:text-lilac underline underline-offset-2 transition-colors">
                    contact page
                </Link>.
            </p>
        ),
    },
    {
        num: "05",
        title: "Contact Us",
        color: "melon",
        content: (
            <p>
                For questions about our privacy practices or to make a complaint, please visit our{" "}
                <Link href="/contact" className="text-melon hover:text-lilac underline underline-offset-2 transition-colors">
                    Contact Page
                </Link>{" "}
                or message us directly on WhatsApp.
            </p>
        ),
    },
];

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-vanilla">

            <main className="layout-container relative z-10 pt-36 sm:pt-44 pb-24">
                <div className="max-w-3xl mx-auto">

                    {/* Header */}
                    <div className="mb-14">
                        <span className="inline-block px-4 py-1.5 bg-white text-charcoal/50 font-display font-bold text-[11px] uppercase tracking-[0.2em] rounded-full shadow-sm mb-5 border-[1.5px] border-border">
                            Legal
                        </span>
                        <h1 className="font-display font-bold text-4xl lg:text-5xl text-charcoal mb-4 tracking-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-charcoal/40 font-medium text-sm">
                            Last Updated: February 2026
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-5">
                        {sections.map((section) => (
                            <section
                                key={section.num}
                                className="bg-white rounded-[24px] border-[1.5px] border-border p-7 sm:p-8 shadow-sm hover:shadow-md transition-shadow group"
                            >
                                <div className="flex items-start gap-4 sm:gap-5">
                                    {/* Section Number */}
                                    <div
                                        className={`w-10 h-10 rounded-xl ${colorMap[section.color].bg} flex items-center justify-center shrink-0 mt-0.5`}
                                    >
                                        <span className={`${colorMap[section.color].text} font-display font-bold text-sm`}>
                                            {section.num}
                                        </span>
                                    </div>

                                    {/* Section Content */}
                                    <div className="min-w-0">
                                        <h2 className="font-display font-bold text-xl text-charcoal mb-3 group-hover:text-charcoal transition-colors">
                                            {section.title}
                                        </h2>
                                        <div className="text-charcoal/65 font-body font-medium text-[15px] leading-relaxed">
                                            {section.content}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <div className="mt-12 text-center">
                        <p className="text-charcoal/30 text-xs font-bold uppercase tracking-[0.2em]">
                            Kumoo Studio &middot; Dhaka, Bangladesh
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
