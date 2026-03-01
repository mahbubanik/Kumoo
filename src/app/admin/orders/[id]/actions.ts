"use server";

import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const VALID_STATUSES = ['pending', 'confirmed', 'shipped', 'completed', 'cancelled'] as const;

export async function updateOrderStatus(orderId: string, newStatus: string) {
    const { supabase } = await requireAdmin();

    if (!orderId || typeof orderId !== 'string') {
        return { error: "Invalid order ID." };
    }

    if (!VALID_STATUSES.includes(newStatus as typeof VALID_STATUSES[number])) {
        return { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` };
    }

    const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

    if (error) {
        console.error("Failed to update order status:", error);
        return { error: error.message };
    }

    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true };
}
