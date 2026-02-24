import React from "react";

interface LoopShapeProps {
    color?: "rose" | "lilac" | "mint" | "babyblue" | "melon";
    className?: string;
}

/**
 * The Scrapbook Backing — Kumoo V3 signature shape.
 * A flat, thick-bordered sticky note or piece of construction paper
 * sitting playfully behind the product photo.
 */
export function LoopShape({ color = "lilac", className = "" }: LoopShapeProps) {
    // Map the string prop to the CSS variable colors defined in globals.css
    const bgMap = {
        rose: "bg-[#FFC4D4]",
        lilac: "bg-[#A78BFA]",
        mint: "bg-[#B8E8D5]",
        babyblue: "bg-[#A3D5FF]",
        melon: "bg-[#FF9E7A]",
    };

    const bgColorClass = bgMap[color] || bgMap.lilac;

    return (
        <div
            className={`absolute inset-[-6%] z-0 rounded-2xl border-[3px] border-[#332A24] ${bgColorClass} ${className}`}
            style={{
                transform: "rotate(-3deg)",
                transition: "transform 300ms ease",
            }}
        />
    );
}
