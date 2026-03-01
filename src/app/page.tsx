import { supabase } from "@/lib/supabase";
import { HomeClient } from "./HomeClient";
import { Product } from "@/lib/types";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  // Fetch only featured products for the homepage
  const { data: rows } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('sort_order', { ascending: true });

  // Map database rows to Product interface
  const featuredProducts: Product[] = (rows || []).map(p => ({
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

  return <HomeClient featuredProducts={featuredProducts} />;
}
