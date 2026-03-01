import React from 'react';
import { createClient } from '@/utils/supabase/server';
import EditProductClient from './EditProductClient';
import { notFound } from 'next/navigation';

export default async function EditProductPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const resolvedParams = await params;
    const supabase = await createClient();

    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();

    if (error || !product) {
        return notFound();
    }

    return <EditProductClient product={product} />;
}
