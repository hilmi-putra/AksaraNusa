"use client";

import { useEffect } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { BlogTagForm } from "@/components/admin/blog/tags/BlogTagForm";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";

export default function EditBlogTagPage() {
  const { setItems } = useBreadcrumb();
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  useEffect(() => {
    setItems([
      { label: "Blog", href: "/admin/blog/posts" },
      { label: "Tag", href: "/admin/blog/tags" },
      { label: "Edit Tag" },
    ]);
  }, [setItems]);

  return (
    <AdminDashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit Tag Blog</h1>
          <p className="text-sm text-gray-500 mt-1">Ubah informasi tag blog.</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {id ? <BlogTagForm tagId={id} /> : <div>Invalid ID</div>}
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
