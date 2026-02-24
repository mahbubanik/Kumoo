"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function RevenueChart({ data }: { data: { date: string, amount: number }[] }) {

    if (!data || data.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-os-text-muted font-medium text-sm border-2 border-dashed border-os-border rounded-xl">
                Not enough data to map revenue.
            </div>
        )
    }

    return (
        <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--os-primary)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--os-primary)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--os-border)" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: 'var(--os-text-muted)' }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: 'var(--os-text-muted)' }}
                        tickFormatter={(value) => `৳${value}`}
                        dx={-10}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--os-surface)',
                            borderRadius: '8px',
                            border: '1px solid var(--os-border)',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        itemStyle={{ color: 'var(--os-primary)', fontWeight: 'bold' }}
                        formatter={(value: any) => [`৳${value}`, 'Revenue']}
                    />
                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="var(--os-primary)"
                        fillOpacity={1}
                        fill="url(#colorAmount)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
