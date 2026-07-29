"use client";

import { useState, useEffect } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Copy, Star, ExternalLink } from "lucide-react";
import Link from "next/link";
import { BlogPost, getAdminBlogPosts, deleteAdminBlogPost, duplicateAdminBlogPost } from "@/lib/api/blog";
import { toast } from "sonner";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/useDebounce";

export default function AdminBlogPostsPage() {
  const { setItems } = useBreadcrumb();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setItems([
      { label: "Blog", href: "/admin/blog/posts" },
      { label: "Artikel" },
    ]);
  }, [setItems]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params: any = { per_page: 50 };
      if (debouncedSearch) params.search = debouncedSearch;
      const response = await getAdminBlogPosts(params);
      setPosts(response.data || response || []);
    } catch (error) {
      console.error("Failed to fetch posts", error);
      toast.error("Gagal mengambil data artikel");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [debouncedSearch]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await deleteAdminBlogPost(deleteId);
      toast.success("Artikel berhasil dihapus");
      fetchPosts();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus artikel");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const handleDuplicate = async (id: number) => {
    try {
      await duplicateAdminBlogPost(id);
      toast.success("Artikel berhasil diduplikasi");
      fetchPosts();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menduplikasi artikel");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Published</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Scheduled</Badge>;
      case 'archived':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const columns: ColumnDef<BlogPost>[] = [
    {
      id: "index",
      header: "No",
      cell: ({ row }) => <div className="text-center w-8 text-gray-500">{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Judul Artikel",
      cell: ({ row }) => {
        const post = row.original;
        return (
          <div className="flex flex-col max-w-[300px]">
            <div className="flex items-center gap-2 font-medium text-gray-900 truncate">
              {post.is_featured && <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />}
              <span className="truncate">{post.title}</span>
            </div>
            <span className="text-xs text-gray-500 flex items-center gap-2 mt-1">
              {post.category ? (
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">{post.category.name}</span>
              ) : null}
              {post.author ? `Oleh: ${post.author.name}` : ''}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
    },
    {
      accessorKey: "publish_date",
      header: "Tgl Publikasi",
      cell: ({ row }) => {
        const dateStr = row.getValue("publish_date") as string;
        if (!dateStr) return <span className="text-gray-400">-</span>;
        
        try {
          return <div className="text-sm text-gray-600">{format(new Date(dateStr), 'dd MMM yyyy HH:mm')}</div>;
        } catch (e) {
          return <div className="text-sm text-gray-600">{dateStr}</div>;
        }
      },
    },
    {
      accessorKey: "view_count",
      header: "Views",
      cell: ({ row }) => <div className="text-sm text-gray-600 text-center">{row.getValue("view_count") || 0}</div>,
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-1">
            {item.status === 'published' && (
              <a href={`/blog/${item.slug}`} target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900" title="Preview">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-600 hover:text-amber-600 hover:bg-amber-50"
              onClick={() => handleDuplicate(item.id)}
              title="Duplikasi"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Link href={`/admin/blog/posts/edit/${item.id}`}>
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
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Artikel Blog</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola konten dan artikel blog Anda.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari judul artikel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Link href="/admin/blog/posts/create" className="w-full sm:w-auto">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white w-full">
              <Plus className="w-4 h-4 mr-2" />
              Tulis Artikel
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <DataTable columns={columns} data={posts} />
        )}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus Artikel"
        description="Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus"
        onConfirm={handleDelete}
        isSubmitting={isDeleting}
      />
    </AdminDashboardLayout>
  );
}
