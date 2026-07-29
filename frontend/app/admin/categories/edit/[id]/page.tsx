"use client";

import React, { useEffect, useState } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { CategoryForm } from "@/features/admin/categories/CategoryForm";
import { getAdminCategory, updateAdminCategory, ApiCategory } from "@/lib/api/categories";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

export default function EditCategoryPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [category, setCategory] = useState<ApiCategory | null>(null);
  const { setItems } = useBreadcrumb();
  
  const unwrappedParams = params instanceof Promise ? React.use(params) : params;

  useEffect(() => {
    setItems([
      { label: "Manajemen Buku", href: "/admin/books" },
      { label: "Kategori & Genre", href: "/admin/categories" },
      { label: "Edit Kategori" },
    ]);
  }, [setItems]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getAdminCategory(unwrappedParams.id);
        setCategory(response as any);
      } catch (error) {
        console.error("Failed to load category", error);
        toast.error("Gagal memuat data kategori");
        router.push("/admin/categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [unwrappedParams.id, router]);

  const handleSubmit = async (data: any) => {
    setSaving(true);
    try {
      await updateAdminCategory(unwrappedParams.id, data);
      toast.success("Kategori berhasil diperbarui");
      router.push("/admin/categories");
    } catch (error: any) {
      console.error("Failed to update category", error);
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
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit Kategori</h1>
          <p className="text-sm text-gray-500 mt-1">Perbarui informasi data kategori.</p>
        </div>
        
        {category && (
          <CategoryForm 
            initialData={category} 
            onSubmit={handleSubmit} 
            loading={saving} 
            isEdit 
          />
        )}
      </div>
    </AdminDashboardLayout>
  );
}
