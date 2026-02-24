"use client";

import React, { useState } from "react";
import { Plus, Tag, Trash2, Loader2 } from "lucide-react";
import { createPromoCode, deletePromoCode } from "./actions";
import { toast } from "sonner";

export interface PromoCode {
    id: string;
    code: string;
    discount_percentage: number;
    is_active: boolean;
    created_at: string;
}

export function PromoCodeManager({ initialCodes }: { initialCodes: PromoCode[] }) {
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsCreating(true);
        const formData = new FormData(e.currentTarget);

        const response = await createPromoCode(formData);

        if (response?.error) {
            toast.error(response.error);
        } else {
            toast.success("Promo code created successfully!");
            (e.target as HTMLFormElement).reset();
        }

        setIsCreating(false);
    };

    return (
        <div className="space-y-8">
            <div className="os-panel p-6">
                <h2 className="text-lg font-bold text-os-primary mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-os-primary" />
                    Create New Code
                </h2>
                <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-semibold text-os-primary mb-1.5">Code string</label>
                        <input
                            type="text"
                            name="code"
                            className="os-input uppercase"
                            placeholder="e.g. SUMMER24"
                            required
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <label className="block text-sm font-semibold text-os-primary mb-1.5">Discount %</label>
                        <div className="relative">
                            <input
                                type="number"
                                name="discount_percentage"
                                className="os-input pr-8"
                                placeholder="15"
                                min="1"
                                max="100"
                                required
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-os-text-muted font-bold">%</span>
                        </div>
                    </div>
                    <button type="submit" disabled={isCreating} className="os-btn-primary w-full md:w-auto flex items-center justify-center gap-2">
                        {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Generate Code"}
                    </button>
                </form>
            </div>

            <div className="os-panel">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="os-table-th">Promo Code</th>
                            <th className="os-table-th">Discount Amount</th>
                            <th className="os-table-th">Status</th>
                            <th className="os-table-th text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-os-surface divide-y divide-os-border">
                        {initialCodes.map((code) => (
                            <tr key={code.id} className="hover:bg-os-bg transition-colors">
                                <td className="os-table-td font-mono font-bold text-os-primary flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-os-primary/50" />
                                    {code.code}
                                </td>
                                <td className="os-table-td font-bold text-os-primary">{code.discount_percentage}% Off</td>
                                <td className="os-table-td">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-os-success/10 text-os-success ring-1 ring-inset ring-os-success/20">
                                        Active
                                    </span>
                                </td>
                                <td className="os-table-td text-right flex justify-end">
                                    <button
                                        onClick={async () => {
                                            toast.promise(deletePromoCode(code.id), {
                                                loading: 'Deleting code...',
                                                success: 'Promo code deleted.',
                                                error: 'Failed to delete.'
                                            });
                                        }}
                                        className="p-1.5 text-os-text-muted hover:text-os-danger hover:bg-os-danger/10 rounded transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {initialCodes.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-os-text-muted font-medium text-sm">
                                    No promotional codes generated yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
