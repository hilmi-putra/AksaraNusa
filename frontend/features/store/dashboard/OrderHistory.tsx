"use client";

import React, { useEffect, useState } from "react";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { getOrders } from "@/lib/api/user";
import Link from "next/link";
import { Package } from "lucide-react";

export function OrderHistory() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then((res) => {
        setOrders(res || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-border p-8 flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse flex flex-col items-center">
          <Package className="w-10 h-10 text-gray-200 mb-4 animate-bounce" />
          <p className="text-gray-400 font-medium">Memuat pesanan Anda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="p-6 md:p-8 border-b border-gray-100">
        <Typography variant="h2" className="text-2xl font-black text-[#171512] uppercase tracking-tighter mb-1">
          Pesanan Saya
        </Typography>
        <p className="text-sm text-gray-500">Lacak pengiriman dan lihat riwayat pembelian Anda.</p>
      </div>

      <div className="p-6 md:p-8 flex flex-col gap-8">
        {!orders || orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
            <Package className="w-16 h-16 text-gray-200 mb-4" />
            <p className="text-gray-500 font-medium text-lg mb-2">Belum ada pesanan.</p>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">Anda belum melakukan pesanan apa pun. Ayo jelajahi koleksi buku kami!</p>
            <Link href="/bookstore">
              <Button className="bg-gradient-primary hover:bg-[#b06f00] text-white rounded-full px-8 h-12 font-bold tracking-widest uppercase text-xs transition-colors">
                Mulai Belanja
              </Button>
            </Link>
          </div>
        ) : (
          orders.map((order) => {
            const orderDate = new Date(order.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
            const deliveryDateObj = new Date(order.created_at);
            deliveryDateObj.setDate(deliveryDateObj.getDate() + 3);
            const deliveryDate = deliveryDateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
            
            const shipTo = order.shipping_address 
              ? `${order.shipping_address.recipient_name}, ${order.shipping_address.address}`
              : "Alamat tidak tersedia";

            return (
              <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
                {/* Order Header */}
                <div className="bg-gray-50/80 p-5 border-b border-gray-200 flex flex-wrap gap-6 justify-between items-start text-sm">
                  <div className="flex gap-8 md:gap-16">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Tanggal Pesanan</span>
                      <span className="font-semibold text-[#171512]">{orderDate}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Total</span>
                      <span className="font-semibold text-[#171512]">{formatRupiah(order.grand_total)}</span>
                    </div>
                    <div className="flex flex-col hidden sm:flex">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Dikirim Ke</span>
                      <span className="font-semibold text-[#171512] truncate max-w-[200px]" title={shipTo}>{shipTo}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Invoice # {order.invoice_number}</span>
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <span className="font-bold text-gradient-primary hover:underline text-xs cursor-pointer">Lihat Detail</span>
                    </Link>
                  </div>
                </div>

                {/* Order Items */}
                <div className="flex flex-col divide-y divide-gray-100">
                  {order.items?.map((item: any) => (
                    <div key={item.id} className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                      <div className="w-24 h-32 bg-[#EBEBEB] shrink-0 p-2 flex items-center justify-center rounded-sm overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={item.book?.cover_url || "https://placehold.co/80x120?text=No+Cover"} 
                          alt={item.book?.title} 
                          className="max-w-full max-h-full object-contain shadow-sm" 
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="font-bold text-[#171512] text-lg leading-tight">{item.book?.title}</h4>
                          <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full 
                            ${order.status === 'Completed' ? 'bg-green-100 text-green-700' 
                            : order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700'
                            : order.status === 'Cancelled' ? 'bg-red-100 text-red-700'
                            : 'bg-gradient-primary/10 text-gradient-primary'}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 flex flex-col gap-1.5 mt-1">
                          <p>Penulis: <span className="font-medium text-[#171512]">{item.book?.author?.name || 'Tidak diketahui'}</span></p>
                          <p>Harga: <span className="font-medium text-gradient-primary">{formatRupiah(item.price)}</span></p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 w-full md:w-auto mt-4 md:mt-0 justify-between md:justify-end">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Qty:</span>
                          <div className="w-12 h-10 border border-gray-200 flex items-center justify-center font-bold text-[#171512] text-sm rounded-sm bg-gray-50">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0">
                          {order.status === 'Pending' ? (
                            <Link href={`/dashboard/orders/${order.id}`}>
                              <Button className="bg-gradient-primary hover:bg-[#b06f00] text-white rounded-none h-10 px-6 font-bold tracking-widest uppercase text-[10px] transition-colors w-full">
                                Bayar
                              </Button>
                            </Link>
                          ) : (
                            <Link href={`/bookstore/buku/${item.book?.slug}`}>
                              <Button className="bg-[#171512] hover:bg-black text-white rounded-none h-10 px-6 font-bold tracking-widest uppercase text-[10px] transition-colors w-full">
                                Beli Lagi
                              </Button>
                            </Link>
                          )}
                          <Button variant="outline" className="border-gray-200 text-[#171512] hover:bg-gray-50 rounded-none h-10 px-6 font-bold tracking-widest uppercase text-[10px] transition-colors w-full">
                            Tulis Ulasan
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="bg-gray-50/50 p-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Estimasi Tiba: <span className="text-[#171512]">{order.status === 'Completed' ? 'Sudah Diterima' : deliveryDate}</span>
                  </div>
                  {order.shipping_service && (
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Kurir: <span className="text-[#171512]">{order.shipping_courier} {order.shipping_service}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
