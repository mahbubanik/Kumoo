"use client";

import React, { useState, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { UploadCloud, X, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
    onUploadComplete: (url: string) => void;
    currentImage?: string;
}

export default function ImageUploader({ onUploadComplete, currentImage }: ImageUploaderProps) {
    const supabase = createClient();
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setError(null);
            setUploading(true);

            if (!e.target.files || e.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const filePath = `${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('product-images')
                .getPublicUrl(filePath);

            setPreviewUrl(publicUrl);
            onUploadComplete(publicUrl);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setUploading(false);
        }
    }, [supabase, onUploadComplete]);

    const handleRemove = () => {
        setPreviewUrl(null);
        onUploadComplete("");
    };

    if (previewUrl) {
        return (
            <div className="relative border border-os-border rounded-xl aspect-[4/3] overflow-hidden bg-os-bg group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Product preview" className="object-cover w-full h-full" />
                <button
                    onClick={handleRemove}
                    type="button"
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm text-os-danger opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        );
    }

    return (
        <div>
            <label className="border-2 border-dashed border-os-border rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-os-bg transition-colors">
                <div className="w-12 h-12 rounded-full bg-os-bg flex items-center justify-center mb-4 text-os-text-muted border border-os-border">
                    {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <UploadCloud className="w-6 h-6" />}
                </div>
                <p className="text-os-primary font-medium mb-1">
                    {uploading ? 'Uploading...' : 'Click to upload or drag & drop'}
                </p>
                <p className="text-xs text-os-text-muted">SVG, PNG, JPG or GIF (max. 5MB)</p>
                <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/svg+xml, image/gif"
                    onChange={handleFileChange}
                    disabled={uploading}
                />
            </label>
            {error && <p className="mt-2 text-sm text-os-danger font-medium">{error}</p>}
        </div>
    );
}
