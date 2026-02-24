import React from "react";
import { createClient } from "@/utils/supabase/server";
import { FileText } from "lucide-react";
import CMSForm, { ContentBlock } from "./CMSForm";

export const metadata = {
    title: "CMS | Kumoo OS",
}

export default async function AdminCMSPage() {
    const supabase = await createClient();

    // Fetch all current content blocks
    const { data: blocks } = await supabase
        .from("content_blocks")
        .select("*");

    const getBlock = (key: string): ContentBlock | undefined => {
        return blocks?.find((b) => b.key === key);
    };

    return (
        <div>
            <header className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="font-display font-bold text-2xl text-os-primary mb-1 flex items-center gap-3">
                        <FileText className="w-6 h-6 text-os-text-muted" />
                        Content Pages
                    </h1>
                    <p className="text-os-text-muted font-medium text-sm">
                        Manage static page content like your About and FAQ sections. Note: HTML tags are supported.
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CMSForm blockKey="about" initialData={getBlock("about")} />
                <CMSForm blockKey="faq" initialData={getBlock("faq")} />
                <CMSForm blockKey="shipping" initialData={getBlock("shipping")} />
                <CMSForm blockKey="returns" initialData={getBlock("returns")} />
            </div>
        </div>
    );
}
