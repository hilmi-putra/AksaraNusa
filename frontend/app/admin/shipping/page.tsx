"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { getAdminShipments, updateAdminTracking } from "@/lib/api/admin-shipments";
import { Button } from "@/components/ui/button";
import { Truck, Search, RefreshCw, Edit, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function AdminShippingPage() {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [trackingForm, setTrackingForm] = useState({ courier: "", tracking_number: "", service: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setItems([{ label: "Pengiriman", href: "/admin/shipping" }]);
  }, [setItems]);

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params: any = { page, per_page: pagination.per_page };
      if (search) params.search = search;
      
      const response = await getAdminShipments(params);
      setData(response.data || []);
      setPagination({
        page: response.current_page || 1,
        per_page: response.per_page || 15,
        total: response.total || 0,
        last_page: response.last_page || 1
      });
    } catch (error) {
      console.error("Failed to fetch shipments:", error);
    } finally {
      setLoading(false);
    }
  }, [search, pagination.per_page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openTrackingModal = (order: any) => {
    setSelectedOrder(order);
    setTrackingForm({
      courier: order.shipment?.courier || order.shipping_method || "",
      tracking_number: order.shipment?.tracking_number || "",
      service: order.shipment?.service || ""
    });
    setIsModalOpen(true);
  };

  const handleSubmitTracking = async () => {
    if (!trackingForm.courier || !trackingForm.tracking_number) {
      toast.error("Kurir dan nomor resi harus diisi");
      return;
    }
    setIsSubmitting(true);
    try {
      await updateAdminTracking(selectedOrder.id, trackingForm);
      toast.success("Nomor resi berhasil disimpan");
      setIsModalOpen(false);
      fetchData();
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Gagal menyimpan nomor resi");
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "invoice_number",
      header: "Invoice",
      cell: ({ row }) => (
        <div className="font-bold text-[#171512] uppercase tracking-wider text-xs">
          {row.original.invoice_number}
        </div>
      ),
    },
    {
      accessorKey: "user.name",
      header: "Pelanggan",
      cell: ({ row }) => (
        <span className="font-semibold text-sm text-[#171512]">{row.original.user?.name || '-'}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status Pesanan",
      cell: ({ row }) => {
        const s = row.original.status;
        return (
          <Badge className={`${s === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-indigo-100 text-indigo-800'} border-none font-bold uppercase tracking-wider text-[10px] px-2 py-1`}>
            {s}
          </Badge>
        );
      }
    },
    {
      accessorKey: "shipment",
      header: "Info Resi",
      cell: ({ row }) => {
        const shipment = row.original.shipment;
        if (!shipment?.tracking_number) {
          return <span className="text-xs text-red-500 font-bold uppercase tracking-wider">Belum Ada Resi</span>;
        }
        return (
          <div className="flex flex-col">
            <span className="font-bold text-sm uppercase text-[#171512]">{shipment.courier} {shipment.service && `- ${shipment.service}`}</span>
            <span className="font-mono text-xs text-gray-500">{shipment.tracking_number}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="flex justify-end">
            <Button 
              onClick={() => openTrackingModal(order)} 
              variant="outline" 
              size="sm" 
              className="h-8 gap-2 border-gray-200"
            >
              <Edit className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Input Resi</span>
            </Button>
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
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#171512] tracking-tight">Pengiriman</h1>
              <p className="text-sm text-gray-500 font-medium mt-1">
                Kelola resi pengiriman dan status pengantaran
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
              placeholder="Cari invoice atau nomor resi..."
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

      {/* Input Resi Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-tight text-[#171512] flex items-center gap-2">
              <Package className="w-5 h-5 text-gradient-primary" />
              Input Resi Pengiriman
            </DialogTitle>
            <DialogDescription>
              Pesanan: <span className="font-bold text-[#171512]">{selectedOrder?.invoice_number}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171512]">Kurir Ekspredisi</label>
              <Input
                placeholder="Contoh: JNE, J&T, Sicepat"
                value={trackingForm.courier}
                onChange={(e) => setTrackingForm({...trackingForm, courier: e.target.value})}
                className="uppercase"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171512]">Layanan (Opsional)</label>
              <Input
                placeholder="Contoh: REG, YES, BEST"
                value={trackingForm.service}
                onChange={(e) => setTrackingForm({...trackingForm, service: e.target.value})}
                className="uppercase"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171512]">Nomor Resi</label>
              <Input
                placeholder="Masukkan nomor resi..."
                value={trackingForm.tracking_number}
                onChange={(e) => setTrackingForm({...trackingForm, tracking_number: e.target.value})}
                className="font-mono uppercase"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button 
              onClick={handleSubmitTracking} 
              disabled={isSubmitting || !trackingForm.courier || !trackingForm.tracking_number}
              className="bg-[#171512] hover:bg-black font-bold uppercase tracking-wider"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Resi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  );
}
