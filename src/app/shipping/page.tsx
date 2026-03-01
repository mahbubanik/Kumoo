import React from "react";
import { DELIVERY_ZONES } from "@/lib/config";

export const metadata = {
    title: "Shipping & Delivery | Kumoo Studio",
    description: "Delivery zones, shipping costs, and estimated delivery times for Kumoo handcrafted products across Bangladesh.",
};

export default function ShippingPage() {
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
                        Shipping & Delivery
                    </h1>
                    <p className="text-charcoal/50 text-base max-w-md mx-auto font-medium leading-relaxed">
                        How your new soft companions travel from our studio to your doorstep.
                    </p>
                </div>

                {/* Shipping Info Content */}
                <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 line-height-relaxed">

                    {/* Zones */}
                    <div className="bg-[#F2CDCD]/20 border-[1.5px] border-[#F2CDCD]/40 rounded-[32px] p-8 md:p-10">
                        <div className="w-12 h-12 rounded-full bg-white mb-6 flex items-center justify-center shadow-sm">
                            <span className="text-2xl">🛵</span>
                        </div>
                        <h2 className="font-display font-bold text-2xl text-charcoal mb-4">Inside Dhaka</h2>
                        <ul className="space-y-4 font-body text-charcoal/70 font-medium text-base">
                            <li className="flex justify-between items-center border-b border-charcoal/10 pb-3">
                                <span>Delivery Time</span>
                                <span className="text-charcoal font-bold">{DELIVERY_ZONES.inside.eta}</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-charcoal/10 pb-3">
                                <span>Delivery Charge</span>
                                <span className="text-charcoal font-bold">{DELIVERY_ZONES.inside.fee} BDT</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span>Payment Method</span>
                                <span className="text-charcoal font-bold text-right">Cash on Delivery<br />bKash</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[#E5DEF7]/20 border-[1.5px] border-[#E5DEF7]/40 rounded-[32px] p-8 md:p-10">
                        <div className="w-12 h-12 rounded-full bg-white mb-6 flex items-center justify-center shadow-sm">
                            <span className="text-2xl">🚚</span>
                        </div>
                        <h2 className="font-display font-bold text-2xl text-charcoal mb-4">Outside Dhaka</h2>
                        <ul className="space-y-4 font-body text-charcoal/70 font-medium text-base">
                            <li className="flex justify-between items-center border-b border-charcoal/10 pb-3">
                                <span>Delivery Time</span>
                                <span className="text-charcoal font-bold">{DELIVERY_ZONES.outside.eta}</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-charcoal/10 pb-3">
                                <span>Delivery Charge</span>
                                <span className="text-charcoal font-bold">{DELIVERY_ZONES.outside.fee} BDT</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span>Payment Method</span>
                                <span className="text-charcoal font-bold text-right">Advance Payment<br />Required</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto mt-12 bg-vanilla rounded-[28px] p-8 border-[1.5px] border-border shadow-sm">
                    <h3 className="font-display font-bold text-lg text-charcoal mb-3 flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        Important Note on Dispatch
                    </h3>
                    <p className="font-body text-charcoal/70 text-base leading-relaxed font-medium mb-0">
                        The delivery times listed above apply from the day of dispatch. Because our items are meticulously handcrafted, please allow for a <span className="text-charcoal font-bold">crafting period</span> before shipping. In-stock items ship within 2 days, while made-to-order or custom items may take 7–14 days to craft before dispatch.
                    </p>
                </div>
            </div>
        </div>
    );
}
