"use client";

import { useState, useEffect } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { BlogCategory, getAdminBlogCategories, deleteAdminBlogCategory } from "@/lib/api/blog";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/useDebounce";

export default function AdminBlogCategoriesPage() {
  const { setItems } = useBreadcrumb();
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setItems([
      { label: "Blog", href: "/admin/blog/posts" },
      { label: "Kategori" },
    ]);
  }, [setItems]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const params: any = { per_page: 50 };
      if (debouncedSearch) params.search = debouncedSearch;
      const response = await getAdminBlogCategories(params);
      setCategories(response.data || response || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
      toast.error("Gagal mengambil data kategori");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [debouncedSearch]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await deleteAdminBlogCategory(deleteId);
      toast.success("Kategori berhasil dihapus");
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus kategori");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const columns: ColumnDef<BlogCategory>[] = [
    {
      id: "index",
      header: "No",
      cell: ({ row }) => <div className="text-center w-8 text-gray-500">{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Nama Kategori",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{item.name}</span>
            <span className="text-xs text-gray-500">{item.slug}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "color",
      header: "Warna",
      cell: ({ row }) => {
        const color = row.getValue("color") as string;
        return color ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: color }}></div>
            <span className="text-sm text-gray-600">{color}</span>
          </div>
        ) : (
          <span className="text-gray-400">-</span>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Deskripsi",
      cell: ({ row }) => {
        const desc = row.getValue("description") as string;
        return <div className="text-sm text-gray-600 max-w-xs truncate" title={desc}>{desc || '-'}</div>;
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-1">
            <Link href={`/admin/blog/categories/edit/${item.id}`}>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" title="Edit">
                <Edit className="w-4 h-4" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => setDeleteId(item.id)}
              title="Hapus"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kategori Blog</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola kategori untuk artikel blog Anda.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari kategori..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Link href="/admin/blog/categories/create" className="w-full sm:w-auto">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white w-full">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Kategori
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <DataTable columns={columns} data={categories} />
        )}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus Kategori"
        description="Apakah Anda yakin ingin menghapus kategori ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus"
        onConfirm={handleDelete}
        isSubmitting={isDeleting}
      />
    </AdminDashboardLayout>
  );
}
