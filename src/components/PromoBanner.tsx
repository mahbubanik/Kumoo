import React from "react";
import { createClient } from "@/utils/supabase/server";

export async function PromoBanner() {
    const supabase = await createClient();

    // Fetch store settings quietly (no throwing on fail)
    const { data: row } = await supabase
        .from("store_settings")
        .select("value")
        .eq("key", "general")
        .maybeSingle();

    const settings = row?.value;

    if (!settings || !settings.promo_banner_active || !settings.promo_banner_text) {
        return null; // Return null if not active or no text
    }

    return (
        <div
            className="w-full text-center py-2 px-4 text-sm font-bold tracking-wide 
                       animate-pulse shadow-sm z-50 relative"
            style={{
                backgroundColor: settings.primary_color || "var(--color-melon)",
                color: "var(--color-bg)" // Presuming a white/light text works on dynamic primary backgrounds
            }}
        >
            ✨ {settings.promo_banner_text} ✨
        </div>
    );
}
