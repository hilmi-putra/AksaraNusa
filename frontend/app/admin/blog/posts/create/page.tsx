"use client";

import { useEffect } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { BlogPostForm } from "@/components/admin/blog/posts/BlogPostForm";

export default function CreateBlogPostPage() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([
      { label: "Blog", href: "/admin/blog/posts" },
      { label: "Artikel", href: "/admin/blog/posts" },
      { label: "Tulis Artikel" },
    ]);
  }, [setItems]);

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tulis Artikel Blog</h1>
          <p className="text-sm text-gray-500 mt-1">Buat konten artikel baru untuk website Anda.</p>
        </div>

        <BlogPostForm />
      </div>
    </AdminDashboardLayout>
  );
}
