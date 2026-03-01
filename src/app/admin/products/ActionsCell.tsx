"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { deleteProduct } from "./actions";
import { toast } from "sonner";

export function ActionsCell({ productId }: { productId: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        startTransition(async () => {
            const res = await deleteProduct(productId);
            if (res?.error) {
                toast.error(res.error);
            } else {
                toast.success("Product deleted successfully");
            }
        });
    };

    return (
        <td className="os-table-td text-right whitespace-nowrap">
            <Link
                href={`/admin/products/${productId}`}
                className="text-os-text-muted hover:text-os-primary font-medium text-xs transition-colors py-2 px-3 inline-block mr-1"
            >
                Edit
            </Link>
            <button
                onClick={handleDelete}
                disabled={isPending}
                className="text-os-danger/70 hover:text-os-danger transition-colors font-medium text-xs disabled:opacity-50 py-2 px-3 inline-block"
            >
                {isPending ? "..." : "Delete"}
            </button>
        </td>
    );
}
