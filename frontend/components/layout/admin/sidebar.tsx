"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

type MenuItem = {
    label: string;
    icon: string;
    href: string;
    active?: boolean;
};

type MenuGroup = {
    title: string;
    items: MenuItem[];
};

export const SIDEBAR_MENUS: MenuGroup[] = [
    {
        title: 'OVERVIEW',
        items: [
            { label: 'Dashboard', icon: 'ph:squares-four-duotone', href: '/admin/dashboard' }
        ]
    },
    {
        title: 'MANAJEMEN BUKU',
        items: [
            { label: 'Buku', icon: 'ph:book-bookmark-duotone', href: '/admin/books' },
            { label: 'Kategori & Genre', icon: 'ph:tag-duotone', href: '/admin/categories' },
            { label: 'Penulis', icon: 'ph:pen-nib-duotone', href: '/admin/authors' },
            { label: 'Stok & Inventory', icon: 'ph:package-duotone', href: '/admin/books/inventory' },
            { label: 'ISBN', icon: 'ph:barcode-duotone', href: '/admin/books/isbn' },
            { label: 'File Digital (E-book)', icon: 'ph:file-pdf-duotone', href: '/admin/books/digital' },
            { label: 'Harga & Promo', icon: 'ph:currency-circle-dollar-duotone', href: '/admin/books/pricing' },
        ]
    },

    {
        title: 'PESANAN & TRANSAKSI',
        items: [
            { label: 'Pesanan', icon: 'ph:shopping-cart-duotone', href: '/admin/orders' },
            { label: 'Pembayaran', icon: 'ph:credit-card-duotone', href: '/admin/payments' },
            { label: 'Pengiriman', icon: 'ph:truck-duotone', href: '/admin/shipping' },
            { label: 'Invoice', icon: 'ph:receipt-duotone', href: '/admin/invoices' },
            { label: 'Refund', icon: 'ph:arrow-u-up-left-duotone', href: '/admin/refunds' },
        ]
    },
    {
        title: 'PELANGGAN',
        items: [
            { label: 'Data Pelanggan', icon: 'ph:users-duotone', href: '/admin/customers' },
            { label: 'Alamat', icon: 'ph:map-pin-duotone', href: '/admin/customers/addresses' },
            { label: 'Wishlist', icon: 'ph:heart-duotone', href: '/admin/customers/wishlists' },
            { label: 'Riwayat Pembelian', icon: 'ph:clock-counter-clockwise-duotone', href: '/admin/customers/history' },
        ]
    },
    {
        title: 'BLOG & KONTEN',
        items: [
            { label: 'Artikel', icon: 'ph:article-duotone', href: '/admin/blog/posts' },
            { label: 'Kategori', icon: 'ph:folders-duotone', href: '/admin/blog/categories' },
            { label: 'Tag', icon: 'ph:tag-duotone', href: '/admin/blog/tags' },
            { label: 'Author', icon: 'ph:user-circle-duotone', href: '/admin/blog/authors' },
        ]
    },
    {
        title: 'MARKETING',
        items: [
            { label: 'Banner Homepage', icon: 'ph:presentation-chart-duotone', href: '/admin/marketing/banners' },
            { label: 'Voucher & Promo', icon: 'ph:ticket-duotone', href: '/admin/marketing/vouchers' },
            { label: 'Campaign', icon: 'ph:megaphone-duotone', href: '/admin/marketing/campaigns' },
            { label: 'Newsletter', icon: 'ph:envelope-simple-duotone', href: '/admin/marketing/newsletter' },
            { label: 'Review & Rating', icon: 'ph:star-duotone', href: '/admin/marketing/reviews' },
        ]
    },
    {
        title: 'MASTER DATA',
        items: [
            { label: 'Kategori Buku', icon: 'ph:books-duotone', href: '/admin/master-data/categories' },
            { label: 'Bahasa', icon: 'ph:translate-duotone', href: '/admin/master-data/languages' },
            { label: 'Penerbit', icon: 'ph:buildings-duotone', href: '/admin/master-data/publishers' },
            { label: 'Supplier', icon: 'ph:truck-duotone', href: '/admin/master-data/suppliers' },
        ]
    },
    {
        title: 'LAPORAN & KEUANGAN',
        items: [
            { label: 'Laporan Penjualan', icon: 'ph:chart-line-up-duotone', href: '/admin/reports/sales' },
            { label: 'Revenue', icon: 'ph:money-duotone', href: '/admin/reports/revenue' },
            { label: 'Produk Terlaris', icon: 'ph:medal-duotone', href: '/admin/reports/top-products' },
            { label: 'Royalti & Keuangan', icon: 'ph:calculator-duotone', href: '/admin/reports/royalties' },
            { label: 'Analytics Trafik', icon: 'ph:chart-bar-duotone', href: '/admin/reports/traffic' },
        ]
    },
    {
        title: 'PENGGUNA & SISTEM',
        items: [
            { label: 'Admin & Role', icon: 'ph:user-gear-duotone', href: '/admin/system/roles' },
            { label: 'Pengaturan Website', icon: 'ph:gear-duotone', href: '/admin/system/settings' },
            { label: 'Integrasi', icon: 'ph:plug-duotone', href: '/admin/system/integrations' },
            { label: 'Notifikasi', icon: 'ph:bell-duotone', href: '/admin/system/notifications' },
        ]
    },
    {
        title: 'LAINNYA',
        items: [
            { label: 'Activity Logs', icon: 'ph:list-dashes-duotone', href: '/admin/logs' },
            { label: 'Recycle Bin', icon: 'ph:trash-duotone', href: '/admin/recycle-bin' },
        ]
    }
];

