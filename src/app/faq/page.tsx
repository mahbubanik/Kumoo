import React from "react";

export default function FAQPage() {
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

            <div className="layout-container relative z-10 pt-36 sm:pt-44 pb-32">
                {/* Header */}
                <div className="mb-16 sm:mb-20 text-center">
                    <h1 className="font-display font-bold text-3xl sm:text-4xl text-charcoal mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-charcoal/50 text-base max-w-md mx-auto font-medium leading-relaxed">
                        Everything you need to know about our handcrafted process and policies.
                    </p>
                </div>

                {/* FAQ Content */}
                <div className="max-w-2xl mx-auto space-y-8">
                    {[
                        {
                            q: "What materials do you use?",
                            a: "We exclusively use premium, ultra-soft chenille and cotton blend yarns. Our stuffing is hypoallergenic polyester fiberfill, ensuring our plushies are safe, squishy, and hold their shape for years."
                        },
                        {
                            q: "How long does a custom order take?",
                            a: "Since every piece is crafted by hand, custom orders generally take 7–14 days depending on the complexity of the design and our current waitlist. We will give you a specific timeline when you place your commission."
                        },
                        {
                            q: "Are the plushies safe for babies?",
                            a: "While we use safety eyes (which are securely fastened), we recommend our plushies for ages 3 and up as an extra precaution. If you need a baby-safe plushie, let us know, and we can embroider the eyes instead!"
                        },
                        {
                            q: "Do you accept returns?",
                            a: "Because all items are made to order, we do not accept returns or exchanges. However, if there is a defect or issue with your order upon arrival, please contact us within 48 hours of delivery, and we will make it right."
                        },
                        {
                            q: "How should I wash my crochet items?",
                            a: "Spot cleaning with mild soap and cold water is best. If a full wash is necessary, place the item in a mesh laundry bag and wash on a delicate, cold cycle. Air dry completely — never tumble dry."
                        }
                    ].map((faq, i) => (
                        <div key={i} className="bg-white rounded-[28px] p-8 border-[1.5px] border-border shadow-sm">
                            <h3 className="font-display font-bold text-lg text-charcoal mb-3">{faq.q}</h3>
                            <p className="font-body text-charcoal/70 text-base leading-relaxed font-medium mb-0">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-20 text-center">
                    <p className="font-body text-charcoal/60 text-base mb-6 font-medium">
                        Still have questions? We&apos;d love to help.
                    </p>
                    <a
                        href="https://wa.me/8801XXXXXXXXX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                    >
                        Message us on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
}
