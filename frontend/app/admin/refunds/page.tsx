"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { getAdminRefunds, resolveAdminRefund } from "@/lib/api/admin-refunds";
import { Button } from "@/components/ui/button";
import { Undo2, Search, RefreshCw, Filter, Eye, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function AdminRefundsPage() {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [resolveForm, setResolveForm] = useState<{status: "Approved" | "Rejected", admin_notes: string}>({ status: "Approved", admin_notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setItems([{ label: "Retur & Refund", href: "/admin/refunds" }]);
  }, [setItems]);

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params: any = { page, per_page: pagination.per_page };
      if (search) params.search = search;
      if (statusFilter !== "all") params.status = statusFilter;
      
      const response = await getAdminRefunds(params);
      const res = response as any;
      setData(res.data || []);
      setPagination({
        page: res.current_page || 1,
        per_page: res.per_page || 15,
        total: res.total || 0,
        last_page: res.last_page || 1
      });
    } catch (error) {
      console.error("Failed to fetch refunds:", error);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, pagination.per_page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openResolveModal = (req: any, status: "Approved" | "Rejected") => {
    setSelectedRequest(req);
    setResolveForm({ status, admin_notes: "" });
    setIsModalOpen(true);
  };

  const handleResolve = async () => {
    if (!resolveForm.admin_notes.trim()) {
      toast.error("Catatan admin wajib diisi");
      return;
    }
    setIsSubmitting(true);
    try {
      await resolveAdminRefund(selectedRequest.id, resolveForm);
      toast.success(`Pengajuan refund berhasil ${resolveForm.status === 'Approved' ? 'disetujui' : 'ditolak'}`);
      setIsModalOpen(false);
      fetchData();
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Gagal memproses refund");
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns: ColumnDef<any>[] = [
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
      accessorKey: "reason",
      header: "Alasan",
      cell: ({ row }) => (
        <div className="text-xs text-gray-600 max-w-xs truncate">
          {row.original.reason}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = row.original.status;
        let color = 'bg-gray-100 text-gray-800';
        if (s === 'Approved') color = 'bg-green-100 text-green-800';
        if (s === 'Pending') color = 'bg-yellow-100 text-yellow-800';
        if (s === 'Rejected') color = 'bg-red-100 text-red-800';

        return (
          <Badge className={`${color} border-none font-bold uppercase tracking-wider text-[10px] px-2 py-1`}>
            {s}
          </Badge>
        );
      }
    },
    {
      accessorKey: "created_at",
      header: "Tanggal",
      cell: ({ row }) => (
        <div className="text-sm text-gray-500 whitespace-nowrap">
          {format(new Date(row.original.created_at), "dd MMM yyyy", { locale: id })}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const req = row.original;
        return (
          <div className="flex justify-end gap-2">
            {req.status === 'Pending' ? (
              <>
                <Button 
                  onClick={() => openResolveModal(req, 'Approved')} 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-2 border-green-200 text-green-700 hover:bg-green-50"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="hidden lg:inline text-xs font-bold uppercase tracking-wider">Setuju</span>
                </Button>
                <Button 
                  onClick={() => openResolveModal(req, 'Rejected')} 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-2 border-red-200 text-red-700 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4" />
                  <span className="hidden lg:inline text-xs font-bold uppercase tracking-wider">Tolak</span>
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => {
                  setSelectedRequest(req);
                  setResolveForm({ status: req.status, admin_notes: req.admin_notes });
                  setIsModalOpen(true);
                }} 
                variant="outline" 
                size="sm" 
                className="h-8 gap-2 border-gray-200"
              >
                <Eye className="h-4 w-4" />
                <span className="hidden lg:inline text-xs font-bold uppercase tracking-wider">Lihat</span>
              </Button>
            )}
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
              <Undo2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#171512] tracking-tight">Pengajuan Refund</h1>
              <p className="text-sm text-gray-500 font-medium mt-1">
                Kelola permintaan retur dan pengembalian dana
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
              placeholder="Cari invoice atau nama pelanggan..."
              className="pl-10 h-10 w-full text-sm bg-gray-50/50 border-gray-200 focus-visible:ring-[#004A8F]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchData()}
            />
          </div>
          <div className="w-full sm:w-[200px] flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 hidden sm:block" />
            <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val || 'all'); }}>
              <SelectTrigger className="h-10 text-sm font-semibold border-gray-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
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

      {/* Resolve Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-tight text-[#171512]">
              {selectedRequest?.status === 'Pending' ? (resolveForm.status === 'Approved' ? 'Setujui Refund' : 'Tolak Refund') : 'Detail Refund'}
            </DialogTitle>
            <DialogDescription>
              Pesanan: <span className="font-bold text-[#171512]">{selectedRequest?.order?.invoice_number}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Alasan Customer</label>
              <p className="text-sm text-[#171512] bg-gray-50 p-3 rounded-lg border border-gray-100">{selectedRequest?.reason}</p>
            </div>
            
            {selectedRequest?.proof_image && (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Bukti Foto</label>
                <img src={`http://localhost:8000/storage/${selectedRequest.proof_image}`} alt="Proof" className="w-full max-h-48 object-contain rounded-lg border border-gray-200" />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171512]">Catatan Admin</label>
              <Textarea
                placeholder="Berikan alasan atau catatan mengapa pengajuan ini disetujui/ditolak..."
                value={resolveForm.admin_notes}
                onChange={(e) => setResolveForm({...resolveForm, admin_notes: e.target.value})}
                disabled={selectedRequest?.status !== 'Pending'}
                className="resize-none"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            {selectedRequest?.status === 'Pending' ? (
              <>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button 
                  onClick={handleResolve} 
                  disabled={isSubmitting || !resolveForm.admin_notes.trim()}
                  className={`font-bold uppercase tracking-wider ${resolveForm.status === 'Approved' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                >
                  {isSubmitting ? "Memproses..." : "Konfirmasi"}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsModalOpen(false)} className="bg-[#171512] text-white">Tutup</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  );
}
