"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { updateProduct } from './actions';
import ImageUploader from '@/components/admin/ImageUploader';
import { toast } from 'sonner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditProductClient({ product }: { product: any }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState(product.images?.[0] || "");

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        // Ensure image_url is populated even if unchanged
        formData.append("image_url", imageUrl);
        const response = await updateProduct(product.id, formData);

        if (response?.error) {
            toast.error(response.error);
        }

        setIsSubmitting(false);
    };

    return (
        <form action={handleSubmit} className="max-w-4xl mx-auto pb-12">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products" className="p-2 hover:bg-os-border rounded-full transition-colors text-os-text-muted hover:text-os-primary">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="font-display font-bold text-2xl text-os-primary mb-1">Edit Product</h1>
                        <p className="text-os-text-muted font-medium text-sm">Update item details.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button type="submit" disabled={isSubmitting} className="os-btn-primary flex items-center gap-2">
                        <Save className="w-4 h-4" /> {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="os-panel p-6">
                        <h2 className="text-lg font-bold text-os-primary mb-6">Basic Information</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-os-primary mb-2">Title</label>
                                <input type="text" name="name" required className="os-input" defaultValue={product.name} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-os-primary mb-2">Description</label>
                                <textarea name="description" rows={5} className="os-input resize-y" defaultValue={product.description} />
                            </div>
                        </div>
                    </div>

                    <div className="os-panel p-6">
                        <h2 className="text-lg font-bold text-os-primary mb-6">Media</h2>
                        <ImageUploader onUploadComplete={(url) => setImageUrl(url)} currentImage={imageUrl} />
                    </div>

                    <div className="os-panel p-6">
                        <h2 className="text-lg font-bold text-os-primary mb-6">Pricing</h2>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-os-primary mb-2">Price (৳)</label>
                                <input type="number" name="price" required min="0" step="0.01" className="os-input" defaultValue={product.price} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-os-primary mb-2">Compare at price</label>
                                <input type="number" className="os-input" placeholder="0.00" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="os-panel p-6">
                        <h2 className="text-sm font-bold text-os-primary mb-4 uppercase tracking-widest">Organization</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-os-text-muted mb-2">Category</label>
                                <select name="category" className="os-input" defaultValue={product.category}>
                                    <option value="plushies">Plushies</option>
                                    <option value="accessories">Accessories</option>
                                    <option value="bags">Bags</option>
                                    <option value="apparel">Apparel</option>
                                    <option value="clothing">Clothing</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="os-panel p-6">
                        <h2 className="text-sm font-bold text-os-primary mb-4 uppercase tracking-widest">Inventory</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-os-text-muted mb-2">Stock Details</label>
                                <div className="flex items-center gap-2 mb-3">
                                    <input type="hidden" name="in_stock" value="false" />
                                    <input type="checkbox" name="in_stock" value="true" id="in_stock" className="rounded text-os-primary focus:ring-os-primary" defaultChecked={product.in_stock} />
                                    <label htmlFor="in_stock" className="text-sm text-os-primary">In Stock</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
