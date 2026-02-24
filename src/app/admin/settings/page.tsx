import React from "react";
import { createClient } from "@/utils/supabase/server";
import SettingsForm from "./SettingsForm";
import { Settings } from "lucide-react";

export const metadata = {
    title: "Settings | Kumoo OS",
}

export default async function AdminSettingsPage() {
    const supabase = await createClient();

    // Fetch the single 'general' settings row
    const { data: settingsRow } = await supabase
        .from("store_settings")
        .select("value")
        .eq("key", "general")
        .maybeSingle();

    const settings = settingsRow?.value || {};

    return (
        <div>
            <header className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="font-display font-bold text-2xl text-os-primary mb-1 flex items-center gap-3">
                        <Settings className="w-6 h-6 text-os-text-muted" />
                        Store Settings
                    </h1>
                    <p className="text-os-text-muted font-medium text-sm">
                        Global configuration for theme, checkout, and storefront marketing.
                    </p>
                </div>
            </header>

            <div className="max-w-4xl">
                <SettingsForm initialSettings={settings} />
            </div>
        </div>
    );
}
