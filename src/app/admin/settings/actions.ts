"use server";

import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateStoreSettings(formData: FormData) {
    const { supabase } = await requireAdmin();

    const settingsData = {
        store_name: (formData.get("store_name") as string || "").trim(),
        meta_description: (formData.get("meta_description") as string || "").trim(),
        primary_color: (formData.get("primary_color") as string || "").trim(),
        promo_banner_active: formData.get("promo_banner_active") === "on",
        promo_banner_text: (formData.get("promo_banner_text") as string || "").trim(),
        shipping_fee: parseFloat(formData.get("shipping_fee") as string || "0") || 0,
    };

    const { error } = await supabase
        .from("store_settings")
        .upsert({
            key: "general",
            value: settingsData
        });

    if (error) {
        console.error("Failed to update store settings:", error);
        return { error: "Failed to update settings. Please try again." };
    }

    revalidatePath("/admin/settings");
    revalidatePath("/");
    revalidatePath("/shop");

    return { success: true };
}
