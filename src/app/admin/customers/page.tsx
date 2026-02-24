import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { UserCircle, Filter } from 'lucide-react';

export default async function AdminCustomersPage() {
    const supabase = await createClient();

    // Fetch customers, ordered by creation date
    const { data: customers } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div>
            <header className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="font-display font-bold text-2xl text-os-primary mb-1">Customers CRM</h1>
                    <p className="text-os-text-muted font-medium text-sm">Manage shoppers, track lifetime value, and view histories.</p>
                </div>
                <button className="os-btn-secondary flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Filter Segments
                </button>
            </header>

            <div className="os-panel">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="os-table-th">Customer</th>
                                <th className="os-table-th">Contact</th>
                                <th className="os-table-th">Enrolled</th>
                                <th className="os-table-th">Lifetime Value</th>
                                <th className="os-table-th text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-os-surface divide-y divide-os-border">
                            {(customers || []).map((customer) => {
                                const date = new Date(customer.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                                const name = `${customer.first_name} ${customer.last_name}`.trim() || 'Guest Checkout';

                                return (
                                    <tr key={customer.id} className="hover:bg-os-bg transition-colors">
                                        <td className="os-table-td">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-os-bg rounded-full flex items-center justify-center border border-os-border text-os-primary shrink-0">
                                                    <UserCircle className="w-5 h-5 opacity-50" />
                                                </div>
                                                <div className="font-medium text-os-primary">{name}</div>
                                            </div>
                                        </td>
                                        <td className="os-table-td">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-medium text-os-primary">{customer.phone}</span>
                                                {customer.email && <span className="text-xs text-os-text-muted">{customer.email}</span>}
                                            </div>
                                        </td>
                                        <td className="os-table-td text-os-text-muted">{date}</td>
                                        <td className="os-table-td font-bold text-os-primary">
                                            ৳{customer.total_spend || 0}
                                        </td>
                                        <td className="os-table-td text-right">
                                            <button className="text-os-text-muted hover:text-os-primary font-medium text-xs transition-colors">View Profile</button>
                                        </td>
                                    </tr>
                                );
                            })}

                            {(!customers || customers.length === 0) && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center">
                                        <UserCircle className="w-8 h-8 mx-auto text-os-text-muted mb-3 opacity-50" />
                                        <p className="text-os-primary font-medium">No customers found.</p>
                                        <p className="text-sm text-os-text-muted mt-1">Customers will automatically appear here when they checkout.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
