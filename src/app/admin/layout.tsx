import React from "react";
import { Toaster } from "sonner";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "./components/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    // Server-side auth guard
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const handleSignOut = async () => {
        'use server';
        const supabase = await createClient();
        await supabase.auth.signOut();
        redirect('/login');
    };

    return (
        <div className="min-h-screen bg-os-bg flex flex-col md:flex-row font-body text-os-text selection:bg-os-primary selection:text-os-primary-fg">
            <Toaster position="top-right" richColors theme="system" />
            <AdminSidebar signOutAction={handleSignOut} />

            {/* Main Content Area */}
            <main className="flex-grow flex flex-col h-screen overflow-hidden bg-os-bg relative">
                <div className="p-4 sm:p-6 md:p-10 flex-grow overflow-y-auto w-full">
                    <div className="max-w-6xl mx-auto pb-20 w-full overflow-x-hidden">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
