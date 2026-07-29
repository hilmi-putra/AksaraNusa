"use client";

import { useEffect } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { BlogAuthorForm } from "@/components/admin/blog/authors/BlogAuthorForm";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateBlogAuthorPage() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([
      { label: "Blog", href: "/admin/blog/posts" },
      { label: "Author", href: "/admin/blog/authors" },
      { label: "Tambah Author" },
    ]);
  }, [setItems]);

  return (
    <AdminDashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tambah Author Blog</h1>
          <p className="text-sm text-gray-500 mt-1">Buat profil penulis baru untuk artikel blog.</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <BlogAuthorForm />
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
