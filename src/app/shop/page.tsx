import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { ShopClient } from "./ShopClient";
import { Product } from "@/lib/types";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ShopPage() {
    // Fetch products from Supabase
    const { data: rows } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });

    // Map database rows to Product interface
    const products: Product[] = (rows || []).map(p => ({
        id: p.id,
        name_en: p.name,
        slug: p.slug,
        description_en: p.description,
        price: p.price,
        category: p.category,
        collection: p.category, // fallback
        stock: p.in_stock ? 10 : 0, // mock stock
        options: p.options || { sizes: [], colors: [] },
        images: p.images,
        featured: p.featured,
        sort_order: p.sort_order,
        created_at: p.created_at,
        updated_at: p.created_at,
    }));

    return (
        <Suspense
            fallback={
                <div className="layout-container py-32 text-center">
                    <div className="w-10 h-10 border-2 border-border border-t-melon rounded-full animate-spin mx-auto" />
                </div>
            }
        >
            <ShopClient products={products} />
        </Suspense>
    );
}
