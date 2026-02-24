import React from 'react';
import { createClient } from '@/utils/supabase/server';

export default async function AdminProductsPage() {
    const supabase = await createClient();
    const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false });

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <header>
                    <h1 className="font-display font-bold text-2xl text-os-primary mb-1">Products</h1>
                    <p className="text-os-text-muted font-medium text-sm">Manage your catalog and inventory.</p>
                </header>
                <button className="os-btn-primary">Add New Product</button>
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
                                    <td className="os-table-td text-right whitespace-nowrap">
                                        <button className="text-os-text-muted hover:text-os-primary font-medium text-xs transition-colors mr-4">Edit</button>
                                        <button className="text-os-danger/70 hover:text-os-danger transition-colors font-medium text-xs">Delete</button>
                                    </td>
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
            </div>
        </div>
    );
}
