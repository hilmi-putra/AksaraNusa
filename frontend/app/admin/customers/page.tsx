"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { getAdminCustomers } from "@/lib/api/admin-customers";
import { Button } from "@/components/ui/button";
import { Users, Search, RefreshCw, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { formatRupiah } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";

export default function AdminCustomersPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { setItems } = useBreadcrumb();
  
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 15,
    total: 0,
    last_page: 1
  });

  useEffect(() => {
    setItems([{ label: "Pelanggan", href: "/admin/customers" }]);
  }, [setItems]);

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params: any = { page, per_page: pagination.per_page };
      if (search) params.search = search;
      
      const response = await getAdminCustomers(params);
      const res = response as any;
      setData(res.data || []);
      setPagination({
        page: res.current_page || 1,
        per_page: res.per_page || 15,
        total: res.total || 0,
        last_page: res.last_page || 1
      });
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  }, [search, pagination.per_page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Nama",
      cell: ({ row }) => (
        <div className="font-bold text-[#171512] text-sm">
          {row.original.name}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-sm text-gray-600">{row.original.email}</span>
      ),
    },
    {
      accessorKey: "phone",
      header: "Nomor HP",
      cell: ({ row }) => (
        <span className="text-sm text-gray-600">{row.original.phone || '-'}</span>
      ),
    },
    {
      accessorKey: "orders_count",
      header: "Total Pesanan",
      cell: ({ row }) => (
        <span className="font-medium text-sm text-[#171512]">{row.original.orders_count || 0} pesanan</span>
      ),
    },
    {
      accessorKey: "orders_sum_grand_total",
      header: "Total Pengeluaran",
      cell: ({ row }) => (
        <div className="font-bold text-gradient-primary">
          {formatRupiah(row.original.orders_sum_grand_total || 0)}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Terdaftar",
      cell: ({ row }) => (
        <div className="text-sm text-gray-500 whitespace-nowrap">
          {format(new Date(row.original.created_at), "dd MMM yyyy", { locale: id })}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="flex justify-end">
            <Link href={`/admin/customers/${customer.id}`}>
              <Button variant="outline" size="sm" className="h-8 gap-2 border-gray-200">
                <Eye className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Detail</span>
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-[#171512] w-12 h-12 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#171512] tracking-tight">Pelanggan</h1>
              <p className="text-sm text-gray-500 font-medium mt-1">
                Data pengguna dan riwayat transaksi mereka
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => fetchData()} variant="outline" className="h-10 gap-2 font-bold text-xs uppercase tracking-wider">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari nama atau email..."
              className="pl-10 h-10 w-full text-sm bg-gray-50/50 border-gray-200 focus-visible:ring-[#004A8F]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchData()}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
          {loading && data.length === 0 ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <DataTable 
              columns={columns} 
              data={data}
            />
          )}

          {/* Pagination */}
          {!loading && data.length > 0 && pagination.last_page > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
              <div className="text-sm text-gray-500 font-medium">
                Menampilkan halaman {pagination.page} dari {pagination.last_page} ({pagination.total} total)
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchData(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="font-bold text-xs uppercase tracking-wider"
                >
                  Sebelumnya
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchData(pagination.page + 1)}
                  disabled={pagination.page >= pagination.last_page}
                  className="font-bold text-xs uppercase tracking-wider"
                >
                  Selanjutnya
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
