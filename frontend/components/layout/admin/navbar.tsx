"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api, { TOKEN_COOKIE, USER_COOKIE } from '@/lib/api';
import { useBreadcrumb, BreadcrumbItem } from '@/contexts/BreadcrumbContext';
import { SIDEBAR_MENUS } from './sidebar';
import {
  Breadcrumb,
  BreadcrumbItem as BreadcrumbItemUI,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function AdminNavbar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (open: boolean) => void }) {
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const { theme, setTheme } = useTheme();
    const [user, setUser] = useState<any>(null);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { items: contextBreadcrumbs } = useBreadcrumb();

    const generateBreadcrumbs = () => {
        if (!pathname || pathname === '/admin/dashboard') return [];
        
        const segments = pathname.split('/').filter(Boolean);
        let currentPath = '';
        const breadcrumbs: BreadcrumbItem[] = [];
        
        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            currentPath += `/${segment}`;
            
            if (i === 0 && segment === 'admin') continue;
            
            let label = segment;
            let found = false;
            
            for (const group of SIDEBAR_MENUS) {
                for (const item of group.items) {
                    if (item.href === currentPath) {
                        label = item.label;
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
            
            if (!found) {
                label = label.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            }

            breadcrumbs.push({
                label,
                href: i === segments.length - 1 ? undefined : currentPath
            });
        }
        
        return breadcrumbs;
    };
    
    const breadcrumbItems = contextBreadcrumbs.length > 0 ? contextBreadcrumbs : generateBreadcrumbs();

    useEffect(() => {
        setMounted(true);
        const userCookie = Cookies.get(USER_COOKIE);
        if (userCookie) {
            try {
                setUser(JSON.parse(userCookie));
            } catch (e) {
                console.error("Failed to parse user cookie", e);
            }
        }
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            Cookies.remove(TOKEN_COOKIE);
            Cookies.remove(USER_COOKIE);
            router.push('/login');
        }
    };

    return (
        <header className={`fixed top-0 right-0 h-16 flex items-center z-40 bg-[#F7F8F2]/80 dark:bg-zinc-950/80 backdrop-blur-md text-sm border-b border-gray-100 dark:border-zinc-800 transition-all duration-300 font-sans ${sidebarOpen ? "left-64" : "left-20"}`}>
            <nav className="px-4 sm:px-8 flex basis-full items-center w-full mx-auto justify-between">
                <div className="flex items-center gap-x-4">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                        <Icon icon="ph:list" className="size-5" />
                    </button>
                    
                    {/* Dynamic Breadcrumb */}
                    <div className="hidden sm:block">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItemUI>
                                    <BreadcrumbLink render={<Link href="/admin/dashboard" />}>
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItemUI>
                                {breadcrumbItems.map((item: BreadcrumbItem, index: number) => (
                                    <React.Fragment key={index}>
                                        <BreadcrumbSeparator>
                                            <Icon icon="ph:caret-right" className="size-3.5 text-gray-300" />
                                        </BreadcrumbSeparator>
                                        <BreadcrumbItemUI>
                                            {index === breadcrumbItems.length - 1 || !item.href ? (
                                                <BreadcrumbPage className="max-w-[200px] truncate font-medium text-gray-900 dark:text-zinc-100">
                                                    {item.label}
                                                </BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink render={<Link href={item.href} />}>
                                                    {item.label}
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItemUI>
                                    </React.Fragment>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>

                <div className="flex items-center gap-x-4">
                    <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                        <Icon icon="ph:bell-duotone" className="size-5" />
                    </button>
                    <div className="flex items-center gap-x-3 ps-4 border-s border-gray-200">
                        <div className="hidden md:flex flex-col items-end text-right">
                            <span className="text-sm font-medium text-gray-900 dark:text-zinc-100 leading-tight">
                                {user?.name || 'megapress'}
                            </span>
                            <span className="text-[11px] text-gray-400 font-normal">
                                {user?.email || 'superadmin@megapress.co.id'}
                            </span>
                        </div>
                        <div className="relative" ref={profileRef}>
                            <button 
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="inline-flex shrink-0 items-center gap-x-3 rounded-full hover:ring-4 hover:ring-gray-100 transition-all focus:outline-none"
                            >
                                <img className="shrink-0 size-9 rounded-full object-cover" src={user?.avatar || "https://ui-avatars.com/api/?name=Admin&background=F7F09E&color=5C5815"} alt="Profile" />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="px-4 py-3 mx-2 mb-2 bg-gray-50/80 dark:bg-zinc-800/80 rounded-lg">
                                        <p className="text-[15px] font-bold text-slate-800 dark:text-slate-200 capitalize">{user?.role || 'Super Admin'}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{user?.email || 'superadmin@arkacorp.co.id'}</p>
                                    </div>
                                    
                                    <Link href="/admin/profile" className="flex items-center gap-3 px-5 py-2.5 text-[15px] font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                                        <Icon icon="ph:user" className="size-5" />
                                        Your Profile
                                    </Link>
                                    {mounted && (
                                        <button 
                                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                            className="w-full flex items-center gap-3 px-5 py-2.5 text-[15px] font-medium text-slate-700 hover:bg-slate-50 transition-colors dark:text-slate-200 dark:hover:bg-slate-800"
                                        >
                                            <Icon icon={theme === 'dark' ? "ph:sun" : "ph:moon"} className="size-5" />
                                            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                                        </button>
                                    )}
                                    
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-5 py-2.5 mt-1 text-[15px] font-bold text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <Icon icon="ph:sign-out" className="size-5" />
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
