"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ApiAuthor, getAdminAuthorsList, deleteAdminAuthor } from "@/lib/api/authors";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Search, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

export default function AdminAuthorsPage() {
  const [data, setData] = useState<ApiAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ label: "Manajemen Buku", href: "/admin/books" }, { label: "Penulis" }]);
  }, [setItems]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = { per_page: 50 };
      if (search) params.search = search;
      const response = await getAdminAuthorsList(params);
      setData(response.data || []);
    } catch (error) {
      console.error("Failed to fetch authors", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus penulis ini?")) {
      try {
        await deleteAdminAuthor(id);
        fetchData();
      } catch (error) {
        console.error("Failed to delete author", error);
      }
    }
  };

  const columns: ColumnDef<ApiAuthor>[] = [
    {
      id: "index",
      header: "No",
      cell: ({ row }) => <div className="text-center w-8 text-gray-500">{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "photo",
      header: "Foto",
      cell: ({ row }) => {
        const photo = row.original.photo;
        return (
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt={row.original.name} className="object-cover w-full h-full" />
            ) : (
              <ImageIcon className="size-4 text-gray-400" />
            )}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "Nama Penulis",
      cell: ({ row }) => <div className="font-medium text-gray-900">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="text-gray-500">{row.getValue("email") || "-"}</div>,
    },
    {
      accessorKey: "website",
      header: "Website",
      cell: ({ row }) => {
        const url = row.getValue("website") as string;
        return url ? (
          <a href={url} target="_blank" rel="noreferrer" className="text-amber-600 hover:underline">
            Kunjungi
          </a>
        ) : (
          <span className="text-gray-400">-</span>
        );
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => {
        const author = row.original;
        return (
          <div className="flex items-center gap-2">
            <Link href={`/admin/authors/edit/${author.id}`}>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <Edit className="w-4 h-4" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => handleDelete(author.id)}
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Penulis</h1>
            <p className="text-sm text-gray-500 mt-1">Kelola data penulis buku pada sistem.</p>
          </div>
          <Link href="/admin/authors/create">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Penulis
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari nama penulis..."
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
    </AdminDashboardLayout>
  );
}
