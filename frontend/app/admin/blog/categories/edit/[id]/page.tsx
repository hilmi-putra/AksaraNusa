"use client";

import { useEffect } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { BlogCategoryForm } from "@/components/admin/blog/categories/BlogCategoryForm";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";

export default function EditBlogCategoryPage() {
  const { setItems } = useBreadcrumb();
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  useEffect(() => {
    setItems([
      { label: "Blog", href: "/admin/blog/posts" },
      { label: "Kategori", href: "/admin/blog/categories" },
      { label: "Edit Kategori" },
    ]);
  }, [setItems]);

  return (
    <AdminDashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit Kategori Blog</h1>
          <p className="text-sm text-gray-500 mt-1">Ubah informasi kategori blog.</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {id ? <BlogCategoryForm categoryId={id} /> : <div>Invalid ID</div>}
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
