"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Utility to handle Meta Pixel
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "";

export const pageview = () => {
    // @ts-expect-error facebook pixel type not mapped
    window.fbq("track", "PageView");
};

export const event = (name: string, options = {}) => {
    // @ts-expect-error facebook pixel type not mapped
    window.fbq("track", name, options);
};

export function MetaPixel() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!FB_PIXEL_ID) return; // Skip if no pixel ID configured
        // This fires on route changes
        import("react-facebook-pixel")
            .then((x) => x.default)
            .then((ReactPixel) => {
                ReactPixel.init(FB_PIXEL_ID);
                ReactPixel.pageView();
            });
    }, [pathname, searchParams]);

    return null;
}
