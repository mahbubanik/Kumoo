import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Tag } from "lucide-react";
import { PromoCodeManager } from "./PromoCodeManager";

export const metadata = {
    title: "Promotions | Kumoo OS",
}

export default async function AdminPromotionsPage() {
    const supabase = await createClient();

    const { data: codes } = await supabase
        .from("promo_codes")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div>
            <header className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="font-display font-bold text-2xl text-os-primary mb-1 flex items-center gap-3">
                        <Tag className="w-6 h-6 text-os-text-muted" />
                        Promotional Codes
                    </h1>
                    <p className="text-os-text-muted font-medium text-sm">
                        Create percentage-based discount codes for marketing campaigns.
                    </p>
                </div>
            </header>

            <div className="max-w-4xl">
                <PromoCodeManager initialCodes={codes || []} />
            </div>
        </div>
    );
}
