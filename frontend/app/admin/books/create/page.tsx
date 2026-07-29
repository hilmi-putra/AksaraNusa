"use client";

import React, { useEffect } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { BookForm } from "@/features/admin/books/BookForm";
import { createAdminBook } from "@/lib/api/books";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

export default function CreateBookPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([
      { label: "Manajemen Buku", href: "/admin/books" },
      { label: "Buku", href: "/admin/books" },
      { label: "Tambah Buku Baru" },
    ]);
  }, [setItems]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await createAdminBook(data);
      toast.success("Buku berhasil ditambahkan");
      router.push("/admin/books");
    } catch (error: any) {
      if (error?.response?.status !== 422) {
        console.error("Failed to create book", error);
      }
      let errorMsg = error?.response?.data?.message || "Gagal menambahkan buku";
      
      // Extract Laravel validation errors if present
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
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tambah Buku Baru</h1>
          <p className="text-sm text-gray-500 mt-1">Isi formulir di bawah ini untuk menambahkan buku baru ke dalam katalog.</p>
        </div>
        
        <BookForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </AdminDashboardLayout>
  );
}
