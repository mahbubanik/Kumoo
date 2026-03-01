import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size?: string;
    color?: string;
    colorHex?: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, size?: string, color?: string) => void;
    updateQuantity: (id: string, quantity: number, size?: string, color?: string) => void;
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
                        (i) => i.id === item.id && i.size === item.size && i.color === item.color
                    );

                    if (existingItemIndex >= 0) {
                        const newItems = [...state.items];
                        newItems[existingItemIndex].quantity += item.quantity;
                        return { items: newItems };
                    }
                    return { items: [...state.items, item] };
                });
            },
            removeItem: (id, size, color) => {
                set((state) => ({
                    items: state.items.filter(
                        (i) => !(i.id === id && i.size === size && i.color === color)
                    ),
                }));
            },
            updateQuantity: (id, quantity, size, color) => {
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === id && i.size === size && i.color === color ? { ...i, quantity } : i
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
