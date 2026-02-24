"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export interface Order {
    id: string;
    created_at: string;
    customer_name: string;
    customer_email?: string;
    customer_phone: string;
    address: string;
    total_amount: number;
    status: string;
    [key: string]: any; // Allow other Supabase payload columns
}

export default function RealtimeOrderList({ initialOrders }: { initialOrders: Order[] }) {
    const supabase = createClient();
    const [orders, setOrders] = useState<Order[]>(initialOrders);

    useEffect(() => {
        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'orders',
                },
                (payload) => {
                    const { eventType } = payload;
                    const newRecord = payload.new as Order;
                    const oldRecord = payload.old as Order;

                    if (eventType === 'INSERT') {
                        setOrders((prev) => [newRecord, ...prev]);
                    } else if (eventType === 'UPDATE') {
                        setOrders((prev) => prev.map((o) => o.id === newRecord.id ? newRecord : o));
                    } else if (eventType === 'DELETE') {
                        setOrders((prev) => prev.filter((o) => o.id !== oldRecord.id));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    return (
        <div className="os-panel">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="os-table-th">Order ID</th>
                            <th className="os-table-th">Customer</th>
                            <th className="os-table-th">Date</th>
                            <th className="os-table-th">Total</th>
                            <th className="os-table-th text-center">Status</th>
                            <th className="os-table-th text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-os-surface divide-y divide-os-border">
                        {orders.map((order) => {
                            const date = new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                            return (
                                <tr key={order.id} className="hover:bg-os-bg transition-colors">
                                    <td className="os-table-td font-mono text-xs text-os-text-muted">{order.id.split('-')[0].toUpperCase()}</td>
                                    <td className="os-table-td font-medium text-os-primary">{order.customer_name}</td>
                                    <td className="os-table-td text-os-text-muted">{date}</td>
                                    <td className="os-table-td font-medium">৳{order.total_amount}</td>
                                    <td className="os-table-td text-center">
                                        {order.status === 'pending' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-os-danger/10 text-os-danger ring-1 ring-inset ring-os-danger/20">Pending</span>}
                                        {order.status === 'shipped' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-500/20">Shipped</span>}
                                        {order.status === 'completed' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-os-success/10 text-os-success ring-1 ring-inset ring-os-success/20">Completed</span>}
                                    </td>
                                    <td className="os-table-td text-right">
                                        <Link href={`/admin/orders/${order.id}`} className="text-os-text-muted hover:text-os-primary font-medium text-xs transition-colors">View Details</Link>
                                    </td>
                                </tr>
                            );
                        })}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-os-text-muted font-medium text-sm">No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
