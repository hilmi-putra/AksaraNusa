"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ApiBook } from "@/types/book";
import { getAdminBooks, deleteAdminBook, duplicateAdminBook } from "@/lib/api/books";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  MoreHorizontal, Plus, Edit, Trash2, Eye, Copy, RefreshCw, Download,
  Star, Medal, Search, Filter, BookOpen
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function AdminBooksPage() {
  const [data, setData] = useState<ApiBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { setItems } = useBreadcrumb();
  
  // Delete Dialog State
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setItems([{ label: "Manajemen Buku", href: "/admin/books" }, { label: "Buku" }]);
  }, [setItems]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = { per_page: 50 };
      if (search) params.search = search;
      if (statusFilter !== "all") params.status = statusFilter;
      const response = await getAdminBooks(params);
      setData(response.data || []);
    } catch (error) {
      console.error("Failed to fetch books", error);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await deleteAdminBook(deleteId);
      toast.success("Buku berhasil dihapus");
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal menghapus buku");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const handleDuplicate = async (id: number) => {
    try {
      await duplicateAdminBook(id);
      fetchData();
    } catch (error) {
      console.error("Failed to duplicate book", error);
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
          {row.original.subtitle && (
            <div className="text-xs text-gray-400 truncate">{row.original.subtitle}</div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "author",
      header: "Penulis",
      cell: ({ row }) => (
        <span className="text-sm text-gray-600">{row.original.author?.name || "-"}</span>
      ),
    },
    {
      accessorKey: "categories",
      header: "Kategori",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.categories?.slice(0, 2).map((cat: any) => (
            <Badge key={cat.id} variant="secondary" className="text-[10px] px-1.5 py-0 bg-amber-50 text-amber-700 border-amber-200">
              {cat.name}
            </Badge>
          ))}
          {(row.original.categories?.length || 0) > 2 && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              +{row.original.categories!.length - 2}
            </Badge>
          )}
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "price",
      header: "Harga",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-sm">{formatPrice(row.original.final_price)}</span>
          {row.original.discount > 0 && (
            <span className="text-[10px] text-red-500 font-medium">-{row.original.discount}%</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "stock",
      header: "Stok",
      cell: ({ row }) => {
        const stock = row.original.stock;
        return (
          <span className={`font-medium text-sm ${stock === 0 ? 'text-red-500' : stock < 10 ? 'text-amber-500' : 'text-gray-700'}`}>
            {stock}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const variants: Record<string, string> = {
          published: "bg-emerald-50 text-emerald-700 border-emerald-200",
          draft: "bg-gray-50 text-gray-600 border-gray-200",
          archived: "bg-red-50 text-red-600 border-red-200",
        };
        return (
          <Badge variant="outline" className={`text-[10px] capitalize ${variants[status] || ''}`}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "is_featured",
      header: () => <Star className="size-4 text-gray-400" />,
      cell: ({ row }) => row.original.is_featured ? <Star className="size-4 text-amber-500 fill-amber-500" /> : <Star className="size-4 text-gray-200" />,
      enableSorting: false,
    },
    {
      accessorKey: "is_bestseller",
      header: () => <Medal className="size-4 text-gray-400" />,
      cell: ({ row }) => row.original.is_bestseller ? <Medal className="size-4 text-amber-500" /> : null,
      enableSorting: false,
    },
    {
      accessorKey: "published_at",
      header: "Terbit",
      cell: ({ row }) => {
        const date = row.original.published_at;
        if (!date) return <span className="text-xs text-gray-400">-</span>;
        return <span className="text-xs text-gray-500">{new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const book = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", className: "h-8 w-8 p-0" })}>
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-gray-400">Aksi</DropdownMenuLabel>
                <DropdownMenuItem render={<Link href={`/admin/books/${book.id}`} />}>
                  <Eye className="mr-2 h-4 w-4" /> Lihat Detail
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href={`/admin/books/edit/${book.id}`} />}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDuplicate(book.id)}>
                  <Copy className="mr-2 h-4 w-4" /> Duplikasi
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteClick(book.id)} className="text-red-600 focus:text-red-600">
                <Trash2 className="mr-2 h-4 w-4" /> Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Manajemen Buku</h1>
            <p className="text-sm text-gray-500 mt-1">Kelola seluruh koleksi buku Mega Press</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Link href="/admin/books/create" className={buttonVariants({ size: "sm" })}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Buku
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari judul, ISBN, atau SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-2 h-4 w-4 text-gray-400" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-6">
              <BookOpen className="w-10 h-10 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Buku</h3>
            <p className="text-sm text-gray-500 max-w-sm mb-6">
              Mulai tambahkan koleksi buku pertama Anda ke katalog Mega Press.
            </p>
            <Link href="/admin/books/create" className={buttonVariants({ size: "sm" })}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Buku Pertama
            </Link>
          </div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus Buku"
        description="Apakah Anda yakin ingin menghapus buku ini? Semua data terkait (termasuk file digital dan stok) juga akan terhapus."
        onConfirm={confirmDelete}
        isSubmitting={isDeleting}
      />
    </AdminDashboardLayout>
  );
}
