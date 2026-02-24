"use client";

import React from "react";
import { usePathname } from "next/navigation";

export function StorefrontUI({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Hide these elements on all admin routes
    if (pathname && pathname.startsWith("/admin")) {
        return null;
    }

    return <>{children}</>;
}
