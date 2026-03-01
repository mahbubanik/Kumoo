"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { submitOrder, validatePromoCode } from "./actions";
import { useRouter } from "next/navigation";
import { Loader2, Tag, X } from "lucide-react";
import { toast } from "sonner";
import { DELIVERY_ZONES } from "@/lib/config";

export default function CartCheckoutPage() {
    const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCartStore();
    const router = useRouter();
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

    const shippingCost = DELIVERY_ZONES[formData.area].fee;
    const subtotal = getCartTotal();
    const discountAmount = activePromo ? Math.round(subtotal * (activePromo.discount / 100)) : 0;
    const total = subtotal - discountAmount + shippingCost;

    const handleApplyPromo = async () => {
        if (!promoInput.trim()) return;
        setIsValidatingPromo(true);
        const res = await validatePromoCode(promoInput.trim());
        if (res.error) {
            toast.error(res.error);
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
            toast.error("Please fill in all delivery details.");
            return;
        }

        // Validate Bangladesh phone number
        const phoneRegex = /^01[3-9]\d{8}$/;
        if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
            toast.error("Please enter a valid Bangladesh phone number (e.g., 01XXXXXXXXX).");
            return;
        }

        setIsSubmitting(true);

        try {
            // Write to Supabase Ledger
            const result = await submitOrder({ ...formData, total }, items, activePromo?.code);

            if (result.error) {
                toast.error(result.error);
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

            const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
            const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

            clearCart();
            setIsSubmitting(false);

            // Redirect to Success Page instead of directly to WhatsApp
            const firstItemImage = items[0]?.image || "";
            router.push(`/success?id=${result.orderId}&wa=${encodeURIComponent(waUrl)}&img=${encodeURIComponent(firstItemImage)}`);
        } catch {
            toast.error("An unexpected error occurred. Please try again.");
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

                    {/* Left & Top (Mobile): Review Your Cart */}
                    <div className="lg:col-span-7 flex flex-col pt-2">
                        <div className="mb-6 border-b border-border pb-4 flex items-center justify-between">
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal/35">
                                Review Your Cart
                            </h2>
                            <span className="text-[13px] font-bold text-charcoal">{items.length} {items.length === 1 ? 'Item' : 'Items'}</span>
                        </div>

                        <div className="space-y-6 mb-8 pr-2 lg:pr-6">
                            {items.map((item: { id: string; name: string; price: number; quantity: number; image: string; size?: string; color?: string; colorHex?: string }) => (
                                <div key={`${item.id}-${item.size || 'na'}-${item.color || 'na'}`} className="flex flex-col sm:flex-row gap-5 p-4 rounded-[28px] bg-white border-[1.5px] border-border hover:border-melon transition-colors duration-300">
                                    <div className="relative w-28 h-28 sm:w-[120px] sm:h-[120px] bg-vanilla rounded-[24px] shrink-0 border-[1.5px] border-border overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="120px"
                                            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-grow py-1 min-w-0">
                                        <div className="flex justify-between items-start gap-4 mb-2">
                                            <div>
                                                <h3 className="font-display font-bold text-[16px] sm:text-[18px] text-charcoal leading-snug">
                                                    {item.name}
                                                </h3>
                                                {(item.size || item.color) && (
                                                    <span className="block text-[12px] font-body font-medium text-charcoal/50 mt-1">
                                                        {item.size} {item.size && item.color ? '·' : ''} {item.color}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="font-bold text-[15px] text-charcoal whitespace-nowrap">{item.price * item.quantity} ৳</span>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto pt-4 sm:pt-0">
                                            <div className="flex items-center gap-3 bg-vanilla border-[1.5px] border-border rounded-full px-3 py-1.5 text-[14px]">
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.size, item.color)}
                                                    className="text-charcoal/40 hover:text-melon transition-colors font-bold w-5 flex items-center justify-center"
                                                >–</button>
                                                <span className="w-5 text-center text-charcoal font-bold">{item.quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                                                    className="text-charcoal/40 hover:text-melon transition-colors font-bold w-5 flex items-center justify-center"
                                                >+</button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.id, item.size, item.color)}
                                                className="text-[12px] font-bold uppercase tracking-[0.15em] text-charcoal/30 hover:text-rose transition-colors flex items-center gap-1.5"
                                            >
                                                <X className="w-3.5 h-3.5" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right & Bottom (Mobile): Customer Details, Totals, Actions */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 flex flex-col gap-6">

                            {/* Customer Form Card */}
                            <div className="bg-white border-[1.5px] border-border rounded-[32px] p-6 lg:p-10 shadow-sm transition-all duration-500 hover:border-border/80">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Delivery Details */}
                                    <div className="space-y-5">
                                        <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal/35 pb-4 border-b border-border">
                                            Customer Details
                                        </h2>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5 flex flex-col">
                                                <label htmlFor="name" className="text-[12px] font-bold text-charcoal/50">Full Name</label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    required
                                                    placeholder="Jane Doe"
                                                    className="input-clean bg-canvas"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-1.5 flex flex-col">
                                                <label htmlFor="phone" className="text-[12px] font-bold text-charcoal/50">Phone Number</label>
                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    required
                                                    placeholder="01XXXXXXXXX"
                                                    className="input-clean bg-canvas"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5 flex flex-col">
                                            <label htmlFor="address" className="text-[12px] font-bold text-charcoal/50">Full Delivery Address</label>
                                            <textarea
                                                id="address"
                                                required
                                                placeholder="House 12, Road 4, Block C..."
                                                className="input-clean bg-canvas min-h-[90px] resize-none"
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Delivery Zone */}
                                    <div className="space-y-4">
                                        <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal/35 pb-3 border-b border-border">
                                            Delivery Zone
                                        </h2>
                                        <div className="flex flex-col gap-3">
                                            {[
                                                { value: "inside" as const, label: DELIVERY_ZONES.inside.label, price: `${DELIVERY_ZONES.inside.fee} ৳`, time: DELIVERY_ZONES.inside.eta },
                                                { value: "outside" as const, label: DELIVERY_ZONES.outside.label, price: `${DELIVERY_ZONES.outside.fee} ৳`, time: DELIVERY_ZONES.outside.eta },
                                            ].map((zone) => (
                                                <label
                                                    key={zone.value}
                                                    className={`relative flex items-center p-4 rounded-[20px] border-[1.5px] cursor-pointer transition-all duration-300 ${formData.area === zone.value
                                                        ? 'border-melon bg-vanilla shadow-sm'
                                                        : 'border-border bg-canvas hover:border-melon/50'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="area"
                                                        className="sr-only"
                                                        checked={formData.area === zone.value}
                                                        onChange={() => handleAreaChange(zone.value)}
                                                    />
                                                    <div className="flex-grow flex justify-between items-center">
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-[14px] text-charcoal">{zone.label}</span>
                                                            <span className="text-[12px] text-charcoal/50">Est. {zone.time}</span>
                                                        </div>
                                                        <span className="font-bold text-[14px] text-charcoal">{zone.price}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* COD Notice */}
                                    <div className="p-4 bg-mint/10 rounded-[12px] border border-mint/20 flex items-center gap-3">
                                        <span className="text-xl">💸</span>
                                        <p className="text-[12px] text-charcoal/70 font-medium">
                                            Payment is cash on delivery only.
                                        </p>
                                    </div>
                                </form>
                            </div>

                            {/* Order Summary & Actions Card */}
                            <div className="bg-vanilla border-[1.5px] border-border rounded-[32px] p-6 lg:p-10 shadow-sm transition-all duration-500 hover:border-melon/50">
                                {/* Promo Input System */}
                                <div className="mb-8">
                                    {!activePromo ? (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Gift or Promo Code"
                                                className="input-clean bg-white flex-grow uppercase text-[13px]"
                                                value={promoInput}
                                                onChange={(e) => setPromoInput(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleApplyPromo}
                                                disabled={isValidatingPromo || !promoInput.trim()}
                                                className="btn-secondary px-5 shrink-0 bg-white hover:bg-white"
                                            >
                                                {isValidatingPromo ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between p-3 bg-mint/10 border-2 border-charcoal rounded-xl bg-white shadow-sm">
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
                                </div>

                                <div className="space-y-4 pt-6 border-t-[1.5px] border-border/60">
                                    <div className="flex justify-between text-charcoal/60 text-[14px] font-medium">
                                        <span>Subtotal</span>
                                        <span>{subtotal} ৳</span>
                                    </div>
                                    {activePromo && (
                                        <div className="flex justify-between text-mint text-[14px] font-bold">
                                            <span>Discount</span>
                                            <span>-{discountAmount} ৳</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-charcoal/60 text-[14px] font-medium">
                                        <span>Delivery ({formData.area})</span>
                                        <span>{shippingCost} ৳</span>
                                    </div>
                                    <div className="flex justify-between text-charcoal text-[22px] font-display font-bold pt-5 mt-5 border-t-[1.5px] border-border">
                                        <span>Total</span>
                                        <span className="text-melon">{total} ৳</span>
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    onClick={handleSubmit}
                                    className={`w-full bg-melon text-white font-display font-bold text-[16px] py-4 rounded-full mt-10 transition-all duration-300 hover:bg-[#8C73A1] flex items-center justify-center gap-2.5 shadow-tactile hover:-translate-y-1 hover:shadow-tactile-hover ${isSubmitting ? 'opacity-70 cursor-not-allowed transform-none shadow-none' : ''}`}
                                    disabled={isSubmitting}
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
                                <p className="text-center text-charcoal/40 text-[11px] mt-5 font-bold tracking-wide uppercase">
                                    Awaiting your soft surprise
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
