import React from 'react';
import { createClient } from '@/utils/supabase/server';
import RealtimeOrderList from './RealtimeOrderList';

export default async function AdminOrdersPage() {
    const supabase = await createClient();
    const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });

    return (
        <div>
            <header className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="font-display font-bold text-2xl text-os-primary mb-1">Orders</h1>
                    <p className="text-os-text-muted font-medium text-sm">Manage pending and shipped orders.</p>
                </div>
            </header>

            <RealtimeOrderList initialOrders={orders || []} />
        </div>
    );
}
