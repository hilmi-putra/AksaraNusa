"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ApiBook } from "@/types/book";
import { getAdminBooks, updateAdminBookPricing } from "@/lib/api/books";
import { Button, buttonVariants } from "@/components/ui/button";
import { RefreshCw, Search, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function AdminPricingPage() {
  const [data, setData] = useState<ApiBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { setItems } = useBreadcrumb();

  // Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<ApiBook | null>(null);
  const [formData, setFormData] = useState({ 
    price: 0, 
    discount: 0, 
    promo_price: 0, 
    promo_start_at: "",
    promo_end_at: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setItems([{ label: "Manajemen Buku", href: "/admin/books" }, { label: "Harga & Promo" }]);
  }, [setItems]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = { per_page: 50 };
      if (search) params.search = search;
      const response = await getAdminBooks(params);
      setData(response.data || []);
    } catch (error) {
      console.error("Failed to fetch books", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEditClick = (book: ApiBook) => {
    setEditingBook(book);
    setFormData({ 
      price: book.price || 0,
      discount: book.discount || 0,
      promo_price: book.promo_price || 0,
      promo_start_at: book.promo_start_at ? book.promo_start_at.substring(0, 16) : "",
      promo_end_at: book.promo_end_at ? book.promo_end_at.substring(0, 16) : "",
    });
    setIsEditOpen(true);
  };

  const handleSave = async () => {
    if (!editingBook) return;
    setIsSubmitting(true);
    try {
      // Clean up empty dates
      const payload = {
        ...formData,
        promo_start_at: formData.promo_start_at || null,
        promo_end_at: formData.promo_end_at || null,
        promo_price: formData.promo_price || null,
      };
      await updateAdminBookPricing(editingBook.id, payload);
      toast.success("Harga & Promo berhasil diperbarui");
      setIsEditOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal memperbarui data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);

  const columns: ColumnDef<ApiBook>[] = [
    {
      id: "index",
      header: "No",
      cell: ({ row }) => <div className="text-center w-8 text-gray-500">{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "cover_image",
      header: "Cover",
      cell: ({ row }) => {
        const cover = row.original.cover_image;
        return (
          <div className="w-10 h-14 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden border border-gray-100">
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover} alt="" className="object-cover w-full h-full" />
            ) : (
              <Icon icon="ph:book-bookmark-duotone" className="size-5 text-gray-300" />
            )}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "title",
      header: "Judul Buku",
      cell: ({ row }) => (
        <div className="max-w-[240px]">
          <div className="font-semibold text-gray-900 truncate">{row.original.title}</div>
          {row.original.author?.name && (
            <div className="text-xs text-gray-400 truncate">{row.original.author.name}</div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Harga Dasar",
      cell: ({ row }) => (
        <span className="text-sm">{formatPrice(row.original.price)}</span>
      ),
    },
    {
      accessorKey: "discount",
      header: "Diskon",
      cell: ({ row }) => {
        const discount = row.original.discount;
        return discount > 0 ? (
          <Badge variant="outline" className="text-red-600 bg-red-50 border-red-200">{discount}%</Badge>
        ) : (
          <span className="text-sm text-gray-400">-</span>
        );
      },
    },
    {
      accessorKey: "promo_price",
      header: "Harga Promo / Net",
      cell: ({ row }) => (
        <span className="text-sm font-bold text-gray-900">{formatPrice(row.original.final_price)}</span>
      ),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <Button variant="outline" size="sm" onClick={() => handleEditClick(row.original)}>
          <Edit className="w-4 h-4 mr-2" /> Update Harga
        </Button>
      ),
    },
  ];

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Harga & Promo</h1>
            <p className="text-sm text-gray-500 mt-1">Kelola harga jual, diskon, dan jadwal promo buku</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari judul..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Harga & Promo</DialogTitle>
          </DialogHeader>
          {editingBook && (
            <div className="space-y-4 py-4">
              <div className="mb-2">
                <p className="text-sm font-medium text-gray-900">{editingBook.title}</p>
                <p className="text-xs text-gray-500">{editingBook.author?.name}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Harga Dasar (Rp)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="discount">Diskon (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="promo_price">Harga Promo Fix (Rp)</Label>
                  <Input
                    id="promo_price"
                    type="number"
                    min="0"
                    value={formData.promo_price || ""}
                    onChange={(e) => setFormData({ ...formData, promo_price: parseInt(e.target.value) || 0 })}
                    placeholder="Atau set harga fix"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="promo_start_at">Mulai Promo</Label>
                  <Input
                    id="promo_start_at"
                    type="datetime-local"
                    value={formData.promo_start_at}
                    onChange={(e) => setFormData({ ...formData, promo_start_at: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="promo_end_at">Berakhir Promo</Label>
                  <Input
                    id="promo_end_at"
                    type="datetime-local"
                    value={formData.promo_end_at}
                    onChange={(e) => setFormData({ ...formData, promo_end_at: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)} disabled={isSubmitting}>
              Batal
            </Button>
            <Button onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  );
}
