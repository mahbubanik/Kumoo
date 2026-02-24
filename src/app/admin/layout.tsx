import React from "react";
import Link from "next/link";
import { Package, ShoppingCart, Settings, LogOut, Home, UserCircle, FileText, Tag } from "lucide-react";
import { Toaster } from "sonner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    // Note: In production, add server-side auth check here (e.g. Supabase auth)
    // if (!user) redirect('/login');

    return (
        <div className="min-h-screen bg-os-bg flex flex-col md:flex-row font-body text-os-text selection:bg-os-primary selection:text-os-primary-fg">
            <Toaster position="top-right" richColors theme="system" />
            {/* Sidebar */}
            <aside className="w-full md:w-[260px] bg-os-surface border-r border-os-border shrink-0 flex flex-col z-10 relative">
                <div className="p-5 border-b border-os-border flex items-center justify-between">
                    <div>
                        <Link href="/admin" className="font-display font-bold text-xl text-os-primary tracking-tight flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-os-primary text-os-primary-fg flex items-center justify-center text-xs">K</span>
                            Kumoo OS
                        </Link>
                    </div>
                </div>

                <nav className="flex-grow p-3 space-y-1">
                    <p className="px-3 text-[10px] font-bold tracking-widest uppercase text-os-text-muted mb-2 mt-2">Overview</p>
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-os-bg transition-colors font-medium text-sm text-os-text group">
                        <Home className="w-4 h-4 text-os-text-muted group-hover:text-os-primary transition-colors" />
                        Dashboard
                    </Link>
                    <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-os-bg transition-colors font-medium text-sm text-os-text group">
                        <ShoppingCart className="w-4 h-4 text-os-text-muted group-hover:text-os-primary transition-colors" />
                        Orders
                    </Link>
                    <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-os-bg transition-colors font-medium text-sm text-os-text group">
                        <UserCircle className="w-4 h-4 text-os-text-muted group-hover:text-os-primary transition-colors" />
                        Customers
                    </Link>

                    <p className="px-3 text-[10px] font-bold tracking-widest uppercase text-os-text-muted mb-2 mt-6">Storefront</p>
                    <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-os-bg transition-colors font-medium text-sm text-os-text group">
                        <Package className="w-4 h-4 text-os-text-muted group-hover:text-os-primary transition-colors" />
                        Products
                    </Link>
                    <Link href="/admin/cms" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-os-bg transition-colors font-medium text-sm text-os-text group">
                        <FileText className="w-4 h-4 text-os-text-muted group-hover:text-os-primary transition-colors" />
                        Pages
                    </Link>

                    <p className="px-3 text-[10px] font-bold tracking-widest uppercase text-os-text-muted mb-2 mt-6">Marketing</p>
                    <Link href="/admin/promotions" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-os-bg transition-colors font-medium text-sm text-os-text group">
                        <Tag className="w-4 h-4 text-os-text-muted group-hover:text-os-primary transition-colors" />
                        Discounts
                    </Link>

                    <p className="px-3 text-[10px] font-bold tracking-widest uppercase text-os-text-muted mb-2 mt-6">Configuration</p>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-os-bg transition-colors font-medium text-sm text-os-text group">
                        <Settings className="w-4 h-4 text-os-text-muted group-hover:text-os-primary transition-colors" />
                        Settings
                    </Link>
                </nav>

                <div className="p-3 border-t border-os-border">
                    <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-os-danger/10 text-os-danger transition-colors font-medium text-sm">
                        <LogOut className="w-4 h-4" />
                        Exit Store
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow flex flex-col h-screen overflow-hidden bg-os-bg">
                <div className="p-6 md:p-10 flex-grow overflow-y-auto">
                    <div className="max-w-6xl mx-auto pb-20">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
