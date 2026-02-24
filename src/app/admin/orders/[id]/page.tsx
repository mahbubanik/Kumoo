import React from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Package, CreditCard, Clock } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { OrderStatusSelector } from "./OrderStatusSelector";

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();

    // 1. Fetch Order
    const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", params.id)
        .single();

    if (orderError || !order) {
        notFound();
    }

    // 2. Fetch Order Items (with joined product data)
    const { data: orderItems } = await supabase
        .from("order_items")
        .select("*, products(name, price)")
        .eq("order_id", params.id);

    const date = new Date(order.created_at).toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: 'numeric', hour12: true
    });

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/orders" className="p-2 hover:bg-os-border rounded-full transition-colors text-os-text-muted hover:text-os-primary">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="font-display font-bold text-2xl text-os-primary">Order {order.id.split('-')[0].toUpperCase()}</h1>
                            {order.status === 'pending' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-os-danger/10 text-os-danger ring-1 ring-inset ring-os-danger/20">Pending</span>}
                            {order.status === 'shipped' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-500/20">Shipped</span>}
                            {order.status === 'completed' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-os-success/10 text-os-success ring-1 ring-inset ring-os-success/20">Completed</span>}
                        </div>
                        <p className="text-os-text-muted font-medium text-sm flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" /> Placed on {date}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <p className="text-sm font-semibold text-os-text-muted mr-2">Update Status:</p>
                    <OrderStatusSelector orderId={order.id} currentStatus={order.status} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Items & Total */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="os-panel">
                        <div className="p-5 border-b border-os-border flex items-center gap-2">
                            <Package className="w-5 h-5 text-os-text-muted" />
                            <h2 className="font-bold text-os-primary">Items Ordered</h2>
                        </div>
                        <div className="divide-y divide-os-border">
                            {(orderItems || []).map((item) => (
                                <div key={item.id} className="p-5 flex justify-between items-center group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-os-bg border border-os-border rounded-lg flex items-center justify-center shrink-0">
                                            {/* In a real app we'd fetch the product image, but we only have title/price in item */}
                                            <Package className="w-6 h-6 text-os-text-muted/50" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-os-primary group-hover:underline cursor-pointer">{item.products?.name || 'Unknown Product'}</p>
                                            <p className="text-sm text-os-text-muted font-medium mt-1">৳{item.products?.price || 0} × {item.quantity} {item.variant ? `(${item.variant})` : ''}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-os-primary">৳{((item.products?.price || 0) * item.quantity)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="p-5 bg-os-bg border-t border-os-border space-y-3">
                            <div className="flex justify-between font-bold text-lg text-os-primary pt-1">
                                <p>Total Amount</p>
                                <p>৳{order.total_amount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer & Shipping */}
                <div className="space-y-8">
                    <div className="os-panel p-6">
                        <h2 className="text-lg font-bold text-os-primary mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-os-text-muted" />
                            Customer Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-semibold text-os-text-muted uppercase tracking-widest mb-1.5">Name</p>
                                <p className="font-medium text-os-primary">{order.customer_name}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-os-text-muted uppercase tracking-widest mb-1.5">Phone</p>
                                <p className="font-medium text-os-primary">{order.customer_phone}</p>
                            </div>
                        </div>
                    </div>

                    <div className="os-panel p-6">
                        <h2 className="text-lg font-bold text-os-primary mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-os-text-muted" />
                            Shipping Details
                        </h2>
                        <div>
                            <p className="text-xs font-semibold text-os-text-muted uppercase tracking-widest mb-1.5">Address</p>
                            <p className="font-medium text-os-primary leading-relaxed whitespace-pre-wrap">
                                {order.address}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
