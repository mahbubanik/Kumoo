'use server'

import { createClient } from '@/utils/supabase/server'

export async function validatePromoCode(code: string) {
    const supabase = await createClient();

    const { data } = await supabase
        .from('promo_codes')
        .select('discount_percentage, is_active')
        .eq('code', code.toUpperCase())
        .single();

    if (!data || !data.is_active) {
        return { error: 'Invalid or inactive promo code.' };
    }

    return { success: true, discount_percentage: data.discount_percentage };
}

export async function submitOrder(
    orderData: { name: string; phone: string; address: string; area: string; total: number },
    items: { id: string; name: string; price: number; quantity: number; image: string; variant?: string }[]
) {
    const supabase = await createClient();

    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            customer_name: orderData.name,
            customer_phone: orderData.phone,
            address: `${orderData.address} (Zone: ${orderData.area})`,
            total_amount: orderData.total,
            status: 'pending'
        })
        .select()
        .single();

    if (orderError) {
        console.error("Order Insert Error:", orderError);
        return { error: 'Failed to create order ledger.' };
    }

    const orderItemsRecord = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        variant: item.variant || null
    }));

    const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsRecord);

    if (itemsError) {
        console.error("Order Items Insert Error:", itemsError);
        return { error: 'Failed to attach items to ledger.' };
    }

    // Attempt to sync to Customer CRM (Failures here should not crash the order)
    try {
        const { error: crmError } = await supabase.rpc('sync_checkout_customer', {
            p_name: orderData.name,
            p_phone: orderData.phone,
            p_amount: orderData.total
        });

        if (crmError) throw crmError;
    } catch (crmError) {
        console.warn("Non-fatal CRM sync error:", crmError);
    }

    return { success: true, orderId: order.id };
}
