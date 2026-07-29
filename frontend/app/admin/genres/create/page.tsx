"use client";

import React, { useEffect } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { GenreForm } from "@/features/admin/categories/GenreForm";
import { createAdminGenre } from "@/lib/api/categories";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

export default function CreateGenrePage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([
      { label: "Manajemen Buku", href: "/admin/books" },
      { label: "Kategori & Genre", href: "/admin/categories" },
      { label: "Tambah Genre" },
    ]);
  }, [setItems]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await createAdminGenre(data);
      toast.success("Genre berhasil ditambahkan");
      router.push("/admin/categories?tab=genres"); // Ideally we would want to open genres tab, but we'll just navigate to categories
    } catch (error: any) {
      console.error("Failed to create genre", error);
      let errorMsg = error?.response?.data?.message || "Gagal menambahkan genre";
      
      const errors = error?.response?.data?.errors;
      if (errors && typeof errors === 'object') {
        const firstErrorKey = Object.keys(errors)[0];
        if (firstErrorKey && Array.isArray(errors[firstErrorKey]) && errors[firstErrorKey].length > 0) {
          errorMsg = errors[firstErrorKey][0];
        }
      }
      
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tambah Genre Baru</h1>
          <p className="text-sm text-gray-500 mt-1">Buat genre baru untuk mengklasifikasikan isi buku.</p>
        </div>
        
        <GenreForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </AdminDashboardLayout>
  );
}
