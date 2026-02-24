import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    variant?: string; // e.g., 'Vanilla', 'Strawberry'
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, variant?: string) => void;
    updateQuantity: (id: string, quantity: number, variant?: string) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                set((state) => {
                    const existingItemIndex = state.items.findIndex(
                        (i) => i.id === item.id && i.variant === item.variant
                    );

                    if (existingItemIndex >= 0) {
                        const newItems = [...state.items];
                        newItems[existingItemIndex].quantity += item.quantity;
                        return { items: newItems };
                    }
                    return { items: [...state.items, item] };
                });
            },
            removeItem: (id, variant) => {
                set((state) => ({
                    items: state.items.filter(
                        (i) => !(i.id === id && i.variant === variant)
                    ),
                }));
            },
            updateQuantity: (id, quantity, variant) => {
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === id && i.variant === variant ? { ...i, quantity } : i
                    ),
                }));
            },
            clearCart: () => set({ items: [] }),
            getCartTotal: () => {
                return get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },
            getCartCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },
        }),
        {
            name: 'kumoo-cart-storage',
        }
    )
);
