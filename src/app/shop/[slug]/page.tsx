import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { ProductDetailsClient } from "./ProductDetailsClient";
import { Product } from "@/lib/types";

// Setup revalidation for static generation points
export const revalidate = 60;

export async function generateStaticParams() {
    const { data: products } = await supabase.from('products').select('slug');
    return (products || []).map((p) => ({
        slug: p.slug,
    }));
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch the current product from Supabase
    const { data: productRow } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!productRow) {
        notFound();
    }

    // Map DB row to Product type
    const product: Product = {
        id: productRow.id,
        name_en: productRow.name,
        slug: productRow.slug,
        description_en: productRow.description,
        price: productRow.price,
        category: productRow.category,
        collection: productRow.category, // fallback
        stock: productRow.in_stock ? 10 : 0, // mock stock
        options: productRow.options || {
            sizes: [],
            colors: []
        },
        images: productRow.images,
        featured: productRow.featured,
        sort_order: productRow.sort_order,
        created_at: productRow.created_at,
        updated_at: productRow.created_at,
    };

    // Fetch related products
    const { data: relatedRows } = await supabase
        .from('products')
        .select('*')
        .neq('id', product.id)
        .eq('category', product.category)
        .limit(4);

    const relatedProducts: Product[] = (relatedRows || []).map(p => ({
        id: p.id,
        name_en: p.name,
        slug: p.slug,
        description_en: p.description,
        price: p.price,
        category: p.category,
        collection: p.category,
        stock: p.in_stock ? 10 : 0,
        options: p.options || {
            sizes: [],
            colors: []
        },
        images: p.images,
        featured: p.featured,
        sort_order: p.sort_order,
        created_at: p.created_at,
        updated_at: p.created_at,
    }));

    return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />;
}
