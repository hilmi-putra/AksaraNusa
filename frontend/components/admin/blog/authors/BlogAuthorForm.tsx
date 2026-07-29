"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  createAdminBlogAuthor, 
  updateAdminBlogAuthor, 
  getAdminBlogAuthor 
} from "@/lib/api/blog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { slugify } from "@/lib/utils";
import { MediaUploader } from "@/components/ui/media-uploader";

const socialMediaSchema = z.object({
  platform: z.string().min(1, "Platform wajib diisi"),
  url: z.string().url("URL tidak valid").min(1, "URL wajib diisi"),
});

const blogAuthorSchema = z.object({
  name: z.string().min(2, "Nama author minimal 2 karakter"),
  slug: z.string().min(2, "Slug minimal 2 karakter"),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  social_media: z.array(socialMediaSchema).optional(),
});

type BlogAuthorFormValues = z.infer<typeof blogAuthorSchema>;

interface BlogAuthorFormProps {
  authorId?: number;
}

export function BlogAuthorForm({ authorId }: BlogAuthorFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!!authorId);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogAuthorFormValues>({
    resolver: zodResolver(blogAuthorSchema) as any,
    defaultValues: {
      name: "",
      slug: "",
      avatar: "",
      bio: "",
      social_media: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "social_media",
    control,
  });

  const nameValue = watch("name");

  useEffect(() => {
    if (!authorId && nameValue) {
      setValue("slug", slugify(nameValue), { shouldValidate: true });
    }
  }, [nameValue, authorId, setValue]);

  useEffect(() => {
    const fetchAuthor = async () => {
      if (!authorId) return;
      try {
        const response = await getAdminBlogAuthor(authorId);
        const data = response.data?.data || response.data;
        setValue("name", data.name);
        setValue("slug", data.slug);
        setValue("avatar", data.avatar || "");
        setValue("bio", data.bio || "");
        
        // Transform social media object to array if needed
        if (data.social_media && !Array.isArray(data.social_media)) {
          const socialArray = Object.entries(data.social_media).map(([platform, url]) => ({
            platform,
            url: url as string,
          }));
          setValue("social_media", socialArray);
        } else if (Array.isArray(data.social_media)) {
          setValue("social_media", data.social_media);
        }
      } catch (error) {
        toast.error("Gagal mengambil data author");
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchAuthor();
  }, [authorId, setValue]);

  const onSubmit = async (data: BlogAuthorFormValues) => {
    setIsLoading(true);
    try {
      // Transform social_media back to object if backend expects key-value
      const formattedData = {
        ...data,
        social_media: data.social_media?.reduce((acc: any, curr) => {
          acc[curr.platform.toLowerCase()] = curr.url;
          return acc;
        }, {}) || {},
      };

      if (authorId) {
        await updateAdminBlogAuthor(authorId, formattedData);
        toast.success("Author berhasil diperbarui");
      } else {
        await createAdminBlogAuthor(formattedData);
        toast.success("Author berhasil ditambahkan");
      }
      router.push("/admin/blog/authors");
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      <div className="space-y-4">
        <div>
          <Label htmlFor="avatar">Avatar</Label>
          <div className="mt-1">
            <MediaUploader
              value={watch("avatar") || ""}
              onChange={(url) => setValue("avatar", url, { shouldValidate: true })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nama Author <span className="text-red-500">*</span></Label>
            <Input id="name" {...register("name")} placeholder="Contoh: John Doe" className="mt-1" />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="slug">Slug <span className="text-red-500">*</span></Label>
            <Input id="slug" {...register("slug")} placeholder="Contoh: john-doe" className="mt-1" />
            {errors.slug && <p className="text-sm text-red-500 mt-1">{errors.slug.message}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio" 
            {...register("bio")} 
            placeholder="Tuliskan biografi singkat author..." 
            className="mt-1 min-h-[120px]" 
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Social Media</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ platform: "", url: "" })}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Tautan
            </Button>
          </div>
          
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-start gap-3">
                <div className="w-1/3">
                  <Input
                    {...register(`social_media.${index}.platform`)}
                    placeholder="Platform (cth: Twitter)"
                  />
                  {errors.social_media?.[index]?.platform && (
                    <p className="text-sm text-red-500 mt-1">{errors.social_media[index]?.platform?.message}</p>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    {...register(`social_media.${index}.url`)}
                    placeholder="URL Profil"
                  />
                  {errors.social_media?.[index]?.url && (
                    <p className="text-sm text-red-500 mt-1">{errors.social_media[index]?.url?.message}</p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            
            {fields.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4 border border-dashed rounded-md">
                Belum ada tautan social media. Klik tombol tambah untuk menambahkan.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push("/admin/blog/authors")}
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
          {authorId ? "Simpan Perubahan" : "Simpan Author"}
        </Button>
      </div>
    </form>
  );
}
