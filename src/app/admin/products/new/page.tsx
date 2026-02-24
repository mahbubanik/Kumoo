"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { createProduct } from './actions';
import ImageUploader from '@/components/admin/ImageUploader';
import { toast } from 'sonner';

export default function AddProductPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        // Form data automatically includes all named inputs, including the hidden ones
        const response = await createProduct(formData);

        if (response?.error) {
            toast.error(response.error);
        } else {
            toast.success("Product created successfully!");
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
                        <h1 className="font-display font-bold text-2xl text-os-primary mb-1">Add Product</h1>
                        <p className="text-os-text-muted font-medium text-sm">Create a new item in your catalog.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button type="button" className="os-btn-secondary">Save Draft</button>
                    <button type="submit" disabled={isSubmitting} className="os-btn-primary flex items-center gap-2">
                        <Save className="w-4 h-4" /> {isSubmitting ? 'Saving...' : 'Publish Product'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column (Main Info) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <div className="os-panel p-6">
                        <h2 className="text-lg font-bold text-os-primary mb-6">Basic Information</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-os-primary mb-2">Title</label>
                                <input type="text" name="name" required className="os-input" placeholder="e.g. Strawberry Cow Plushie" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-os-primary mb-2">Description</label>
                                <textarea name="description" rows={5} className="os-input resize-y" placeholder="Describe the product..." />
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    <div className="os-panel p-6">
                        <h2 className="text-lg font-bold text-os-primary mb-6">Media</h2>
                        <ImageUploader onUploadComplete={(url) => setImageUrl(url)} currentImage={imageUrl} />
                        <input type="hidden" name="image_url" value={imageUrl} />
                    </div>

                    {/* Pricing */}
                    <div className="os-panel p-6">
                        <h2 className="text-lg font-bold text-os-primary mb-6">Pricing</h2>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-os-primary mb-2">Price (৳)</label>
                                <input type="number" name="price" required min="0" step="0.01" className="os-input" placeholder="0.00" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-os-primary mb-2">Compare at price</label>
                                <input type="number" className="os-input" placeholder="0.00" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (Sidebar setup) */}
                <div className="space-y-8">
                    {/* Status */}
                    <div className="os-panel p-6">
                        <h2 className="text-sm font-bold text-os-primary mb-4 uppercase tracking-widest">Status</h2>
                        <select className="os-input">
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>

                    {/* Organization */}
                    <div className="os-panel p-6">
                        <h2 className="text-sm font-bold text-os-primary mb-4 uppercase tracking-widest">Organization</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-os-text-muted mb-2">Category</label>
                                <select name="category" className="os-input" defaultValue="plushies">
                                    <option value="plushies">Plushies</option>
                                    <option value="accessories">Accessories</option>
                                    <option value="apparel">Apparel</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-os-text-muted mb-2">Collection</label>
                                <input type="text" className="os-input" placeholder="e.g. Summer 2026" />
                            </div>
                        </div>
                    </div>

                    {/* Inventory */}
                    <div className="os-panel p-6">
                        <h2 className="text-sm font-bold text-os-primary mb-4 uppercase tracking-widest">Inventory</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-os-text-muted mb-2">Stock Details</label>
                                <div className="flex items-center gap-2 mb-3">
                                    <input type="hidden" name="in_stock" value="false" />
                                    <input type="checkbox" name="in_stock" value="true" id="in_stock" className="rounded text-os-primary focus:ring-os-primary" defaultChecked />
                                    <label htmlFor="in_stock" className="text-sm text-os-primary">In Stock</label>
                                </div>
                                <input type="number" className="os-input" placeholder="Quantity available" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-os-text-muted mb-2">SKU (Optional)</label>
                                <input type="text" className="os-input" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
