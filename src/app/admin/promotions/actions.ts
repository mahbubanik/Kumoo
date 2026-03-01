"use server";

import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createPromoCode(formData: FormData) {
    const { supabase } = await requireAdmin();

    const code = (formData.get("code") as string || "").trim();
    const discountStr = formData.get("discount_percentage") as string;
    const discount_percentage = parseInt(discountStr, 10);

    if (!code || code.length < 2) {
        return { error: "Promo code must be at least 2 characters." };
    }
    if (isNaN(discount_percentage) || discount_percentage <= 0 || discount_percentage > 100) {
        return { error: "Discount must be between 1% and 100%." };
    }

    const { error } = await supabase
        .from("promo_codes")
        .insert({
            code: code.toUpperCase(),
            discount_percentage
        });

    if (error) {
        console.error("Failed to create promo code:", error);
        if (error.code === '23505') {
            return { error: "This promo code already exists." };
        }
        return { error: "Failed to create promo code." };
    }

    revalidatePath("/admin/promotions");
    return { success: true };
}

export async function deletePromoCode(id: string) {
    const { supabase } = await requireAdmin();

    if (!id || typeof id !== 'string') {
        return { error: "Invalid promo code ID." };
    }

    const { error } = await supabase
        .from("promo_codes")
        .delete()
        .eq("id", id);

    if (error) {
        return { error: "Failed to delete promo code." };
    }

    revalidatePath("/admin/promotions");
    return { success: true };
}
