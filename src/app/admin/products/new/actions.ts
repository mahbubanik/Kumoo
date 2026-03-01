"use server";

import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
    const { supabase } = await requireAdmin();

    const name = (formData.get("name") as string || "").trim();
    const description = (formData.get("description") as string || "").trim();
    const priceStr = formData.get("price") as string;
    const price = parseFloat(priceStr);
    const in_stock = formData.getAll("in_stock").includes("true");
    const category = (formData.get("category") as string || "").trim();
    const image_url = (formData.get("image_url") as string || "").trim();

    // Server-side validation
    if (!name || name.length < 2) {
        return { error: "Product name must be at least 2 characters." };
    }
    if (isNaN(price) || price <= 0) {
        return { error: "Price must be a positive number." };
    }
    if (!category) {
        return { error: "Category is required." };
    }

    // Auto-generate a slug from the name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const { error } = await supabase.from("products").insert({
        name,
        description,
        price,
        in_stock,
        category,
        images: image_url ? [image_url] : [],
        slug
    }).select().single();

    if (error) {
        console.error("Error creating product:", error);
        if (error.code === '23505') {
            return { error: "A product with a similar name already exists. Please use a different name." };
        }
        return { error: error.message };
    }

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    redirect("/admin/products");
}
