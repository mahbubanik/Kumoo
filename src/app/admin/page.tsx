import { createClient } from "@/utils/supabase/server";
import { RevenueChart } from "./RevenueChart";
import Link from "next/link";

export default async function AdminDashboardPage() {
    const supabase = await createClient();

    // 1. Fetch all orders strictly within the last 7 days for the chart
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentOrders } = await supabase
        .from('orders')
        .select('created_at, total_amount')
        .gte('created_at', sevenDaysAgo.toISOString())
        .neq('status', 'cancelled')
        .order('created_at', { ascending: true });

    // Build a 7-day array of { date: string, amount: number }
    const dailyRevenueMap: Record<string, number> = {};

    // Initialize exactly 7 days backward from today
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateString = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        dailyRevenueMap[dateString] = 0;
    }

    let totalRevenue = 0;

    if (recentOrders) {
        recentOrders.forEach(order => {
            const dateObj = new Date(order.created_at);
            const dateString = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            if (dailyRevenueMap[dateString] !== undefined) {
                dailyRevenueMap[dateString] += Number(order.total_amount) || 0;
            }
            totalRevenue += Number(order.total_amount) || 0;
        });
    }

    // Convert map to array for Recharts
    const chartData = Object.keys(dailyRevenueMap).map(date => ({
        date,
        amount: dailyRevenueMap[date]
    }));

    // 2. Fetch Active Orders
    const { count: activeOrdersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .neq('status', 'completed');

    // 3. Low Stock Alerts (mocking stock checks via in_stock boolean for now)
    const { count: outOfStockCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('in_stock', false);

    // 4. Total Orders (all time)
    const { count: totalOrdersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

    // Calculate AOV
    const aov = totalOrdersCount && totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

    return (
        <div>
            <header className="mb-10">
                <h1 className="font-display font-bold text-3xl text-os-primary mb-2">Dashboard</h1>
                <p className="text-os-text-muted font-medium text-sm">Overview of your store&apos;s performance.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="os-panel p-6 shadow-sm border-t-4 border-t-os-primary">
                    <h3 className="text-os-text-muted text-xs font-bold tracking-widest uppercase mb-2">7-Day Revenue</h3>
                    <p className="font-display font-bold text-3xl text-os-text">৳{totalRevenue.toLocaleString()}</p>
                </div>
                <div className="os-panel p-6 shadow-sm border-t-4 border-t-os-success">
                    <h3 className="text-os-text-muted text-xs font-bold tracking-widest uppercase mb-2">Active Orders</h3>
                    <p className="font-display font-bold text-3xl text-os-text">{activeOrdersCount || 0}</p>
                </div>
                <div className="os-panel p-6 shadow-sm border-t-4 border-t-[#9DCBF5]">
                    <h3 className="text-os-text-muted text-xs font-bold tracking-widest uppercase mb-2">Total Orders</h3>
                    <p className="font-display font-bold text-3xl text-os-text">{totalOrdersCount || 0}</p>
                    <p className="text-os-text-muted text-xs font-medium mt-1">AOV: ৳{aov.toLocaleString()}</p>
                </div>
                <div className="os-panel p-6 shadow-sm border-t-4 border-t-os-danger">
                    <h3 className="text-os-text-muted text-xs font-bold tracking-widest uppercase mb-2">Out of Stock</h3>
                    <p className="font-display font-bold text-3xl text-os-danger">{outOfStockCount || 0} Items</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 os-panel p-8 shadow-sm">
                    <h2 className="font-display font-bold text-lg text-os-primary mb-2">Revenue Growth</h2>
                    <p className="text-sm text-os-text-muted">Trailing 7 days performance metric.</p>
                    <RevenueChart data={chartData} />
                </div>

                {/* Quick Actions */}
                <div className="os-panel p-8 shadow-sm h-full max-h-[400px]">
                    <h2 className="font-display font-bold text-lg text-os-primary mb-6">Quick Actions</h2>
                    <div className="flex flex-col gap-4">
                        <Link href="/admin/products/new" className="os-btn-primary w-full justify-center text-center">Add New Product</Link>
                        <Link href="/admin/products" className="os-btn-secondary w-full justify-center text-center">Manage Inventory</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
