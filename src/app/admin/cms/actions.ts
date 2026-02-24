"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateContentBlock(formData: FormData) {
    const supabase = await createClient();

    const key = formData.get("key") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!key || !content) {
        return { error: "Key and Content are required." };
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
    revalidatePath(`/${key}`); // Optimistically revalidate the frontend route (e.g. /about, /faq)

    return { success: true };
}
