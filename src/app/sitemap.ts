import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://kumoo.shop";

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
        { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${baseUrl}/custom`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
        { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
        { url: `${baseUrl}/shipping`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
        { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    ];

    // Dynamic product pages
    const { data: products } = await supabase
        .from("products")
        .select("slug, created_at")
        .order("created_at", { ascending: false });

    const productPages: MetadataRoute.Sitemap = (products || []).map((p) => ({
        url: `${baseUrl}/shop/${p.slug}`,
        lastModified: new Date(p.created_at),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [...staticPages, ...productPages];
}
