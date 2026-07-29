"use client";

import React, { useEffect, useState } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { AuthorForm } from "@/features/admin/authors/AuthorForm";
import { getAdminAuthor, updateAdminAuthor, ApiAuthor } from "@/lib/api/authors";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

export default function EditAuthorPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [author, setAuthor] = useState<ApiAuthor | null>(null);
  const { setItems } = useBreadcrumb();
  
  // React 19 / Next.js 15 requires unwrapping params if it's a promise,
  // but for safety we handle both
  const unwrappedParams = params instanceof Promise ? React.use(params) : params;

  useEffect(() => {
    setItems([
      { label: "Manajemen Buku", href: "/admin/books" },
      { label: "Penulis", href: "/admin/authors" },
      { label: "Edit Penulis" },
    ]);
  }, [setItems]);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await getAdminAuthor(unwrappedParams.id);
        setAuthor(response as any);
      } catch (error) {
        console.error("Failed to load author", error);
        toast.error("Gagal memuat data penulis");
        router.push("/admin/authors");
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, [unwrappedParams.id, router]);

  const handleSubmit = async (data: any) => {
    setSaving(true);
    try {
      await updateAdminAuthor(unwrappedParams.id, data);
      toast.success("Penulis berhasil diperbarui");
      router.push("/admin/authors");
    } catch (error: any) {
      console.error("Failed to update author", error);
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
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit Penulis</h1>
          <p className="text-sm text-gray-500 mt-1">Perbarui informasi data penulis.</p>
        </div>
        
        {author && (
          <AuthorForm 
            initialData={author} 
            onSubmit={handleSubmit} 
            loading={saving} 
            isEdit 
          />
        )}
      </div>
    </AdminDashboardLayout>
  );
}
