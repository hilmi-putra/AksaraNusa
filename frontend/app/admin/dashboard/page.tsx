"use client";

import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@iconify/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import Link from 'next/link';
import { AdminDashboardLayout } from '@/components/layout/admin/AdminDashboardLayout';

const PieChartCard = React.memo(({ title, data = {}, total = 0 }: any) => {
    // Colors matching mockup design system
    const COLORS = {
        validate: '#EAE06A',
        progress: '#F7F09E',
        revisions: '#4CAF50',
        pending: '#2E7D32',
        finished: '#D4C953'
    } as any;

    const chartData = [
        { name: 'Validate', value: data.validate || 0, color: COLORS.validate },
        { name: 'Finished', value: data.finished || 0, color: COLORS.finished },
        { name: 'Pending', value: data.pending || 0, color: COLORS.pending },
        { name: 'Revisions', value: data.revisions || 0, color: COLORS.revisions },
        { name: 'Progress', value: data.progress || 0, color: COLORS.progress },
    ].filter(item => item.value > 0);

    const completionRate = total > 0 ? Math.round(((data.finished || 0) / total) * 100) : 0;
    const progressRate = total > 0 ? Math.round(((data.progress || 0) / total) * 100) : 0;

    return (
        <Card className="rounded-[2rem] border-gray-100 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm overflow-hidden flex flex-col h-full relative transition-colors duration-300">
            <CardContent className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-gray-800 dark:text-zinc-100 font-sans text-lg transition-colors duration-300">{title}</h3>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1 transition-colors duration-300">
                        Completion <span className="text-red-500 flex items-center"><Icon icon="ph:trend-down-duotone" className="size-3 mr-1"/> {completionRate}%</span>
                    </div>
                </div>
                
                <div className="flex justify-end mb-2 relative z-10">
                    <div className="bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-lg px-3 py-1 flex items-center gap-2 text-xs font-semibold shadow-sm transition-colors duration-300">
                        <div className="size-2 rounded-sm bg-[#F7F09E] dark:bg-amber-500"></div>
                        <span className="text-gray-600 dark:text-gray-300 text-[10px] transition-colors duration-300">Progress : {data.progress || 0}</span>
                        <span className="text-gray-400 pl-2 border-l border-gray-100 dark:border-zinc-700 transition-colors duration-300">{progressRate}%</span>
                    </div>
                </div>

                <div className="flex-grow min-h-[220px] relative w-full -mt-8">
                    {total > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={0}
                                    outerRadius={85}
                                    dataKey="value"
                                    labelLine={false}
                                    isAnimationActive={true}
                                    animationBegin={0}
                                    animationDuration={1200}
                                    animationEasing="ease-out"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#1f2937', fontWeight: 'bold', fontFamily: 'inherit' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">No Data</div>
                    )}
                </div>
                
                <div className="mt-auto pt-2 text-xs font-semibold text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    Total: {total}
                </div>
            </CardContent>
        </Card>
    );
});
PieChartCard.displayName = 'PieChartCard';

const ClockWidget = () => {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
        setCurrentTime(new Date());
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!currentTime) return null;

    const timeString = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':');
    const dateHeroString = currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();

    return (
        <div className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-3xl p-6 md:px-10 text-center shadow-[0_8px_32px_0_rgba(247,240,158,0.3)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/50 dark:border-zinc-700/50 flex-shrink-0 min-w-[240px]">
            <p className="text-[11px] font-bold text-amber-950/70 dark:text-amber-100/70 mb-3 uppercase tracking-wider">{dateHeroString}</p>
            <h2 className="text-5xl md:text-6xl font-black text-amber-950 dark:text-amber-100 tracking-tighter mb-4 leading-none font-sans">
                {timeString}
            </h2>
            <div className="inline-block bg-white/60 dark:bg-zinc-800/60 border border-white/50 dark:border-zinc-700/50 text-amber-900 dark:text-amber-200 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">
                WIB
            </div>
        </div>
    );
};

