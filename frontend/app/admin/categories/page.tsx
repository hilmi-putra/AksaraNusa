"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { 
  ApiCategory, ApiGenre, 
  getAdminCategoriesList, deleteAdminCategory,
  getAdminGenresList, deleteAdminGenre 
} from "@/lib/api/categories";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Search, Layers, Tag } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminCategoriesGenresPage() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [genres, setGenres] = useState<ApiGenre[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingGenres, setLoadingGenres] = useState(true);
  
  const [searchCat, setSearchCat] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ label: "Manajemen Buku", href: "/admin/books" }, { label: "Kategori & Genre" }]);
  }, [setItems]);

  const fetchCategories = useCallback(async () => {
    setLoadingCats(true);
    try {
      const params: any = { per_page: 50 };
      if (searchCat) params.search = searchCat;
      const response = await getAdminCategoriesList(params);
      setCategories(response.data || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setLoadingCats(false);
    }
  }, [searchCat]);

  const fetchGenres = useCallback(async () => {
    setLoadingGenres(true);
    try {
      const params: any = { per_page: 50 };
      if (searchGenre) params.search = searchGenre;
      const response = await getAdminGenresList(params);
      setGenres(response.data || []);
    } catch (error) {
      console.error("Failed to fetch genres", error);
    } finally {
      setLoadingGenres(false);
    }
  }, [searchGenre]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);
  useEffect(() => { fetchGenres(); }, [fetchGenres]);

  const handleDeleteCategory = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      try {
        await deleteAdminCategory(id);
        fetchCategories();
      } catch (error) {
        console.error("Failed to delete category", error);
      }
    }
  };

  const handleDeleteGenre = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus genre ini?")) {
      try {
        await deleteAdminGenre(id);
        fetchGenres();
      } catch (error) {
        console.error("Failed to delete genre", error);
      }
    }
  };

  const catColumns: ColumnDef<ApiCategory>[] = [
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
      cell: ({ row }) => <div className="font-medium text-gray-900">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => <div className="text-gray-500">{row.getValue("slug")}</div>,
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-2">
            <Link href={`/admin/categories/edit/${item.id}`}>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <Edit className="w-4 h-4" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => handleDeleteCategory(item.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const genreColumns: ColumnDef<ApiGenre>[] = [
    {
      id: "index",
      header: "No",
      cell: ({ row }) => <div className="text-center w-8 text-gray-500">{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Nama Genre",
      cell: ({ row }) => <div className="font-medium text-gray-900">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => <div className="text-gray-500">{row.getValue("slug")}</div>,
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-2">
            <Link href={`/admin/genres/edit/${item.id}`}>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <Edit className="w-4 h-4" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => handleDeleteGenre(item.id)}
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
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kategori & Genre</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola kategori utama dan genre untuk buku-buku Anda.</p>
        </div>

        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="categories" className="flex items-center gap-2"><Layers className="size-4" /> Kategori</TabsTrigger>
            <TabsTrigger value="genres" className="flex items-center gap-2"><Tag className="size-4" /> Genre</TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories" className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari kategori..."
                  value={searchCat}
                  onChange={(e) => setSearchCat(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Link href="/admin/categories/create" className="w-full sm:w-auto">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Kategori
                </Button>
              </Link>
            </div>
            
            {/* Table */}
            {loadingCats ? (
              <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <DataTable columns={catColumns} data={categories} />
            )}
          </TabsContent>
          
          <TabsContent value="genres" className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari genre..."
                  value={searchGenre}
                  onChange={(e) => setSearchGenre(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Link href="/admin/genres/create" className="w-full sm:w-auto">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Genre
                </Button>
              </Link>
            </div>
            
            {/* Table */}
            {loadingGenres ? (
              <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <DataTable columns={genreColumns} data={genres} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
}
