"use server";

import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: string) {
    const { supabase } = await requireAdmin();

    if (!id || typeof id !== 'string') {
        return { error: 'Invalid product ID.' };
    }

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
        return { error: error.message };
    }
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
}