const HeaderPill = () => {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
        setCurrentTime(new Date());
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!currentTime) return null;

    const timeString = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':');
    const datePillString = currentTime.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });

    return (
        <div className="flex items-center rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden font-sans transition-colors duration-300">
            <div className="bg-[#F7F09E] dark:bg-amber-900 text-amber-950 dark:text-amber-100 px-5 py-2 text-sm font-bold border-r border-[#EAE06A] dark:border-amber-700 transition-colors duration-300">
                {timeString}
            </div>
            <div className="px-5 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 transition-colors duration-300">
                {datePillString}
            </div>
        </div>
    );
};

export default function AdminDashboardPage() {
    // Dummy Data
    const webDevStatus = { validate: 12, finished: 45, pending: 5, revisions: 3, progress: 10 };
    const publisherStatus = { validate: 2, finished: 15, pending: 1, revisions: 0, progress: 4 };
    const journalStatus = { validate: 8, finished: 30, pending: 2, revisions: 1, progress: 7 };
    const generalStatus = { validate: 5, finished: 20, pending: 3, revisions: 2, progress: 8 };
    const workOrdersPerBrand = [] as any[];
    const recentActivities = [
        { ref_id: 'ORDER-1234', status: 'Selesai', entity: 'Novel A', date: new Date().toISOString() },
        { ref_id: 'REV-1235', status: 'Proses', entity: 'Buku Ajar B', date: new Date(Date.now() - 86400000).toISOString() },
    ] as any[];
    
    const user = { name: 'Admin aksaranusa' };

    const topBrandsList = workOrdersPerBrand?.map((brand, index) => (
        <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="size-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                    {brand?.brand_name?.charAt(0) || 'B'}
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-800">{brand?.brand_name || 'Unknown Brand'}</p>
                    <p className="text-xs font-semibold text-gray-500">
                        {brand?.total_work_orders !== undefined ? `${brand.total_work_orders} Pesanan` : (brand?.formatted_revenue || 'Rp 0')}
                    </p>
                </div>
            </div>
            <div className="relative flex items-center justify-center">
                {index < 3 ? (
                    <>
                        <Icon icon="ph:medal-duotone" className={`size-6 ${index === 0 ? 'text-amber-400' : index === 1 ? 'text-gray-400' : 'text-amber-700'}`} />
                        <span className="absolute text-[8px] font-bold text-white mb-[2px]">{index + 1}</span>
                    </>
                ) : (
                    <div className="size-6 flex items-center justify-center bg-gray-50 rounded-full border border-gray-100">
                        <span className="text-[10px] font-bold text-gray-400">{index + 1}</span>
                    </div>
                )}
            </div>
        </div>
    ));

    const recentActivitiesList = recentActivities?.slice(0, 5).map((activity, index) => {
        const rtf = new Intl.RelativeTimeFormat('id', { numeric: 'auto' });
        const daysDifference = Math.round((new Date(activity.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        const timeAgo = daysDifference === 0 ? 'hari ini' : daysDifference < 0 ? rtf.format(daysDifference, 'day') : rtf.format(-daysDifference, 'day');

        const note = `Status ${activity.status} untuk ${activity.secondary_entity ? `${activity.entity} (${activity.secondary_entity})` : activity.entity}`;

        return (
            <div
                key={index}
                className="flex gap-3 relative pb-4 before:absolute before:left-[11px] before:top-6 before:bottom-0 before:w-px before:bg-gray-100 dark:before:bg-neutral-700 last:before:hidden"
            >
                <div className="w-6 h-6 rounded-full bg-[#F7F09E]/50 text-amber-900 flex items-center justify-center flex-shrink-0 z-10 shadow-sm border border-[#F7F09E]">
                    <Icon
                        icon="ph:check-bold"
                        className="size-3.5"
                    />
                </div>
                <div className="pt-0.5">
                    <p className="text-[13px] font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                        {activity.ref_id}
                    </p>
                    <p className="text-[11.5px] text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                        {note}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium mt-1.5 flex items-center gap-1">
                        <Icon
                            icon="ph:clock-duotone"
                            className="size-3"
                        />
                        {timeAgo === 'hari ini' ? 'Hari ini' : timeAgo}
                    </p>
                </div>
            </div>
        );
    });

    const sidebarContent = (
        <div className="w-full h-full flex flex-col gap-8">
            <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 font-sans mb-6 transition-colors duration-300">Insight</h3>
                
                <div className="mb-8">
                    <h4 className="text-xs font-bold text-gray-400 font-sans flex items-center gap-2 mb-4 uppercase tracking-wider">
                        <div className="w-1 h-3 bg-[#F7F09E] rounded-full"></div>
                        Top Publisher
                    </h4>
                    <div className="space-y-5">
                        {workOrdersPerBrand && workOrdersPerBrand.length > 0 ? topBrandsList : <p className="text-xs text-gray-400">Belum ada data</p>}
                    </div>
                </div>
                
                <hr className="border-gray-100 mb-6" />
                
                <div>
                    <h4 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase flex items-center gap-2 mb-4">
                        <div className="w-1 h-3.5 bg-[#F7F09E] rounded-full"></div>
                        AKTIVITAS TERBARU
                    </h4>
                    
                    <div className="space-y-0">
                        {recentActivities && recentActivities.length > 0 ? recentActivitiesList : <p className="text-xs text-gray-400">Belum ada aktivitas</p>}
                    </div>
                </div>
            </div>
        </div>
    );

    const getStatusTotal = (statusObj: any) => {
        if (!statusObj) return 0;
        return Object.entries(statusObj)
            .filter(([key]) => ['validate', 'queue', 'pending', 'progress', 'revisions', 'finished'].includes(key))
            .reduce((sum, [, val]) => sum + ((val as number) || 0), 0);
    };

    return (
        <AdminDashboardLayout 
            title="Dashboard Admin"
            sidebar={sidebarContent}
        >
            <div className="space-y-8 font-sans">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 font-sans transition-colors duration-300">Dashboard</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium transition-colors duration-300">aksaranusa Admin Panel</p>
                    </div>
                    
                    {/* Top Right Pill */}
                    <HeaderPill />
                </div>

                {/* HERO SECTION */}
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#F7F09E] via-[#F2E874] to-[#E3DA66] dark:from-zinc-800 dark:via-zinc-800/90 dark:to-zinc-800/80 p-8 md:p-10 shadow-sm border border-[#E3DA66]/50 dark:border-zinc-700 transition-colors duration-300">
                    {/* Decorative pattern/icons */}
                    <Icon icon="ph:sparkle-fill" className="absolute top-8 right-[30%] size-24 text-amber-900/10 dark:text-amber-100/10 rotate-12" />
                    <Icon icon="ph:sparkle-light" className="absolute -bottom-10 left-1/4 size-48 text-amber-900/5 dark:text-amber-100/5" />
                    <Icon icon="ph:star-four-fill" className="absolute top-1/2 right-12 size-16 text-amber-900/10 dark:text-amber-100/10" />
                    <Icon icon="ph:star-four-bold" className="absolute bottom-8 right-[40%] size-10 text-amber-900/10 dark:text-amber-100/10" />
                    
                    <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
                        <div className="text-gray-900 dark:text-zinc-100 max-w-xl transition-colors duration-300">
                            <h1 className="text-4xl md:text-5xl font-bold font-sans tracking-tight mb-3 text-gray-900 dark:text-zinc-100 transition-colors duration-300">
                                Selamat Datang, {user?.name?.split(' ')[0] || 'User'}
                            </h1>
                            <p className="text-gray-800 dark:text-zinc-300 text-sm md:text-base font-medium leading-relaxed opacity-90 transition-colors duration-300">
                                Lanjutkan aktivitas manajerial dan pastikan semua<br className="hidden md:block" /> penerbitan berjalan lancar hari ini. Semangat!
                            </p>
                        </div>
                        
                        {/* Clock Widget */}
                        <ClockWidget />
                    </div>
                </div>


            </div>
        </AdminDashboardLayout>
    );
}
