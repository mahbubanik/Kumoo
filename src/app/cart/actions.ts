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
        // We use phone number as the unique identifier for guest checkout
        const { data: existingCustomer } = await supabase
            .from('customers')
            .select('id, total_spend')
            .eq('phone', orderData.phone)
            .single();

        if (existingCustomer) {
            await supabase
                .from('customers')
                .update({
                    first_name: orderData.name.split(' ')[0] || '',
                    last_name: orderData.name.split(' ').slice(1).join(' ') || '',
                    total_spend: Number(existingCustomer.total_spend || 0) + Number(orderData.total)
                })
                .eq('id', existingCustomer.id);
        } else {
            await supabase
                .from('customers')
                .insert({
                    first_name: orderData.name.split(' ')[0] || '',
                    last_name: orderData.name.split(' ').slice(1).join(' ') || '',
                    phone: orderData.phone,
                    total_spend: orderData.total
                });
        }
    } catch (crmError) {
        console.warn("Non-fatal CRM sync error:", crmError);
    }

    return { success: true, orderId: order.id };
}
