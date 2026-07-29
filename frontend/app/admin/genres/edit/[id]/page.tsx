"use client";

import React, { useEffect, useState } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { GenreForm } from "@/features/admin/categories/GenreForm";
import { getAdminGenre, updateAdminGenre, ApiGenre } from "@/lib/api/categories";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

export default function EditGenrePage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [genre, setGenre] = useState<ApiGenre | null>(null);
  const { setItems } = useBreadcrumb();
  
  const unwrappedParams = params instanceof Promise ? React.use(params) : params;

  useEffect(() => {
    setItems([
      { label: "Manajemen Buku", href: "/admin/books" },
      { label: "Kategori & Genre", href: "/admin/categories" },
      { label: "Edit Genre" },
    ]);
  }, [setItems]);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await getAdminGenre(unwrappedParams.id);
        setGenre(response as any);
      } catch (error) {
        console.error("Failed to load genre", error);
        toast.error("Gagal memuat data genre");
        router.push("/admin/categories");
      } finally {
        setLoading(false);
      }
    };
    fetchGenre();
  }, [unwrappedParams.id, router]);

  const handleSubmit = async (data: any) => {
    setSaving(true);
    try {
      await updateAdminGenre(unwrappedParams.id, data);
      toast.success("Genre berhasil diperbarui");
      router.push("/admin/categories");
    } catch (error: any) {
      console.error("Failed to update genre", error);
      let errorMsg = error?.response?.data?.message || "Gagal menyimpan perubahan";

      const errors = error?.response?.data?.errors;
      if (errors && typeof errors === 'object') {
        const firstErrorKey = Object.keys(errors)[0];
        if (firstErrorKey && Array.isArray(errors[firstErrorKey]) && errors[firstErrorKey].length > 0) {
          errorMsg = errors[firstErrorKey][0];
        }
      }

      toast.error(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit Genre</h1>
          <p className="text-sm text-gray-500 mt-1">Perbarui informasi data genre.</p>
        </div>
        
        {genre && (
          <GenreForm 
            initialData={genre} 
            onSubmit={handleSubmit} 
            loading={saving} 
            isEdit 
          />
        )}
      </div>
    </AdminDashboardLayout>
  );
}
