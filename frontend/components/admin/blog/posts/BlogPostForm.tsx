"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  createAdminBlogPost, 
  updateAdminBlogPost, 
  getAdminBlogPost,
  getAdminBlogCategories,
  getAdminBlogAuthors,
  getAdminBlogTags
} from "@/lib/api/blog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CalendarIcon } from "lucide-react";
import { slugify } from "@/lib/utils";
import { MediaUploader } from "@/components/ui/media-uploader";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";

const blogPostSchema = z.object({
  title: z.string().min(2, "Judul minimal 2 karakter"),
  slug: z.string().min(2, "Slug minimal 2 karakter"),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  featured_image: z.string().optional(),
  thumbnail: z.string().optional(),
  status: z.enum(['draft', 'published', 'scheduled', 'archived']),
  is_featured: z.boolean().default(false),
  publish_date: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
  canonical_url: z.string().url("URL tidak valid").optional().or(z.literal('')),
  blog_category_id: z.coerce.number().optional(),
  blog_author_id: z.coerce.number().optional(),
  tags: z.array(z.number()).default([]),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

interface BlogPostFormProps {
  postId?: number;
}

export function BlogPostForm({ postId }: BlogPostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!!postId);
  const [isFetchingReferences, setIsFetchingReferences] = useState(true);
  
  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema) as any,
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featured_image: "",
      thumbnail: "",
      status: "draft",
      is_featured: false,
      publish_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      canonical_url: "",
      tags: [],
    },
  });

  const titleValue = watch("title");
  const tagsValue = watch("tags");
  const statusValue = watch("status");

  useEffect(() => {
    if (!postId && titleValue) {
      setValue("slug", slugify(titleValue), { shouldValidate: true });
    }
  }, [titleValue, postId, setValue]);

  useEffect(() => {
    const fetchReferences = async () => {
      try {
        const [catsRes, authsRes, tagsRes] = await Promise.all([
          getAdminBlogCategories({ per_page: 100 }),
          getAdminBlogAuthors({ per_page: 100 }),
          getAdminBlogTags({ per_page: 100 })
        ]);
        
        setCategories(catsRes.data || catsRes || []);
        setAuthors(authsRes.data || authsRes || []);
        setTags(tagsRes.data || tagsRes || []);
      } catch (error) {
        console.error("Failed to fetch references", error);
        toast.error("Gagal mengambil data referensi");
      } finally {
        setIsFetchingReferences(false);
      }
    };
    
    fetchReferences();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      try {
        const response = await getAdminBlogPost(postId);
        const data = response.data?.data || response.data;
        
        setValue("title", data.title);
        setValue("slug", data.slug);
        setValue("excerpt", data.excerpt || "");
        setValue("content", data.content || "");
        setValue("featured_image", data.featured_image || "");
        setValue("thumbnail", data.thumbnail || "");
        setValue("status", data.status);
        setValue("is_featured", !!data.is_featured);
        
        if (data.publish_date) {
          setValue("publish_date", data.publish_date.substring(0, 19).replace('T', ' '));
        }
        
        setValue("meta_title", data.meta_title || "");
        setValue("meta_description", data.meta_description || "");
        setValue("meta_keywords", data.meta_keywords || "");
        setValue("canonical_url", data.canonical_url || "");
        
        if (data.blog_category_id) setValue("blog_category_id", data.blog_category_id);
        if (data.blog_author_id) setValue("blog_author_id", data.blog_author_id);
        
        if (data.tags && Array.isArray(data.tags)) {
          setValue("tags", data.tags.map((t: any) => typeof t === 'object' ? t.id : t));
        }
        
      } catch (error) {
        toast.error("Gagal mengambil data artikel");
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, setValue]);

  const onSubmit = async (data: BlogPostFormValues) => {
    setIsLoading(true);
    try {
      if (postId) {
        await updateAdminBlogPost(postId, data);
        toast.success("Artikel berhasil diperbarui");
      } else {
        await createAdminBlogPost(data);
        toast.success("Artikel berhasil ditambahkan");
      }
      router.push("/admin/blog/posts");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTag = (tagId: number) => {
    const current = [...tagsValue];
    const index = current.indexOf(tagId);
    if (index === -1) {
      current.push(tagId);
    } else {
      current.splice(index, 1);
    }
    setValue("tags", current, { shouldValidate: true, shouldDirty: true });
  };

  if (isFetching || isFetchingReferences) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-6">
        <div className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold border-b pb-2">Informasi Utama</h2>
          
          <div>
            <Label htmlFor="title">Judul Artikel <span className="text-red-500">*</span></Label>
            <Input id="title" {...register("title")} placeholder="Contoh: Cara Menulis Buku" className="mt-1" />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="slug">Slug <span className="text-red-500">*</span></Label>
            <Input id="slug" {...register("slug")} placeholder="Contoh: cara-menulis-buku" className="mt-1" />
            {errors.slug && <p className="text-sm text-red-500 mt-1">{errors.slug.message}</p>}
          </div>

          <div>
            <Label htmlFor="excerpt">Kutipan / Excerpt</Label>
            <Textarea 
              id="excerpt" 
              {...register("excerpt")} 
              placeholder="Ringkasan singkat artikel..." 
              className="mt-1 min-h-[100px]" 
            />
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold border-b pb-2">Konten</h2>
          <div>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor value={field.value || ""} onChange={field.onChange} />
              )}
            />
          </div>
        </div>
        
        <div className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold border-b pb-2">SEO & Meta</h2>
          
          <div>
            <Label htmlFor="meta_title">Meta Title</Label>
            <Input id="meta_title" {...register("meta_title")} placeholder="Judul untuk mesin pencari" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea 
              id="meta_description" 
              {...register("meta_description")} 
              placeholder="Deskripsi untuk mesin pencari (max 160 karakter)" 
              className="mt-1" 
            />
          </div>
          
          <div>
            <Label htmlFor="meta_keywords">Meta Keywords</Label>
            <Input id="meta_keywords" {...register("meta_keywords")} placeholder="Kata kunci, pisahkan dengan koma" className="mt-1" />
          </div>
          
          <div>
            <Label htmlFor="canonical_url">Canonical URL</Label>
            <Input id="canonical_url" {...register("canonical_url")} placeholder="https://contoh.com/artikel" className="mt-1" />
            {errors.canonical_url && <p className="text-sm text-red-500 mt-1">{errors.canonical_url.message}</p>}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-80 space-y-6">
        <div className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold border-b pb-2">Publikasi</h2>
          
          <div className="flex items-center space-x-2 pt-2">
            <Controller
              name="is_featured"
              control={control}
              render={({ field }) => (
                <Checkbox 
                  id="is_featured" 
                  checked={field.value} 
                  onCheckedChange={field.onChange} 
                />
              )}
            />
            <Label htmlFor="is_featured" className="cursor-pointer">Featured Article</Label>
          </div>

          <div>
            <Label htmlFor="status">Status Publikasi</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {statusValue === 'scheduled' || statusValue === 'published' ? (
            <div>
              <Label htmlFor="publish_date">Tanggal Publikasi</Label>
              <div className="relative mt-1">
                <Input 
                  id="publish_date" 
                  type="datetime-local" 
                  {...register("publish_date")} 
                  className="pl-10" 
                />
                <CalendarIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          ) : null}
          
          <div className="pt-4 border-t mt-4 flex flex-col gap-2">
            <Button 
              type="submit" 
              className="bg-amber-600 hover:bg-amber-700 text-white w-full"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {postId ? "Simpan Perubahan" : "Simpan Artikel"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.push("/admin/blog/posts")}
              disabled={isLoading}
              className="w-full"
            >
              Batal
            </Button>
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold border-b pb-2">Kategori & Author</h2>
          
          <div>
            <Label htmlFor="blog_category_id">Kategori</Label>
            <Controller
              name="blog_category_id"
              control={control}
              render={({ field }) => (
                <Select 
                  onValueChange={(val) => field.onChange(val === "null" ? undefined : Number(val))} 
                  value={field.value ? field.value.toString() : "null"}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="null">Tanpa Kategori</SelectItem>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label htmlFor="blog_author_id">Author</Label>
            <Controller
              name="blog_author_id"
              control={control}
              render={({ field }) => (
                <Select 
                  onValueChange={(val) => field.onChange(val === "null" ? undefined : Number(val))} 
                  value={field.value ? field.value.toString() : "null"}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih author" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="null">Tanpa Author</SelectItem>
                    {authors.map((a) => (
                      <SelectItem key={a.id} value={a.id.toString()}>{a.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold border-b pb-2">Tags</h2>
          <div className="flex flex-wrap gap-2 pt-2 max-h-48 overflow-y-auto">
            {tags.length > 0 ? tags.map((tag) => (
              <div key={tag.id} className="flex items-center space-x-2 bg-gray-50 p-2 rounded border">
                <Checkbox 
                  id={`tag-${tag.id}`}
                  checked={tagsValue.includes(tag.id)}
                  onCheckedChange={() => toggleTag(tag.id)}
                />
                <Label htmlFor={`tag-${tag.id}`} className="cursor-pointer text-sm font-normal">
                  {tag.name}
                </Label>
              </div>
            )) : (
              <p className="text-sm text-gray-500">Belum ada tag tersedia.</p>
            )}
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold border-b pb-2">Media</h2>
          
          <div>
            <Label>Featured Image</Label>
            <p className="text-xs text-gray-500 mb-2">Gambar utama artikel</p>
            <MediaUploader
              value={watch("featured_image") || ""}
              onChange={(url) => setValue("featured_image", url, { shouldValidate: true })}
            />
          </div>
          
          <div>
            <Label>Thumbnail (Opsional)</Label>
            <p className="text-xs text-gray-500 mb-2">Gambar kecil (persegi)</p>
            <MediaUploader
              value={watch("thumbnail") || ""}
              onChange={(url) => setValue("thumbnail", url, { shouldValidate: true })}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
