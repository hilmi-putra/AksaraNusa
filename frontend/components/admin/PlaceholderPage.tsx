"use client";

import React, { useEffect } from 'react';
import { AdminDashboardLayout } from '@/components/layout/admin/AdminDashboardLayout';
import { Icon } from '@iconify/react';
import { useBreadcrumb } from '@/contexts/BreadcrumbContext';

interface PlaceholderPageProps {
    title: string;
    description?: string;
    icon?: string;
}

export function PlaceholderPage({ title, description, icon = 'ph:hammer-duotone' }: PlaceholderPageProps) {
    const { setItems } = useBreadcrumb();

    useEffect(() => {
        setItems([{ label: title }]);
    }, [title, setItems]);

    return (
        <AdminDashboardLayout
            pageTitle={title}
            pageIcon={icon}
            description={description || `Halaman ini sedang dalam tahap pengembangan.`}
        >
            <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 mt-6">
                <div className="size-20 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-[#F7F09E] border border-gray-100">
                    <Icon icon="ph:cone-duotone" className="size-10 text-amber-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-sans">
                    Content Coming Soon
                </h2>
                <p className="text-gray-500 max-w-md font-sans">
                    Modul <strong>{title}</strong> belum diimplementasikan. Halaman ini digunakan sebagai placeholder untuk menjaga struktur routing.
                </p>
                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-full border border-amber-100">
                    <Icon icon="ph:info-duotone" className="size-4" />
                    <span>Fitur sedang dikembangkan</span>
                </div>
            </div>
        </AdminDashboardLayout>
    );
}
