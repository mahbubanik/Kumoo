export interface Product {
    id: string;
    name_en: string;
    name_bn?: string;
    slug: string;
    description_en?: string;
    description_bn?: string;
    price: number;
    compare_at_price?: number;
    category: "plushies" | "bags" | "accessories";
    collection?: string;
    stock: number;
    images: string[];
    featured: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Order {
    id?: string;
    order_number?: string;
    customer_name: string;
    phone: string;
    address: string;
    delivery_note?: string;
    items: OrderItem[];
    subtotal: number;
    delivery_fee: number;
    total: number;
    delivery_zone: "dhaka" | "outside";
    status?: string;
}

export interface OrderItem {
    product_id: string;
    name: string;
    price: number;
    qty: number;
    image: string;
}

export interface Collection {
    id: string;
    name_en: string;
    name_bn?: string;
    slug: string;
    color: string;
    image?: string;
    sort_order: number;
}
