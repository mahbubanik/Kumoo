"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { submitOrder, validatePromoCode } from "./actions";
import { Loader2, Tag, X } from "lucide-react";

export default function CartCheckoutPage() {
    const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCartStore();
    const [mounted, setMounted] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        area: "inside" as "inside" | "outside",
    });

    const [promoInput, setPromoInput] = useState("");
    const [activePromo, setActivePromo] = useState<{ code: string, discount: number } | null>(null);
    const [isValidatingPromo, setIsValidatingPromo] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen pt-36 pb-24 flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-border border-t-melon rounded-full animate-spin" />
            </div>
        );
    }

    const shippingCost = formData.area === "inside" ? 70 : 120;
    const subtotal = getCartTotal();
    const discountAmount = activePromo ? Math.round(subtotal * (activePromo.discount / 100)) : 0;
    const total = subtotal - discountAmount + shippingCost;

    const handleApplyPromo = async () => {
        if (!promoInput.trim()) return;
        setIsValidatingPromo(true);
        const res = await validatePromoCode(promoInput.trim());
        if (res.error) {
            alert(res.error);
        } else if (res.success && res.discount_percentage) {
            setActivePromo({
                code: promoInput.trim().toUpperCase(),
                discount: res.discount_percentage
            });
            setPromoInput("");
        }
        setIsValidatingPromo(false);
    };

    const handleAreaChange = (area: "inside" | "outside") => {
        setFormData((prev) => ({ ...prev, area }));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (items.length === 0) return;

        if (!formData.name || !formData.phone || !formData.address) {
            alert("Please fill in all delivery details.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Write to Supabase Ledger
            const result = await submitOrder({ ...formData, total }, items);

            if (result.error) {
                alert(result.error);
                setIsSubmitting(false);
                return;
            }

            // Construct WhatsApp Message
            const shortId = result.orderId!.split('-')[0].toUpperCase();
            let waText = `*New Order: #${shortId}*\n\n`;
            waText += `*Name:* ${formData.name}\n`;
            waText += `*Phone:* ${formData.phone}\n`;
            waText += `*Address:* ${formData.address}\n\n`;
            waText += `*Items:*\n`;
            items.forEach((item) => {
                waText += `- ${item.quantity}x ${item.name} (${item.price * item.quantity} ৳)\n`;
            });
            waText += `\n*Subtotal:* ${subtotal} ৳\n`;
            if (activePromo) {
                waText += `*Discount:* -${discountAmount} ৳ (${activePromo.code})\n`;
            }
            waText += `*Delivery:* ${shippingCost} ৳ (${formData.area})\n`;
            waText += `*Grand Total:* ${total} ৳\n\n`;
            waText += `Please confirm my order.`;

            const waUrl = `https://wa.me/8801700000000?text=${encodeURIComponent(waText)}`;

            clearCart();
            setIsSubmitting(false);

            // Redirect to WhatsApp
            window.location.href = waUrl;
        } catch {
            alert("An unexpected error occurred. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-44 pb-32 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-lilac/20 flex items-center justify-center mb-8">
                    <span className="w-2.5 h-2.5 rounded-full bg-charcoal/30"></span>
                </div>
                <h1 className="font-display font-bold text-2xl text-charcoal mb-3">Your bag is empty.</h1>
                <p className="text-charcoal/45 mb-8 font-medium text-sm">Let&apos;s find something soft to take home.</p>
                <Link href="/shop" className="btn-primary px-8">
                    Explore Collection
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] pt-36 lg:pt-44 pb-32">
            <div className="layout-container">
                <h1 className="font-display font-bold text-3xl lg:text-4xl text-charcoal mb-12">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Left: Checkout Form */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Delivery Details */}
                            <div className="space-y-5">
                                <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal/35 pb-4 border-b border-border">
                                    01. Delivery Details
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-[12px] font-bold text-charcoal/40">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            required
                                            placeholder="Jane Doe"
                                            className="input-fluid"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-[12px] font-bold text-charcoal/40">Phone Number</label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            required
                                            placeholder="01XXXXXXXXX"
                                            className="input-fluid"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="address" className="text-[12px] font-bold text-charcoal/40">Full Delivery Address</label>
                                    <textarea
                                        id="address"
                                        required
                                        placeholder="House 12, Road 4, Block C..."
                                        className="input-fluid min-h-[120px] resize-none"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Delivery Zone */}
                            <div className="space-y-5">
                                <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal/35 pb-4 border-b border-border">
                                    02. Delivery Zone
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { value: "inside" as const, label: "Inside Dhaka", price: "70 ৳", time: "2-3 days" },
                                        { value: "outside" as const, label: "Outside Dhaka", price: "120 ৳", time: "3-5 days" },
                                    ].map((zone) => (
                                        <label
                                            key={zone.value}
                                            className={`relative flex items-start p-5 rounded-[16px] border-2 cursor-pointer transition-all duration-200 ${formData.area === zone.value
                                                ? 'border-charcoal bg-vanilla'
                                                : 'border-border hover:border-charcoal/25'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="area"
                                                className="sr-only"
                                                checked={formData.area === zone.value}
                                                onChange={() => handleAreaChange(zone.value)}
                                            />
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-bold text-sm text-charcoal">{zone.label}</span>
                                                    <span className="font-bold text-sm text-charcoal">{zone.price}</span>
                                                </div>
                                                <span className="text-[12px] text-charcoal/40">Standard {zone.time} delivery</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* COD Notice */}
                            <div className="p-5 bg-mint/10 rounded-[16px] border border-mint/20">
                                <p className="text-[13px] text-charcoal/60 font-medium flex gap-2.5">
                                    <span className="shrink-0">💸</span>
                                    Payment is cash on delivery only.
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 bg-white border border-border rounded-[24px] p-7 lg:p-8 shadow-sm">
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal/35 mb-7">
                                Order Content
                            </h2>

                            <div className="space-y-5 mb-7 max-h-[380px] overflow-y-auto pr-3">
                                {items.map((item: { id: string; name: string; price: number; quantity: number; image: string; variant?: string }) => (
                                    <div key={`${item.id}-${item.variant || 'default'}`} className="flex gap-4">
                                        <div className="relative w-18 h-18 bg-canvas rounded-[12px] shrink-0 border border-border overflow-hidden" style={{ width: '72px', height: '72px' }}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                sizes="72px"
                                                className="object-contain p-1.5"
                                            />
                                        </div>
                                        <div className="flex flex-col flex-grow py-0.5 min-w-0">
                                            <div className="flex justify-between items-start gap-2 mb-1">
                                                <h3 className="font-display font-bold text-[13px] text-charcoal leading-snug truncate">{item.name}</h3>
                                                <span className="font-bold text-[13px] text-charcoal whitespace-nowrap">{item.price * item.quantity} ৳</span>
                                            </div>

                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center gap-2.5 bg-canvas border border-border rounded-full px-2.5 py-1 text-[12px]">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1), item.variant)}
                                                        className="text-charcoal/40 hover:text-charcoal transition-colors font-bold"
                                                    >–</button>
                                                    <span className="w-3 text-center text-charcoal font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                                                        className="text-charcoal/40 hover:text-charcoal transition-colors font-bold"
                                                    >+</button>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id, item.variant)}
                                                    className="text-[10px] font-bold uppercase tracking-[0.15em] text-charcoal/30 hover:text-rose transition-colors"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 pt-6 border-t border-border">
                                {/* Promo Input System */}
                                {!activePromo ? (
                                    <div className="flex gap-2 mb-4">
                                        <input
                                            type="text"
                                            placeholder="Discount Code"
                                            className="input-fluid flex-grow uppercase"
                                            value={promoInput}
                                            onChange={(e) => setPromoInput(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleApplyPromo}
                                            disabled={isValidatingPromo || !promoInput.trim()}
                                            className="btn-secondary px-4 shrink-0"
                                        >
                                            {isValidatingPromo ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between p-3 bg-mint/10 border border-mint/20 rounded-xl mb-4">
                                        <div className="flex items-center gap-2 text-mint font-bold text-[13px]">
                                            <Tag className="w-4 h-4" />
                                            {activePromo.code} applied (-{activePromo.discount}%)
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setActivePromo(null)}
                                            className="text-mint hover:text-rose transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                <div className="flex justify-between text-charcoal/45 text-[13px] font-medium">
                                    <span>Subtotal</span>
                                    <span>{subtotal} ৳</span>
                                </div>
                                {activePromo && (
                                    <div className="flex justify-between text-mint text-[13px] font-bold">
                                        <span>Discount</span>
                                        <span>-{discountAmount} ৳</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-charcoal/45 text-[13px] font-medium">
                                    <span>Delivery ({formData.area})</span>
                                    <span>{shippingCost} ৳</span>
                                </div>
                                <div className="flex justify-between text-charcoal text-lg font-display font-bold pt-3 mt-3 border-t border-border">
                                    <span>Total</span>
                                    <span>{total} ৳</span>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                onClick={handleSubmit}
                                className={`w-full bg-charcoal text-white font-display font-bold text-[15px] py-4 rounded-full mt-7 transition-all duration-300 hover:bg-[#4a4152] hover:-translate-y-0.5 flex items-center justify-center gap-2.5 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                disabled={isSubmitting}
                                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin"></span>
                                        Processing...
                                    </>
                                ) : (
                                    "Confirm Order"
                                )}
                            </button>
                            <p className="text-center text-charcoal/25 text-[11px] mt-4 font-medium tracking-wide">
                                By ordering, you agree to wait patiently for your artisan craft.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
