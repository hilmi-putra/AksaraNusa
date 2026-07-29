"use client";

import React, { useEffect, useState, use } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { getAdminCustomer } from "@/lib/api/admin-customers";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, MapPin, Package, ShoppingBag, ArrowLeft, ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { formatRupiah } from "@/lib/utils";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AdminCustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: customerId } = use(params);
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await getAdminCustomer(customerId);
        setCustomer(response as any);
        setItems([
          { label: "Pelanggan", href: "/admin/customers" },
          { label: response.name, href: `/admin/customers/${customerId}` }
        ]);
      } catch (error) {
        console.error("Failed to fetch customer details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [customerId, setItems]);

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </AdminDashboardLayout>
    );
  }

  if (!customer) {
    return (
      <AdminDashboardLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-bold text-gray-700">Pelanggan tidak ditemukan</h2>
          <Link href="/admin/customers">
            <Button variant="outline" className="mt-4 gap-2">
              <ArrowLeft className="w-4 h-4" /> Kembali
            </Button>
          </Link>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <Link href="/admin/customers">
              <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-full bg-gray-50 hover:bg-gray-100">
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </Button>
            </Link>
            <div className="bg-[#171512] w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#171512] tracking-tight">{customer.name}</h1>
              <p className="text-sm text-gray-500 font-medium flex items-center gap-2 mt-1">
                Terdaftar: {format(new Date(customer.created_at), "dd MMMM yyyy", { locale: idLocale })}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Info & Stats */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            
            {/* Contact Info */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-[#171512] mb-4">Informasi Kontak</h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium">Email</span>
                    <span className="text-sm font-semibold text-[#171512]">{customer.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium">Nomor HP</span>
                    <span className="text-sm font-semibold text-[#171512]">{customer.phone || 'Belum diatur'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shopping Stats */}
            <div className="bg-[#171512] p-6 rounded-2xl shadow-sm text-white">
              <h2 className="text-lg font-bold mb-6 text-gray-300">Statistik Belanja</h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-6 h-6 text-[#DB8B00]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Pesanan</span>
                    <span className="text-2xl font-black">{customer.orders_count || 0}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 text-[#DB8B00]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Pengeluaran</span>
                    <span className="text-xl font-bold text-[#DB8B00]">{formatRupiah(customer.orders_sum_grand_total || 0)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-[#171512] mb-4">Alamat Tersimpan ({customer.addresses?.length || 0})</h2>
              {customer.addresses?.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {customer.addresses.map((address: any) => (
                    <div key={address.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-[#DB8B00]" />
                        <span className="font-bold text-sm">{address.label}</span>
                        {address.is_primary && (
                          <Badge variant="secondary" className="text-[10px] bg-blue-100 text-blue-700 hover:bg-blue-100 ml-auto">UTAMA</Badge>
                        )}
                      </div>
                      <p className="text-sm font-semibold">{address.recipient_name} ({address.phone})</p>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {address.address_line}, {address.subdistrict_name}, {address.city_name}, {address.province_name} {address.postal_code}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">Belum ada alamat tersimpan.</p>
              )}
            </div>

          </div>

          {/* Right Column: Recent Orders */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#171512]">10 Pesanan Terakhir</h2>
                <Link href={`/admin/orders?search=${customer.email}`}>
                  <Button variant="outline" size="sm" className="h-8 gap-2 border-gray-200">
                    <span className="text-xs font-bold uppercase tracking-wider">Lihat Semua</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
              <div className="p-0">
                {customer.orders?.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {customer.orders.map((order: any) => (
                      <div key={order.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col gap-1">
                          <Link href={`/admin/orders/${order.id}`} className="font-bold text-[#171512] hover:text-[#DB8B00] hover:underline uppercase tracking-wider text-sm transition-colors">
                            {order.invoice_number}
                          </Link>
                          <span className="text-xs text-gray-500">
                            {format(new Date(order.created_at), "dd MMM yyyy HH:mm", { locale: idLocale })}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-end">
                            <span className="font-bold text-[#DB8B00]">{formatRupiah(order.grand_total)}</span>
                            <span className="text-xs text-gray-500">{order.payment_method}</span>
                          </div>
                          
                          <Badge className="bg-gray-100 text-gray-800 border-none font-bold uppercase tracking-wider text-[10px] px-2 py-1">
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-gray-500">
                    <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <p className="font-medium">Belum ada riwayat pesanan</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
