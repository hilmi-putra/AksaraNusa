"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ApiAuthor } from "@/lib/api/authors";

export interface AuthorFormData {
  name: string;
  slug: string;
  bio: string;
  photo: string;
  website: string;
  email: string;
}

const defaultFormData: AuthorFormData = {
  name: "",
  slug: "",
  bio: "",
  photo: "",
  website: "",
  email: "",
};

interface AuthorFormProps {
  initialData?: ApiAuthor;
  onSubmit: (data: any) => Promise<void>;
  isEdit?: boolean;
  loading?: boolean;
}

export function AuthorForm({ initialData, onSubmit, isEdit = false, loading = false }: AuthorFormProps) {
  const [formData, setFormData] = useState<AuthorFormData>(defaultFormData);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        slug: initialData.slug || "",
        bio: initialData.bio || "",
        photo: initialData.photo || "",
        website: initialData.website || "",
        email: initialData.email || "",
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
              <Label htmlFor="name">Nama Penulis <span className="text-red-500">*</span></Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Masukkan nama penulis" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug URL</Label>
              <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} placeholder="Otomatis jika dikosongkan" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biografi / Deskripsi</Label>
            <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} placeholder="Biografi singkat penulis" className="min-h-[120px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="photo">URL Foto</Label>
              <Input id="photo" name="photo" value={formData.photo} onChange={handleChange} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@contoh.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website / Sosial Media</Label>
              <Input id="website" name="website" value={formData.website} onChange={handleChange} placeholder="https://..." />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => window.history.back()} disabled={loading}>
          Batal
        </Button>
        <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white" disabled={loading}>
          {loading ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Simpan Penulis"}
        </Button>
      </div>
    </form>
  );
}
