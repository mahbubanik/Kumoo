"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateStoreSettings(formData: FormData) {
    const supabase = await createClient();

    const settingsData = {
        store_name: formData.get("store_name"),
        meta_description: formData.get("meta_description"),
        primary_color: formData.get("primary_color"),
        promo_banner_active: formData.get("promo_banner_active") === "on",
        promo_banner_text: formData.get("promo_banner_text"),
        shipping_fee: formData.get("shipping_fee"),
    };

    // Upsert the main settings object into store_settings
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
    revalidatePath("/shop"); // Invalidate storefront paths to reflect changes

    return { success: true };
}
