/**
 * Shared delivery zone configuration.
 * Single source of truth for delivery fees and estimated times.
 */
export const DELIVERY_ZONES = {
    inside: { label: "Inside Dhaka", fee: 70, eta: "2-3 days" },
    outside: { label: "Outside Dhaka", fee: 120, eta: "3-5 days" },
} as const;

export type DeliveryZone = keyof typeof DELIVERY_ZONES;

/**
 * Format a number as BDT currency string.
 * @example formatPrice(1500) → "৳1,500"
 */
export function formatPrice(amount: number): string {
    return `৳${amount.toLocaleString("en-BD")}`;
}
