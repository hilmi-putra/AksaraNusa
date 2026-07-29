"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package, BookOpen, Clock, Heart } from "lucide-react";
import { getDashboardSummary } from "@/lib/api/user";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils";

export default function DashboardIndexPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardSummary()
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-border p-8 flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse flex flex-col items-center">
          <Package className="w-10 h-10 text-gray-200 mb-4 animate-bounce" />
          <p className="text-gray-400 font-medium">Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  const statsObj = data?.stats || {
    total_orders: 0,
    books_purchased: 0,
    pending_payment: 0,
    wishlist_count: 0
  };

  const stats = [
    { title: "Total Pesanan", value: statsObj.total_orders, icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Buku Dibeli", value: statsObj.books_purchased, icon: BookOpen, color: "text-green-500", bg: "bg-green-50" },
    { title: "Menunggu Pembayaran", value: statsObj.pending_payment, icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Buku Favorit", value: statsObj.wishlist_count, icon: Heart, color: "text-red-500", bg: "bg-red-50" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="p-6 md:p-8 border-b border-gray-100">
        <h2 className="text-2xl font-black text-[#171512] uppercase tracking-tighter mb-1 font-sans">DASHBOARD</h2>
        <p className="text-sm text-gray-500">Ringkasan aktivitas akun dan pesanan Anda.</p>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <Card key={idx} className="border-gray-100 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`size-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 leading-none mt-1">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Pesanan Terbaru</h3>
            <Link href="/dashboard/pesanan" className="text-sm font-bold text-gradient-primary hover:underline uppercase tracking-wider">
              Lihat Semua
            </Link>
          </div>
          
          {data?.recent_orders && data.recent_orders.length > 0 ? (
            <div className="flex flex-col gap-4">
              {data.recent_orders.map((order: any) => (
                <div key={order.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-md shadow-sm border border-gray-200 flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-bold text-[#171512]">{order.invoice_number}</p>
                      <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="font-bold text-[#171512]">{formatRupiah(order.grand_total)}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider
                        ${order.status === 'Completed' ? 'bg-green-100 text-green-700' 
                        : order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700'
                        : order.status === 'Cancelled' ? 'bg-red-100 text-red-700'
                        : 'bg-gradient-primary/10 text-gradient-primary'}`}>
                        {order.status}
                      </span>
                    </div>
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <button className="px-4 py-2 border border-gray-200 text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-white hover:text-black rounded-sm transition-colors">
                        Detail
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed border-gray-200 rounded-lg">
              <Package className="w-12 h-12 text-gray-200 mb-3" />
              <p className="text-gray-500 font-medium">Belum ada pesanan terbaru.</p>
              <Link href="/bookstore">
                <button className="mt-4 px-6 py-2 bg-gradient-primary text-white font-bold rounded-full text-sm hover:bg-[#B87500] transition-colors">
                  Mulai Belanja
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
