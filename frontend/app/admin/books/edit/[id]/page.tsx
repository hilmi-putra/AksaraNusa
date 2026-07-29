"use client";

import React, { useEffect, useState, use } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { BookForm, apiBookToFormData, BookFormData } from "@/features/admin/books/BookForm";
import { getAdminBook, updateAdminBook } from "@/lib/api/books";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

export default function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [initialData, setInitialData] = useState<BookFormData | undefined>(undefined);
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response: any = await getAdminBook(Number(resolvedParams.id));
        const bookData = response.data;
        setInitialData(apiBookToFormData(bookData));
        setItems([
          { label: "Manajemen Buku", href: "/admin/books" },
          { label: "Buku", href: "/admin/books" },
          { label: bookData.title },
        ]);
      } catch (error) {
        console.error("Failed to fetch book", error);
        toast.error("Gagal memuat data buku");
        router.push("/admin/books");
      } finally {
        setFetching(false);
      }
    };
    fetchBook();
  }, [resolvedParams.id, router, setItems]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await updateAdminBook(Number(resolvedParams.id), data);
      toast.success("Perubahan buku berhasil disimpan");
      router.push("/admin/books");
    } catch (error: any) {
      if (error?.response?.status !== 422) {
        console.error("Failed to update book", error);
      }
      let errorMsg = error?.response?.data?.message || "Gagal menyimpan perubahan";

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
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit Buku</h1>
          <p className="text-sm text-gray-500 mt-1">Perbarui informasi dan metadata buku.</p>
        </div>

        {fetching ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        ) : (
          <BookForm initialData={initialData} onSubmit={handleSubmit} isEdit loading={loading} />
        )}
      </div>
    </AdminDashboardLayout>
  );
}
