"use client";

import React, { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { updateStoreSettings } from "./actions";
import { toast } from "sonner";

export interface StoreSettings {
    store_name?: string;
    meta_description?: string;
    primary_color?: string;
    promo_banner_active?: boolean;
    promo_banner_text?: string;
    shipping_fee?: string | number;
    [key: string]: string | number | boolean | undefined;
}

export default function SettingsForm({ initialSettings }: { initialSettings: StoreSettings }) {
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.currentTarget);

        const response = await updateStoreSettings(formData);

        if (response?.error) {
            toast.error(response.error);
        } else {
            toast.success("Store settings updated successfully!");
        }

        setIsSaving(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-between items-center bg-os-surface p-4 border-b border-os-border sticky top-0 z-10 -mx-6 md:-mx-10 px-6 md:px-10 mb-8 backdrop-blur-md">
                <div />
                <button type="submit" disabled={isSaving} className="os-btn-primary flex items-center gap-2 shadow-md">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isSaving ? "Saving..." : "Save Settings"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <h2 className="text-lg font-bold text-os-primary">Store Identity</h2>
                    <p className="text-sm text-os-text-muted mt-1 leading-relaxed">
                        Control your store&apos;s brand identity, SEO, and visual appearance across the customer storefront.
                    </p>
                </div>

                <div className="md:col-span-2 os-panel p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-os-primary mb-2">Store Name</label>
                        <input
                            type="text"
                            name="store_name"
                            className="os-input"
                            defaultValue={initialSettings.store_name || "Kumoo"}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-os-primary mb-2">Meta Description</label>
                        <textarea
                            name="meta_description"
                            rows={3}
                            className="os-input resize-y"
                            defaultValue={initialSettings.meta_description || ""}
                            placeholder="A short, catchy description for Google."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-os-primary mb-2">Primary Color (Hex)</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                name="primary_color"
                                className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                                defaultValue={initialSettings.primary_color || "#FF9EB5"}
                            />
                            <span className="text-sm text-os-text-muted font-mono bg-os-bg px-2 py-1 rounded border border-os-border">
                                {initialSettings.primary_color || "#FF9EB5"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-os-border" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <h2 className="text-lg font-bold text-os-primary">Operations</h2>
                    <p className="text-sm text-os-text-muted mt-1 leading-relaxed">
                        Manage global operational variables like baseline shipping fees and promotional banners.
                    </p>
                </div>

                <div className="md:col-span-2 os-panel p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-os-primary mb-2">Standard Shipping Fixed Fee (৳)</label>
                        <input
                            type="number"
                            name="shipping_fee"
                            className="os-input max-w-xs"
                            defaultValue={initialSettings.shipping_fee || "60"}
                            min="0"
                            required
                        />
                    </div>

                    <div className="pt-4 border-t border-os-border">
                        <div className="flex items-center gap-3 mb-3">
                            <input
                                type="checkbox"
                                id="promo_banner_active"
                                name="promo_banner_active"
                                className="w-4 h-4 text-os-primary border-os-border rounded focus:ring-os-primary"
                                defaultChecked={initialSettings.promo_banner_active}
                            />
                            <label className="text-sm font-semibold text-os-primary" htmlFor="promo_banner_active">
                                Enable Promotional Top Banner
                            </label>
                        </div>
                        <input
                            type="text"
                            name="promo_banner_text"
                            className="os-input"
                            placeholder="e.g., Free Shipping on orders over ৳1500!"
                            defaultValue={initialSettings.promo_banner_text || ""}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
