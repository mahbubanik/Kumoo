import React from "react";

export function KawaiiCloud({ className = "", delay = "0s", color = "#FFB6C1" }: { className?: string; delay?: string; color?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`anim-float-y ${className}`}
            style={{ animationDelay: delay }}
        >
            <path
                d="M25 65 C15 65, 10 55, 15 45 C20 35, 30 35, 35 40 C40 25, 60 25, 65 40 C75 35, 90 40, 85 55 C90 65, 80 70, 75 65 Z"
                fill={color}
            />
            {/* Eyes */}
            <circle cx="40" cy="50" r="3" fill="#2C2C2C" />
            <circle cx="60" cy="50" r="3" fill="#2C2C2C" />

            {/* Blush */}
            <ellipse cx="32" cy="54" rx="4" ry="2" fill="#FF8BA7" opacity="0.6" />
            <ellipse cx="68" cy="54" rx="4" ry="2" fill="#FF8BA7" opacity="0.6" />

            {/* Smile */}
            <path d="M46 53 C48 56, 52 56, 54 53" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}
