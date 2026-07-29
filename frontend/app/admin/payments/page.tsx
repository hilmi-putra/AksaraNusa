"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { getAdminPayments } from "@/lib/api/admin-payments";
import { Button } from "@/components/ui/button";
import { CreditCard, Search, RefreshCw, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { formatRupiah } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function AdminPaymentsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { setItems } = useBreadcrumb();
  
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 15,
    total: 0,
    last_page: 1
  });

  useEffect(() => {
    setItems([{ label: "Pembayaran", href: "/admin/payments" }]);
  }, [setItems]);

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params: any = { page, per_page: pagination.per_page };
      if (search) params.search = search;
      if (statusFilter !== "all") params.status = statusFilter;
      
      const response = await getAdminPayments(params);
      setData(response.data || []);
      setPagination({
        page: response.current_page || 1,
        per_page: response.per_page || 15,
        total: response.total || 0,
        last_page: response.last_page || 1
      });
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, pagination.per_page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "transaction_number",
      header: "Transaksi ID",
      cell: ({ row }) => (
        <div className="font-mono text-xs text-gray-500 break-all w-48">
          {row.original.transaction_number || '-'}
        </div>
      ),
    },
    {
      accessorKey: "order.invoice_number",
      header: "Invoice",
      cell: ({ row }) => (
        <div className="font-bold text-[#171512] uppercase tracking-wider text-xs">
          {row.original.order?.invoice_number || '-'}
        </div>
      ),
    },
    {
      accessorKey: "order.user.name",
      header: "Pelanggan",
      cell: ({ row }) => (
        <span className="font-semibold text-sm text-[#171512]">{row.original.order?.user?.name || '-'}</span>
      ),
    },
    {
      accessorKey: "payment_method",
      header: "Metode",
      cell: ({ row }) => (
        <span className="font-medium text-sm text-[#171512]">{row.original.payment_method || '-'}</span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Jumlah",
      cell: ({ row }) => (
        <div className="font-bold text-gradient-primary">
          {formatRupiah(row.original.amount)}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = row.original.status;
        let color = 'bg-gray-100 text-gray-800';
        if (s === 'Paid') color = 'bg-green-100 text-green-800';
        if (s === 'Pending') color = 'bg-yellow-100 text-yellow-800';
        if (s === 'Failed') color = 'bg-red-100 text-red-800';
        if (s === 'Expired') color = 'bg-gray-200 text-gray-600';
        if (s === 'Refunded') color = 'bg-blue-100 text-blue-800';

        return (
          <Badge className={`${color} border-none font-bold uppercase tracking-wider text-[10px] px-2 py-1`}>
            {s}
          </Badge>
        );
      }
    },
    {
      accessorKey: "created_at",
      header: "Waktu",
      cell: ({ row }) => (
        <div className="text-sm text-gray-500 whitespace-nowrap">
          {format(new Date(row.original.created_at), "dd MMM yyyy HH:mm", { locale: id })}
        </div>
      ),
    },
  ];

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-[#171512] w-12 h-12 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#171512] tracking-tight">Pembayaran</h1>
              <p className="text-sm text-gray-500 font-medium mt-1">
                Riwayat transaksi dan status pembayaran Midtrans
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
              placeholder="Cari transaksi ID, invoice, atau nama..."
              className="pl-10 h-10 w-full text-sm bg-gray-50/50 border-gray-200 focus-visible:ring-[#004A8F]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchData()}
            />
          </div>
          <div className="w-full sm:w-[200px] flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 hidden sm:block" />
            <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); }}>
              <SelectTrigger className="h-10 text-sm font-semibold border-gray-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
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
