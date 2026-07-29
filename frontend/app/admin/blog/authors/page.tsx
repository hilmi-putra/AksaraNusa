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
import { BlogAuthor, getAdminBlogAuthors, deleteAdminBlogAuthor } from "@/lib/api/blog";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/useDebounce";

export default function AdminBlogAuthorsPage() {
  const { setItems } = useBreadcrumb();
  const [authors, setAuthors] = useState<BlogAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setItems([
      { label: "Blog", href: "/admin/blog/posts" },
      { label: "Author" },
    ]);
  }, [setItems]);

  const fetchAuthors = async () => {
    setLoading(true);
    try {
      const params: any = { per_page: 50 };
      if (debouncedSearch) params.search = debouncedSearch;
      const response = await getAdminBlogAuthors(params);
      setAuthors(response.data || response || []);
    } catch (error) {
      console.error("Failed to fetch authors", error);
      toast.error("Gagal mengambil data author");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, [debouncedSearch]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await deleteAdminBlogAuthor(deleteId);
      toast.success("Author berhasil dihapus");
      fetchAuthors();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus author");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const columns: ColumnDef<BlogAuthor>[] = [
    {
      id: "index",
      header: "No",
      cell: ({ row }) => <div className="text-center w-8 text-gray-500">{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Author",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-3">
            {item.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold border-2 border-white">
                {item.name.charAt(0)}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">{item.name}</span>
              <span className="text-xs text-gray-500">{item.slug}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "bio",
      header: "Bio",
      cell: ({ row }) => {
        const bio = row.getValue("bio") as string;
        return <div className="text-sm text-gray-600 max-w-xs truncate" title={bio}>{bio || '-'}</div>;
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-1">
            <Link href={`/admin/blog/authors/edit/${item.id}`}>
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
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Author Blog</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola data penulis untuk artikel blog Anda.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Link href="/admin/blog/authors/create" className="w-full sm:w-auto">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white w-full">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Author
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
          <DataTable columns={columns} data={authors} />
        )}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus Author"
        description="Apakah Anda yakin ingin menghapus author ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus"
        onConfirm={handleDelete}
        isSubmitting={isDeleting}
      />
    </AdminDashboardLayout>
  );
}
