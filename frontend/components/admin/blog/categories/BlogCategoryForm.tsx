"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  createAdminBlogCategory, 
  updateAdminBlogCategory, 
  getAdminBlogCategory 
} from "@/lib/api/blog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { slugify } from "@/lib/utils";

const blogCategorySchema = z.object({
  name: z.string().min(2, "Nama kategori minimal 2 karakter"),
  slug: z.string().min(2, "Slug minimal 2 karakter"),
  color: z.string().optional(),
  icon: z.string().optional(),
  description: z.string().optional(),
});

type BlogCategoryFormValues = z.infer<typeof blogCategorySchema>;

interface BlogCategoryFormProps {
  categoryId?: number;
}

export function BlogCategoryForm({ categoryId }: BlogCategoryFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!!categoryId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogCategoryFormValues>({
    resolver: zodResolver(blogCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
      color: "",
      icon: "",
      description: "",
    },
  });

  const nameValue = watch("name");

  useEffect(() => {
    if (!categoryId && nameValue) {
      setValue("slug", slugify(nameValue), { shouldValidate: true });
    }
  }, [nameValue, categoryId, setValue]);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryId) return;
      try {
        const response = await getAdminBlogCategory(categoryId);
        const data = response.data?.data || response.data;
        setValue("name", data.name);
        setValue("slug", data.slug);
        setValue("color", data.color || "");
        setValue("icon", data.icon || "");
        setValue("description", data.description || "");
      } catch (error) {
        toast.error("Gagal mengambil data kategori");
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchCategory();
  }, [categoryId, setValue]);

  const onSubmit = async (data: BlogCategoryFormValues) => {
    setIsLoading(true);
    try {
      if (categoryId) {
        await updateAdminBlogCategory(categoryId, data);
        toast.success("Kategori berhasil diperbarui");
      } else {
        await createAdminBlogCategory(data);
        toast.success("Kategori berhasil ditambahkan");
      }
      router.push("/admin/blog/categories");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nama Kategori <span className="text-red-500">*</span></Label>
          <Input id="name" {...register("name")} placeholder="Contoh: Tips Menulis" className="mt-1" />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="slug">Slug <span className="text-red-500">*</span></Label>
          <Input id="slug" {...register("slug")} placeholder="Contoh: tips-menulis" className="mt-1" />
          {errors.slug && <p className="text-sm text-red-500 mt-1">{errors.slug.message}</p>}
        </div>

        <div>
          <Label htmlFor="color">Warna (Hex)</Label>
          <div className="flex gap-2 mt-1">
            <Input id="color" type="color" {...register("color")} className="w-16 p-1 h-10" />
            <Input {...register("color")} placeholder="#000000" className="flex-1" />
          </div>
        </div>

        <div>
          <Label htmlFor="icon">Icon (Optional)</Label>
          <Input id="icon" {...register("icon")} placeholder="Contoh: BookOpen" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea 
            id="description" 
            {...register("description")} 
            placeholder="Deskripsi singkat tentang kategori ini..." 
            className="mt-1 min-h-[100px]" 
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push("/admin/blog/categories")}
          disabled={isLoading}
        >
          Batal
        </Button>
        <Button 
          type="submit" 
          className="bg-amber-600 hover:bg-amber-700 text-white"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {categoryId ? "Simpan Perubahan" : "Simpan Kategori"}
        </Button>
      </div>
    </form>
  );
}
