/**
 * Shared delivery zone configuration.
 * Single source of truth for delivery fees and estimated times.
 */
export const DELIVERY_ZONES = {
    inside: { label: "Inside Dhaka", fee: 70, eta: "3-4 days", etaDaysMin: 3, etaDaysMax: 4 },
    outside: { label: "Outside Dhaka", fee: 120, eta: "5-7 days", etaDaysMin: 5, etaDaysMax: 7 },
} as const;

export type DeliveryZone = keyof typeof DELIVERY_ZONES;

/**
 * Get estimated delivery date range string from today.
 */
export function getEstimatedDelivery(zone: DeliveryZone): string {
    const { etaDaysMin, etaDaysMax } = DELIVERY_ZONES[zone];
    const from = new Date();
    from.setDate(from.getDate() + etaDaysMin);
    const to = new Date();
    to.setDate(to.getDate() + etaDaysMax);
    const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${fmt(from)} – ${fmt(to)}`;
}

/**
 * Format a number as BDT currency string.
 * @example formatPrice(1500) → "৳1,500"
 */
export function formatPrice(amount: number): string {
    return `৳${amount.toLocaleString("en-BD")}`;
}
