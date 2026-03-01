import React from 'react';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { ProductTableControls } from './ProductTableControls';
import { ActionsCell } from './ActionsCell';

export default async function AdminProductsPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const supabase = await createClient();
    const resolvedParams = await searchParams;

    // Pagination
    const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;
    const limit = 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Sorting
    const sort = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : 'newest';
    let sortCol = 'created_at';
    let ascending = false;

    if (sort === 'oldest') { ascending = true; }
    else if (sort === 'price_asc') { sortCol = 'price'; ascending = true; }
    else if (sort === 'price_desc') { sortCol = 'price'; ascending = false; }
    else if (sort === 'name_asc') { sortCol = 'name'; ascending = true; }

    const { data: products, count } = await supabase
        .from('products')
        .select('*', { count: 'exact' })
        .order(sortCol, { ascending })
        .range(from, to);

    const totalPages = count ? Math.ceil(count / limit) : 1;

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <header>
                    <h1 className="font-display font-bold text-2xl text-os-primary mb-1">Products</h1>
                    <p className="text-os-text-muted font-medium text-sm">Manage your catalog and inventory.</p>
                </header>
                <Link href="/admin/products/new" className="os-btn-primary">Add New Product</Link>
            </div>

            <div className="os-panel">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="os-table-th">Product Name</th>
                                <th className="os-table-th">Price</th>
                                <th className="os-table-th">Category</th>
                                <th className="os-table-th text-center">Status</th>
                                <th className="os-table-th text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-os-surface divide-y divide-os-border">
                            {(products || []).map((product) => (
                                <tr key={product.id} className="hover:bg-os-bg transition-colors">
                                    <td className="os-table-td font-medium text-os-primary min-w-[200px]">{product.name}</td>
                                    <td className="os-table-td text-os-text-muted whitespace-nowrap">৳{product.price}</td>
                                    <td className="os-table-td text-os-text-muted capitalize">{product.category}</td>
                                    <td className="os-table-td text-center">
                                        {product.in_stock ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-os-success/10 text-os-success ring-1 ring-inset ring-os-success/20 whitespace-nowrap">In Stock</span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-os-danger/10 text-os-danger ring-1 ring-inset ring-os-danger/20 whitespace-nowrap">Out of Stock</span>
                                        )}
                                    </td>
                                    <ActionsCell productId={product.id} />
                                </tr>
                            ))}
                            {(!products || products.length === 0) && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-os-text-muted font-medium text-sm">No products found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination & Sorting Controls */}
                <div className="pt-4 border-t border-os-border px-1">
                    <ProductTableControls
                        currentPage={page}
                        totalPages={totalPages}
                        currentSort={sort}
                    />
                </div>
            </div>
        </div>
    );
}
