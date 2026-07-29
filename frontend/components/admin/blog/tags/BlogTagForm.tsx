"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  createAdminBlogTag, 
  updateAdminBlogTag, 
  getAdminBlogTag 
} from "@/lib/api/blog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { slugify } from "@/lib/utils";

const blogTagSchema = z.object({
  name: z.string().min(2, "Nama tag minimal 2 karakter"),
  slug: z.string().min(2, "Slug minimal 2 karakter"),
});

type BlogTagFormValues = z.infer<typeof blogTagSchema>;

interface BlogTagFormProps {
  tagId?: number;
}

export function BlogTagForm({ tagId }: BlogTagFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!!tagId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogTagFormValues>({
    resolver: zodResolver(blogTagSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const nameValue = watch("name");

  useEffect(() => {
    if (!tagId && nameValue) {
      setValue("slug", slugify(nameValue), { shouldValidate: true });
    }
  }, [nameValue, tagId, setValue]);

  useEffect(() => {
    const fetchTag = async () => {
      if (!tagId) return;
      try {
        const response = await getAdminBlogTag(tagId);
        const data = response.data?.data || response.data;
        setValue("name", data.name);
        setValue("slug", data.slug);
      } catch (error) {
        toast.error("Gagal mengambil data tag");
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchTag();
  }, [tagId, setValue]);

  const onSubmit = async (data: BlogTagFormValues) => {
    setIsLoading(true);
    try {
      if (tagId) {
        await updateAdminBlogTag(tagId, data);
        toast.success("Tag berhasil diperbarui");
      } else {
        await createAdminBlogTag(data);
        toast.success("Tag berhasil ditambahkan");
      }
      router.push("/admin/blog/tags");
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nama Tag <span className="text-red-500">*</span></Label>
          <Input id="name" {...register("name")} placeholder="Contoh: Fiksi" className="mt-1" />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="slug">Slug <span className="text-red-500">*</span></Label>
          <Input id="slug" {...register("slug")} placeholder="Contoh: fiksi" className="mt-1" />
          {errors.slug && <p className="text-sm text-red-500 mt-1">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push("/admin/blog/tags")}
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
          {tagId ? "Simpan Perubahan" : "Simpan Tag"}
        </Button>
      </div>
    </form>
  );
}