export function AdminSidebar({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    const pathname = usePathname();

    return (
        <aside
            className={`transition-all duration-300 transform fixed inset-y-0 start-0 z-50 bg-[#F7F8F2] dark:bg-zinc-950 border-r border-transparent dark:border-zinc-800 font-sans flex flex-col ${open ? 'w-64 translate-x-0' : 'w-20 translate-x-0'}`}
        >
            <div className={`flex-none h-16 flex items-center transition-all duration-300 ${open ? 'px-4' : 'px-4 justify-center'}`}>
                <Link href="/admin/dashboard" className={`flex items-center transition-all duration-300 ${open ? 'gap-x-3 w-full' : 'gap-x-0 w-auto justify-center'}`}>
                    <div className="size-10 bg-white rounded-xl flex items-center justify-center shadow-sm p-1.5 shrink-0">
                        <img 
                            src="https://ik.imagekit.io/yqhp1cmbp/logo_megapress.svg" 
                            alt="Megapress Logo" 
                            className="size-full object-contain" 
                        />
                    </div>
                    <span className={`text-gray-900 dark:text-zinc-100 text-xl tracking-tight font-bold whitespace-nowrap overflow-hidden transition-all duration-300 ${!open && 'w-0 opacity-0'}`}>
                        Megapress
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
                                    <button onClick={() => setOpen(!open)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                                        <Icon icon={open ? "ph:list" : "ph:list"} className="size-4" />
                                    </button>
                                )}
                            </div>
                            <ul className="mt-1 flex flex-col gap-y-0.5">
                                {group.items.map((item, i) => {
                                    // Temukan href yang paling spesifik (paling panjang) yang cocok dengan pathname saat ini
                                    const allHrefs = SIDEBAR_MENUS.flatMap(g => g.items.map(i => i.href));
                                    const currentActiveHref = allHrefs
                                        .filter(href => pathname === href || pathname.startsWith(href + '/'))
                                        .sort((a, b) => b.length - a.length)[0];

                                    const isActive = item.href === currentActiveHref;
                                    
                                    return (
                                        <li key={i}>
                                            <Link 
                                                href={item.href}
                                                className={`w-full flex items-center gap-x-3 py-2 px-3 text-sm rounded-xl transition-all duration-200 group font-normal ${isActive ? 'bg-[#F7F09E] dark:bg-amber-900 text-amber-950 dark:text-amber-100 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900/50'} ${!open && 'justify-center px-0'}`}
                                            >
                                                <Icon icon={item.icon} className={`shrink-0 size-5 ${isActive ? 'text-amber-900' : 'text-gray-500 group-hover:text-amber-700'}`} />
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
