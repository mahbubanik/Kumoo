import React from "react";

export function KawaiiSparkle({ className = "", delay = "0s", color = "#FFD166" }: { className?: string; delay?: string; color?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`anim-float-x ${className}`}
            style={{ animationDelay: delay }}
        >
            <path
                d="M50 10 C50 40, 60 50, 90 50 C60 50, 50 60, 50 90 C50 60, 40 50, 10 50 C40 50, 50 40, 50 10"
                fill={color}
            />
        </svg>
    );
}
