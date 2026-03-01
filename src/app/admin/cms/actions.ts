"use server";

import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateContentBlock(formData: FormData) {
    const { supabase } = await requireAdmin();

    const key = (formData.get("key") as string || "").trim();
    const title = (formData.get("title") as string || "").trim();
    const content = (formData.get("content") as string || "").trim();

    if (!key) {
        return { error: "Key is required." };
    }
    if (!content) {
        return { error: "Content is required." };
    }

    const { error } = await supabase
        .from("content_blocks")
        .upsert({
            key,
            title,
            content,
            updated_at: new Date().toISOString(),
        });

    if (error) {
        console.error("Failed to update content block:", error);
        return { error: "Failed to update page content. Please try again." };
    }

    revalidatePath("/admin/cms");
    revalidatePath(`/${key}`);

    return { success: true };
}
