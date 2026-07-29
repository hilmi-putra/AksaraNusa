"use client";

import { useEffect } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { BlogCategoryForm } from "@/components/admin/blog/categories/BlogCategoryForm";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateBlogCategoryPage() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([
      { label: "Blog", href: "/admin/blog/posts" },
      { label: "Kategori", href: "/admin/blog/categories" },
      { label: "Tambah Kategori" },
    ]);
  }, [setItems]);

  return (
    <AdminDashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tambah Kategori Blog</h1>
          <p className="text-sm text-gray-500 mt-1">Buat kategori baru untuk mengelompokkan artikel blog.</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <BlogCategoryForm />
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
