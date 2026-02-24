"use client";

import React, { useState } from "react";
import { updateOrderStatus } from "./actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function OrderStatusSelector({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [status, setStatus] = useState(currentStatus);

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        const previousStatus = status;

        setStatus(newStatus); // Optimistic update
        setIsUpdating(true);

        const response = await updateOrderStatus(orderId, newStatus);

        if (response?.error) {
            toast.error(response.error);
            setStatus(previousStatus); // Revert on failure
        } else {
            toast.success("Order status updated");
        }

        setIsUpdating(false);
    };

    return (
        <div className="flex items-center gap-3">
            <select
                value={status}
                onChange={handleStatusChange}
                disabled={isUpdating}
                className="os-input font-medium py-1.5 min-w-[140px]"
            >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
            </select>
            {isUpdating && <Loader2 className="w-4 h-4 text-os-text-muted animate-spin" />}
        </div>
    );
}
