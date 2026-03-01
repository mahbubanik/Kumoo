import { createClient } from "@supabase/supabase-js";
import { demoProducts } from "../src/lib/products";

const supabaseUrl = "https://cikwennqiktoeeqgxoqr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpa3dlbm5xaWt0b2VlcWd4b3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MjI0ODMsImV4cCI6MjA4NzQ5ODQ4M30.sxalTTyqss2j2G3XHmz8g7-7EkihmV1UWEuEMrBkHrU";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
    console.log("Hydrating database...");

    const mappedProducts = demoProducts.map(p => ({
        id: p.id,
        name: p.name_en,
        slug: p.slug,
        price: p.price,
        images: p.images,
        category: p.category,
        in_stock: p.stock > 0,
        description: p.description_en,
        featured: p.featured,
        sort_order: p.sort_order
    }));

    const { error } = await supabase
        .from('products')
        .upsert(mappedProducts);

    if (error) {
        console.error("Failed to hydrate:", error);
    } else {
        console.log("Successfully hydrated entirely!", mappedProducts.length, "items.");
    }
}

main().catch(console.error);
