"use client";

import React, { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { updateContentBlock } from "./actions";
import { toast } from "sonner";

export interface ContentBlock {
    key: string;
    title: string;
    content: string;
}

export default function CMSForm({ blockKey, initialData }: { blockKey: string, initialData?: ContentBlock }) {
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.currentTarget);
        formData.append("key", blockKey);

        const response = await updateContentBlock(formData);

        if (response?.error) {
            toast.error(response.error);
        } else {
            toast.success(`${blockKey} page updated successfully!`);
        }

        setIsSaving(false);
    };

    return (
        <form onSubmit={handleSubmit} className="os-panel p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-os-primary capitalize flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-os-success"></div>
                    {blockKey} Page
                </h3>
                <button type="submit" disabled={isSaving} className="os-btn-primary flex items-center gap-2 text-sm shadow-sm py-1.5 focus:ring-2">
                    {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    {isSaving ? "Publishing..." : "Publish"}
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-os-primary mb-1.5">Page Title (H1)</label>
                    <input
                        type="text"
                        name="title"
                        className="os-input font-medium"
                        defaultValue={initialData?.title || ""}
                        placeholder={`e.g., Frequently Asked Questions`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-os-primary mb-1.5 flex justify-between">
                        <span>Page Body (HTML Supported)</span>
                        <span className="text-xs text-os-text-muted font-normal">Use &lt;br&gt; for line breaks, &lt;strong&gt; etc.</span>
                    </label>
                    <textarea
                        name="content"
                        rows={8}
                        className="os-input resize-y font-mono text-sm leading-relaxed"
                        defaultValue={initialData?.content || ""}
                        placeholder={`<p>Welcome to our ${blockKey} page!</p>`}
                        required
                    />
                </div>
            </div>
        </form>
    );
}
