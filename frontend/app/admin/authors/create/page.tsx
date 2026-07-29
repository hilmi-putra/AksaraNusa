"use client";

import React, { useEffect } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { AuthorForm } from "@/features/admin/authors/AuthorForm";
import { createAdminAuthor } from "@/lib/api/authors";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

export default function CreateAuthorPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([
      { label: "Manajemen Buku", href: "/admin/books" },
      { label: "Penulis", href: "/admin/authors" },
      { label: "Tambah Penulis Baru" },
    ]);
  }, [setItems]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await createAdminAuthor(data);
      toast.success("Penulis berhasil ditambahkan");
      router.push("/admin/authors");
    } catch (error: any) {
      console.error("Failed to create author", error);
      let errorMsg = error?.response?.data?.message || "Gagal menambahkan penulis";
      
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
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tambah Penulis Baru</h1>
          <p className="text-sm text-gray-500 mt-1">Isi formulir di bawah ini untuk menambahkan penulis baru.</p>
        </div>
        
        <AuthorForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </AdminDashboardLayout>
  );
}
