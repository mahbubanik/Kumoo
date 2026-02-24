"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const in_stock = formData.get("in_stock") === "true";
    const category = formData.get("category") as string;
    const image_url = formData.get("image_url") as string;

    // Auto-generate a slug from the name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const { error } = await supabase.from("products").insert({
        name,
        name_en: name, // Using standard name as english fallback for now
        description,
        description_en: description,
        price,
        in_stock,
        category,
        image_url,
        slug
    }).select().single();

    if (error) {
        console.error("Error creating product:", error);
        return { error: error.message };
    }

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    redirect("/admin/products");
}
