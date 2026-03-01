"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, ShoppingCart, Settings, LogOut, Home, UserCircle, FileText, Tag, Menu, X } from "lucide-react";

export function AdminSidebar({ signOutAction }: { signOutAction: () => Promise<void> }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close sidebar when route changes on mobile
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Mobile Header - Only visible on small screens */}
            <div className="md:hidden flex items-center justify-between bg-os-surface border-b border-os-border p-4 sticky top-0 z-30">
                <Link href="/admin" className="font-display font-bold text-xl text-os-primary tracking-tight flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-os-primary text-os-primary-fg flex items-center justify-center text-xs">K</span>
                    Kumoo OS
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-os-text rounded-md hover:bg-os-bg transition-colors"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Backdrop */}
            <div
                className={`fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`fixed md:relative top-0 bottom-0 left-0 z-50 w-[260px] bg-os-surface border-r border-os-border shrink-0 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="p-5 border-b border-os-border hidden md:flex items-center justify-between">
                    <div>
                        <Link href="/admin" className="font-display font-bold text-xl text-os-primary tracking-tight flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-os-primary text-os-primary-fg flex items-center justify-center text-xs">K</span>
                            Kumoo OS
                        </Link>
                    </div>
                </div>

                <div className="flex-grow p-3 space-y-1 overflow-y-auto">
                    <p className="px-3 text-[10px] font-bold tracking-widest uppercase text-os-text-muted mb-2 mt-2">Overview</p>
                    <Link href="/admin" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium text-sm group ${pathname === '/admin' ? 'bg-os-bg text-os-primary' : 'hover:bg-os-bg text-os-text'}`}>
                        <Home className={`w-4 h-4 transition-colors ${pathname === '/admin' ? 'text-os-primary' : 'text-os-text-muted group-hover:text-os-primary'}`} />
                        Dashboard
                    </Link>
                    <Link href="/admin/orders" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium text-sm group ${pathname.startsWith('/admin/orders') ? 'bg-os-bg text-os-primary' : 'hover:bg-os-bg text-os-text'}`}>
                        <ShoppingCart className={`w-4 h-4 transition-colors ${pathname.startsWith('/admin/orders') ? 'text-os-primary' : 'text-os-text-muted group-hover:text-os-primary'}`} />
                        Orders
                    </Link>
                    <Link href="/admin/customers" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium text-sm group ${pathname.startsWith('/admin/customers') ? 'bg-os-bg text-os-primary' : 'hover:bg-os-bg text-os-text'}`}>
                        <UserCircle className={`w-4 h-4 transition-colors ${pathname.startsWith('/admin/customers') ? 'text-os-primary' : 'text-os-text-muted group-hover:text-os-primary'}`} />
                        Customers
                    </Link>

                    <p className="px-3 text-[10px] font-bold tracking-widest uppercase text-os-text-muted mb-2 mt-6">Storefront</p>
                    <Link href="/admin/products" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium text-sm group ${pathname.startsWith('/admin/products') ? 'bg-os-bg text-os-primary' : 'hover:bg-os-bg text-os-text'}`}>
                        <Package className={`w-4 h-4 transition-colors ${pathname.startsWith('/admin/products') ? 'text-os-primary' : 'text-os-text-muted group-hover:text-os-primary'}`} />
                        Products
                    </Link>
                    <Link href="/admin/cms" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium text-sm group ${pathname.startsWith('/admin/cms') ? 'bg-os-bg text-os-primary' : 'hover:bg-os-bg text-os-text'}`}>
                        <FileText className={`w-4 h-4 transition-colors ${pathname.startsWith('/admin/cms') ? 'text-os-primary' : 'text-os-text-muted group-hover:text-os-primary'}`} />
                        Pages
                    </Link>

                    <p className="px-3 text-[10px] font-bold tracking-widest uppercase text-os-text-muted mb-2 mt-6">Marketing</p>
                    <Link href="/admin/promotions" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium text-sm group ${pathname.startsWith('/admin/promotions') ? 'bg-os-bg text-os-primary' : 'hover:bg-os-bg text-os-text'}`}>
                        <Tag className={`w-4 h-4 transition-colors ${pathname.startsWith('/admin/promotions') ? 'text-os-primary' : 'text-os-text-muted group-hover:text-os-primary'}`} />
                        Discounts
                    </Link>

                    <p className="px-3 text-[10px] font-bold tracking-widest uppercase text-os-text-muted mb-2 mt-6">Configuration</p>
                    <Link href="/admin/settings" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium text-sm group ${pathname.startsWith('/admin/settings') ? 'bg-os-bg text-os-primary' : 'hover:bg-os-bg text-os-text'}`}>
                        <Settings className={`w-4 h-4 transition-colors ${pathname.startsWith('/admin/settings') ? 'text-os-primary' : 'text-os-text-muted group-hover:text-os-primary'}`} />
                        Settings
                    </Link>
                </div>

                <div className="p-3 border-t border-os-border mt-auto">
                    <form action={signOutAction}>
                        <button type="submit" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-os-danger/10 text-os-danger transition-colors font-medium text-sm w-full">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>
        </>
    );
}
