"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductTableControls({
    currentPage,
    totalPages,
    currentSort
}: {
    currentPage: number,
    totalPages: number,
    currentSort: string
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
        return params.toString();
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(pathname + "?" + createQueryString("sort", e.target.value));
    };

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        router.push(pathname + "?" + createQueryString("page", newPage.toString()));
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm mt-4">
            <div className="flex items-center gap-2">
                <span className="text-os-text-muted font-medium">Sort by:</span>
                <select
                    value={currentSort}
                    onChange={handleSortChange}
                    className="os-input py-1.5 pl-3 pr-8 text-sm"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="name_asc">Name: A-Z</option>
                </select>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-os-text-muted font-medium">
                    Page {currentPage} of {Math.max(1, totalPages)}
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="p-1.5 rounded-md border border-os-border hover:bg-os-bg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-os-text"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="p-1.5 rounded-md border border-os-border hover:bg-os-bg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-os-text"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
