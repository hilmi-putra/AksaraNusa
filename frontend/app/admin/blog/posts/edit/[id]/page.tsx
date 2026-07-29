"use client";

import { useEffect } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { BlogPostForm } from "@/components/admin/blog/posts/BlogPostForm";
import { useParams } from "next/navigation";

export default function EditBlogPostPage() {
  const { setItems } = useBreadcrumb();
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  useEffect(() => {
    setItems([
      { label: "Blog", href: "/admin/blog/posts" },
      { label: "Artikel", href: "/admin/blog/posts" },
      { label: "Edit Artikel" },
    ]);
  }, [setItems]);

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit Artikel Blog</h1>
          <p className="text-sm text-gray-500 mt-1">Ubah konten dan pengaturan artikel.</p>
        </div>

        {id ? <BlogPostForm postId={id} /> : <div>Invalid ID</div>}
      </div>
    </AdminDashboardLayout>
  );
}
