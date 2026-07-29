"use client";

import { useEffect } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { BlogTagForm } from "@/components/admin/blog/tags/BlogTagForm";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateBlogTagPage() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([
      { label: "Blog", href: "/admin/blog/posts" },
      { label: "Tag", href: "/admin/blog/tags" },
      { label: "Tambah Tag" },
    ]);
  }, [setItems]);

  return (
    <AdminDashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tambah Tag Blog</h1>
          <p className="text-sm text-gray-500 mt-1">Buat tag baru untuk mengelompokkan artikel blog.</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <BlogTagForm />
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
