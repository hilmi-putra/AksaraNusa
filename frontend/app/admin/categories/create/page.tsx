"use client";

import React, { useEffect } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { CategoryForm } from "@/features/admin/categories/CategoryForm";
import { createAdminCategory } from "@/lib/api/categories";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([
      { label: "Manajemen Buku", href: "/admin/books" },
      { label: "Kategori & Genre", href: "/admin/categories" },
      { label: "Tambah Kategori" },
    ]);
  }, [setItems]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await createAdminCategory(data);
      toast.success("Kategori berhasil ditambahkan");
      router.push("/admin/categories");
    } catch (error: any) {
      console.error("Failed to create category", error);
      let errorMsg = error?.response?.data?.message || "Gagal menambahkan kategori";
      
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
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tambah Kategori Baru</h1>
          <p className="text-sm text-gray-500 mt-1">Buat kategori baru untuk mengelompokkan buku.</p>
        </div>
        
        <CategoryForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </AdminDashboardLayout>
  );
}
