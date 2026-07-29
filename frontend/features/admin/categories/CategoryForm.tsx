"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ApiCategory } from "@/lib/api/categories";

export interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  image: string;
}

const defaultFormData: CategoryFormData = {
  name: "",
  slug: "",
  description: "",
  image: "",
};

interface CategoryFormProps {
  initialData?: ApiCategory;
  onSubmit: (data: any) => Promise<void>;
  isEdit?: boolean;
  loading?: boolean;
}

export function CategoryForm({ initialData, onSubmit, isEdit = false, loading = false }: CategoryFormProps) {
  const [formData, setFormData] = useState<CategoryFormData>(defaultFormData);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        image: initialData.image || "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Kategori <span className="text-red-500">*</span></Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Masukkan nama kategori" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug URL</Label>
              <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} placeholder="Otomatis jika dikosongkan" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Deskripsi kategori..." className="min-h-[100px]" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL Gambar</Label>
            <Input id="image" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => window.history.back()} disabled={loading}>
          Batal
        </Button>
        <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white" disabled={loading}>
          {loading ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Simpan Kategori"}
        </Button>
      </div>
    </form>
  );
}
