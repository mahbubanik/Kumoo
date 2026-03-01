'use server'

import { supabaseAdmin as supabase } from '@/lib/supabaseAdmin'
import { DELIVERY_ZONES } from '@/lib/config'

export async function validatePromoCode(code: string) {

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
    items: { id: string; name: string; price: number; quantity: number; image: string; size?: string; color?: string; }[],
    promoCode?: string
) {

    if (!items || items.length === 0) {
        return { error: 'Cannot submit an empty order.' };
    }

    // SERVER-SIDE TOTAL RECALCULATION — never trust the client
    const productIds = [...new Set(items.map(i => i.id))];
    const { data: dbProducts, error: priceError } = await supabase
        .from('products')
        .select('id, price')
        .in('id', productIds);

    if (priceError || !dbProducts || dbProducts.length === 0) {
        return { error: 'Failed to verify product prices.' };
    }

    const priceMap = new Map(dbProducts.map(p => [p.id, Number(p.price)]));
    const zone = orderData.area === 'inside' ? 'inside' : 'outside';
    const shippingFee = DELIVERY_ZONES[zone].fee;
    let serverTotal = shippingFee;

    for (const item of items) {
        const dbPrice = priceMap.get(item.id);
        if (dbPrice === undefined) {
            return { error: `Product "${item.name}" not found or no longer available.` };
        }
        serverTotal += dbPrice * item.quantity;
    }

    // Server-side promo code re-validation
    let discountPercentage = 0;
    if (promoCode) {
        const { data: promoData } = await supabase
            .from('promo_codes')
            .select('discount_percentage, is_active')
            .eq('code', promoCode.toUpperCase())
            .single();

        if (promoData && promoData.is_active) {
            discountPercentage = promoData.discount_percentage;
        }
    }

    const subtotalBeforeShipping = serverTotal - shippingFee;
    const discountAmount = discountPercentage > 0 ? Math.round(subtotalBeforeShipping * (discountPercentage / 100)) : 0;
    serverTotal = subtotalBeforeShipping - discountAmount + shippingFee;

    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            customer_name: orderData.name,
            customer_phone: orderData.phone,
            address: `${orderData.address} (Zone: ${orderData.area})`,
            total_amount: serverTotal,
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
        variant: [item.size, item.color].filter(Boolean).join(' - ') || null
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
