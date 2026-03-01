"use server";

import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function updateProduct(id: string, formData: FormData) {
    const { supabase } = await requireAdmin();

    if (!id || typeof id !== 'string') {
        return { error: "Invalid product ID." };
    }

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

    const updatePayload: Record<string, unknown> = {
        name,
        description,
        price,
        in_stock,
        category,
    };

    // Only overwrite images if a new URL was explicitly provided
    if (image_url) {
        updatePayload.images = [image_url];
    }

    const { error } = await supabase.from("products").update(updatePayload).eq("id", id);

    if (error) {
        console.error("Error updating product:", error);
        return { error: error.message };
    }

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    redirect("/admin/products");
}
