"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { 
    LayoutDashboard, BookOpen, Tags, PenTool, Package, Barcode, FileText, 
    DollarSign, ShoppingCart, CreditCard, Truck, Receipt, Undo2, Users, 
    MapPin, Heart, History, Newspaper, Folder, UserCircle, Presentation, 
    Ticket, Megaphone, Mail, Star, Library, Languages, Building2, LineChart, 
    Wallet, Award, Calculator, BarChart3, UserCog, Settings, Plug, Bell, 
    List, Trash2, Menu
} from 'lucide-react';

type MenuItem = {
    label: string;
    icon: any;
    href: string;
    isComingSoon?: boolean;
};

type MenuGroup = {
    title: string;
    items: MenuItem[];
};

export const SIDEBAR_MENUS: MenuGroup[] = [
    {
        title: 'OVERVIEW',
        items: [
            { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' }
        ]
    },
    {
        title: 'MANAJEMEN BUKU',
        items: [
            { label: 'Buku', icon: BookOpen, href: '/admin/books' },
            { label: 'Kategori & Genre', icon: Tags, href: '/admin/categories' },
            { label: 'Penulis', icon: PenTool, href: '/admin/authors' },
            { label: 'Stok & Inventory', icon: Package, href: '/admin/books/inventory' },
            { label: 'ISBN', icon: Barcode, href: '/admin/books/isbn' },
            { label: 'File Digital', icon: FileText, href: '/admin/books/digital' },
            { label: 'Harga & Promo', icon: DollarSign, href: '/admin/books/pricing' },
        ]
    },
    {
        title: 'E-MARKETPLACE',
        items: [
            { label: 'Pesanan & Transaksi', icon: ShoppingCart, href: '#', isComingSoon: true },
            { label: 'Pelanggan', icon: Users, href: '#', isComingSoon: true },
            { label: 'Laporan Penjualan', icon: LineChart, href: '#', isComingSoon: true },
        ]
    },
    {
        title: 'BLOG & KONTEN',
        items: [
            { label: 'Artikel', icon: Newspaper, href: '/admin/blog/posts' },
            { label: 'Kategori', icon: Folder, href: '/admin/blog/categories' },
            { label: 'Tag', icon: Tags, href: '/admin/blog/tags' },
            { label: 'Author', icon: UserCircle, href: '/admin/blog/authors' },
        ]
    },
    {
        title: 'MARKETING',
        items: [
            { label: 'Banner Homepage', icon: Presentation, href: '/admin/marketing/banners' },
            { label: 'Voucher & Promo', icon: Ticket, href: '/admin/marketing/vouchers' },
            { label: 'Campaign', icon: Megaphone, href: '/admin/marketing/campaigns' },
        ]
    },
    {
        title: 'PENGGUNA & SISTEM',
        items: [
            { label: 'Admin & Role', icon: UserCog, href: '/admin/system/roles' },
            { label: 'Pengaturan', icon: Settings, href: '/admin/system/settings' },
        ]
    }
];

export function AdminSidebar({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    const pathname = usePathname();

    const handleComingSoon = (e: React.MouseEvent) => {
        e.preventDefault();
        toast.info('Coming Soon', {
            description: 'Fitur sistem E-Marketplace ini sedang dalam tahap pengembangan.'
        });
    };

    return (
        <aside
            className={`transition-all duration-300 transform fixed inset-y-0 start-0 z-50 bg-[#F7F8F2] dark:bg-zinc-950 border-r border-transparent dark:border-zinc-800 font-sans flex flex-col ${open ? 'w-64 translate-x-0' : 'w-20 translate-x-0'}`}
        >
            <div className={`flex-none h-16 flex items-center transition-all duration-300 ${open ? 'px-4' : 'px-4 justify-center'}`}>
                <Link href="/admin/dashboard" className={`flex items-center transition-all duration-300 ${open ? 'gap-x-3 w-full' : 'gap-x-0 w-auto justify-center'}`}>
                    <div className="size-10 bg-white rounded-xl flex items-center justify-center shadow-sm p-1.5 shrink-0 overflow-hidden border border-gray-50">
                        <img 
                            src="https://ik.imagekit.io/yqhp1cmbp/favicon?updatedAt=1785316791934"
                            alt="Aksara Nusa Logo" 
                            className="w-full h-full object-contain" 
                        />
                    </div>
                    <span className={`text-xl tracking-tight font-bold whitespace-nowrap overflow-hidden transition-all duration-300 flex items-center gap-1.5 ${!open && 'w-0 opacity-0'}`}>
                        <span className="text-[#004A8F]">Aksara</span>
                        <span className="text-[#EF7A08]">Nusa</span>
                    </span>
                </Link>
            </div>
            
            <div className="relative flex flex-col flex-1 min-h-0">
                <nav className="p-3 flex-1 overflow-y-auto custom-scrollbar">
                    {SIDEBAR_MENUS.map((group, index) => (
                        <div key={index} className="mb-6 last:mb-0">
                            <div className={`flex items-center justify-between ps-3 mb-2 ${!open && 'ps-0 justify-center'}`}>
                                {open && (
                                    <span className="font-bold text-[10px] uppercase tracking-wider text-gray-400 font-sans">
                                        {group.title}
                                    </span>
                                )}
                                {index === 0 && (
                                    <button onClick={() => setOpen(!open)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors">
                                        <Menu className="size-4" />
                                    </button>
                                )}
                            </div>
                            <ul className="mt-1 flex flex-col gap-y-0.5">
                                {group.items.map((item, i) => {
                                    const allHrefs = SIDEBAR_MENUS.flatMap(g => g.items.map(i => i.href));
                                    const currentActiveHref = allHrefs
                                        .filter(href => pathname === href || pathname.startsWith(href + '/'))
                                        .sort((a, b) => b.length - a.length)[0];

                                    const isActive = item.href === currentActiveHref && !item.isComingSoon;
                                    const IconComponent = item.icon;
                                    
                                    if (item.isComingSoon) {
                                        return (
                                            <li key={i}>
                                                <a 
                                                    href={item.href}
                                                    onClick={handleComingSoon}
                                                    className={`w-full flex items-center gap-x-3 py-2 px-3 text-sm rounded-xl transition-all duration-200 group font-normal text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900/50 ${!open && 'justify-center px-0'}`}
                                                >
                                                    <IconComponent className="shrink-0 size-5 text-gray-500 group-hover:text-[#004A8F]" />
                                                    {open && <span className="flex-1 truncate">{item.label}</span>}
                                                </a>
                                            </li>
                                        );
                                    }

                                    return (
                                        <li key={i}>
                                            <Link 
                                                href={item.href}
                                                className={`w-full flex items-center gap-x-3 py-2 px-3 text-sm rounded-xl transition-all duration-200 group font-normal ${isActive ? 'bg-[#004A8F] text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900/50'} ${!open && 'justify-center px-0'}`}
                                            >
                                                <IconComponent className={`shrink-0 size-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#004A8F]'}`} />
                                                {open && <span className="flex-1 truncate">{item.label}</span>}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
