"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createPromoCode(formData: FormData) {
    const supabase = await createClient();

    const code = formData.get("code") as string;
    const discountStr = formData.get("discount_percentage") as string;
    const discount_percentage = parseInt(discountStr, 10);

    if (!code || isNaN(discount_percentage) || discount_percentage <= 0 || discount_percentage > 100) {
        return { error: "Invalid promo code or percentage." };
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
    const supabase = await createClient();

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
