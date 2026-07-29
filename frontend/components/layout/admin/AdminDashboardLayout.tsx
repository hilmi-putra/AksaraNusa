"use client";

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { AdminSidebar } from '@/components/layout/admin/sidebar';
import { AdminNavbar } from '@/components/layout/admin/navbar';

export function AdminDashboardLayout({
    title = 'Dashboard',
    pageTitle,
    pageIcon,
    description,
    children,
}: {
    title?: string;
    pageTitle?: string;
    pageIcon?: string;
    description?: string;
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="h-screen w-full flex bg-[#F7F8F2] dark:bg-zinc-950 overflow-hidden font-sans transition-colors duration-300">
            <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                
                <div className="flex-1 min-w-0 w-full flex flex-col h-screen relative">
                    <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    
                    <main className={`flex-1 min-w-0 h-full flex flex-col pt-16 transition-all duration-300 ${sidebarOpen ? "ps-64" : "ps-20"}`}>
                        <div className="flex-1 p-4 font-sans overflow-hidden flex flex-col">
                            <div className="flex-1 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-sm overflow-y-auto custom-scrollbar transition-colors duration-300">
                                {pageTitle && (
                                    <div className="mb-8">
                                        <div className="flex items-center gap-3 mb-2">
                                            {pageIcon && (
                                                <div className="size-10 rounded-xl bg-[#F7F09E] flex items-center justify-center">
                                                    <Icon icon={pageIcon} className="size-5 text-amber-900" />
                                                </div>
                                            )}
                                            <div>
                                                <h1 className="text-xl font-semibold text-gray-900 font-sans leading-tight">
                                                    {pageTitle}
                                                </h1>
                                                {description && (
                                                    <p className="text-sm text-gray-500 mt-0.5">
                                                        {description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
                
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .custom-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}
            </style>
        </div>
    );
}
