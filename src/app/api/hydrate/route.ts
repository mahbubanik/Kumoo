import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { demoProducts } from '@/lib/products';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('products')
            .upsert(demoProducts.map(p => ({
                id: p.id,
                name: p.name_en,
                price: p.price,
                images: p.images,
                category: p.category,
                in_stock: p.stock > 0,
                description: p.description_en
            })));

        if (error) throw error;

        return NextResponse.json({ success: true, count: demoProducts.length });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
