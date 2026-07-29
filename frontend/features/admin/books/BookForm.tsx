"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAdminAuthors, getAdminPublishers, getAdminCategories, getAdminGenres,
  type MasterDataItem,
} from "@/lib/api/books";
import { ApiBook } from "@/types/book";
import {
  BookOpen, ImageIcon, FileText, DollarSign, AlignLeft,
  Search as SearchIcon, Globe, X, Plus
} from "lucide-react";
import Link from "next/link";
import { MediaUploader } from "@/components/ui/media-uploader";

// Dynamic import for Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false, loading: () => <div className="h-[200px] bg-gray-50 rounded-lg animate-pulse" /> });
import "react-quill-new/dist/quill.snow.css";

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ],
};

const LANGUAGES = [
  { value: "id", label: "Bahasa Indonesia" },
  { value: "en", label: "English" },
  { value: "jv", label: "Bahasa Jawa" },
  { value: "su", label: "Bahasa Sunda" },
  { value: "ms", label: "Bahasa Melayu" },
  { value: "ar", label: "العربية (Arabic)" },
  { value: "zh", label: "中文 (Chinese)" },
];

export interface BookFormData {
  title: string;
  subtitle: string;
  isbn: string;
  sku: string;
  author_id: string;
  publisher_id: string;
  categories: number[];
  genres: number[];
  language: string;
  status: string;
  published_at: string;
  cover_image: string;
  image_gallery: string[];
  digital_file_url: string;
  digital_file_size: string;
  digital_file_format: string;
  page_count: string;
  weight: string;
  dimensions: string;
  cover_type: string;
  paper_type: string;
  edition: string;
  book_type: string;
  specifications: Record<string, string>;
  price: string;
  discount: string;
  promo_price: string;
  promo_start_at: string;
  promo_end_at: string;
  stock: string;
  short_description: string;
  long_description: string;
  editor_note: string;
  additional_info: string;
  is_featured: boolean;
  is_bestseller: boolean;
  is_editor_choice: boolean;
  sort_order: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

export const defaultBookFormData: BookFormData = {
  title: "", subtitle: "", isbn: "", sku: "",
  author_id: "", publisher_id: "",
  categories: [], genres: [],
  language: "id", status: "draft", published_at: "",
  cover_image: "", image_gallery: ["", "", "", ""],
  digital_file_url: "", digital_file_size: "", digital_file_format: "",
  page_count: "", weight: "", dimensions: "",
  cover_type: "softcover", paper_type: "", edition: "", book_type: "physical",
  specifications: {},
  price: "", discount: "0", promo_price: "", promo_start_at: "", promo_end_at: "",
  stock: "0",
  short_description: "", long_description: "", editor_note: "", additional_info: "",
  is_featured: false, is_bestseller: false, is_editor_choice: false, sort_order: "0",
  meta_title: "", meta_description: "", meta_keywords: "",
};

export function apiBookToFormData(book: ApiBook): BookFormData {
  return {
    title: book.title || "",
    subtitle: book.subtitle || "",
    isbn: book.isbn || "",
    sku: book.sku || "",
    author_id: book.author?.id?.toString() || "",
    publisher_id: book.publisher?.id?.toString() || "",
    categories: book.categories?.map((c: any) => c.id) || [],
    genres: book.genres?.map((g: any) => g.id) || [],
    language: book.language || "id",
    status: book.status || "draft",
    published_at: book.published_at ? book.published_at.split("T")[0] : "",
    cover_image: book.cover_image || "",
    image_gallery: (() => {
      let gallery: string[] = [];
      if (Array.isArray(book.image_gallery)) gallery = book.image_gallery;
      else if (typeof book.image_gallery === 'string') {
        try { gallery = JSON.parse(book.image_gallery); } catch (e) {}
      }
      return [...gallery, ...Array(Math.max(0, 4 - gallery.length)).fill("")].slice(0, 4);
    })(),
    digital_file_url: book.digital_file_url || "",
    digital_file_size: book.digital_file_size || "",
    digital_file_format: book.digital_file_format || "",
    page_count: book.page_count?.toString() || "",
    weight: book.weight?.toString() || "",
    dimensions: book.dimensions || "",
    cover_type: book.cover_type || "softcover",
    paper_type: book.paper_type || "",
    edition: book.edition || "",
    book_type: book.book_type || "physical",
    specifications: (() => {
      if (typeof book.specifications === 'string') {
        try { return JSON.parse(book.specifications); } catch (e) { return {}; }
      }
      return book.specifications || {};
    })(),
    price: book.price?.toString() || "",
    discount: book.discount?.toString() || "0",
    promo_price: book.promo_price?.toString() || "",
    promo_start_at: book.promo_start_at ? book.promo_start_at.split("T")[0] : "",
    promo_end_at: book.promo_end_at ? book.promo_end_at.split("T")[0] : "",
    stock: book.stock?.toString() || "0",
    short_description: book.short_description || "",
    long_description: book.long_description || "",
    editor_note: book.editor_note || "",
    additional_info: book.additional_info || "",
    is_featured: book.is_featured || false,
    is_bestseller: book.is_bestseller || false,
    is_editor_choice: book.is_editor_choice || false,
    sort_order: book.sort_order?.toString() || "0",
    meta_title: book.meta_title || "",
    meta_description: book.meta_description || "",
    meta_keywords: book.meta_keywords || "",
  };
}

export function formDataToPayload(formData: BookFormData): any {
  return {
    ...formData,
    price: parseFloat(formData.price) || 0,
    discount: parseFloat(formData.discount) || 0,
    promo_price: formData.promo_price ? parseFloat(formData.promo_price) : null,
    promo_start_at: formData.promo_start_at || null,
    promo_end_at: formData.promo_end_at || null,
    stock: parseInt(formData.stock, 10) || 0,
    page_count: formData.page_count ? parseInt(formData.page_count, 10) : null,
    weight: formData.weight ? parseFloat(formData.weight) : null,
    sort_order: parseInt(formData.sort_order, 10) || 0,
    image_gallery: formData.image_gallery.filter(Boolean),
    published_at: formData.published_at || null,
    specifications: Object.keys(formData.specifications).length > 0 ? formData.specifications : null,
  };
}

interface BookFormProps {
  initialData?: BookFormData;
  onSubmit: (data: any) => Promise<void>;
  isEdit?: boolean;
  loading?: boolean;
}

export function BookForm({ initialData, onSubmit, isEdit = false, loading = false }: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>(initialData || defaultBookFormData);
  const [authors, setAuthors] = useState<MasterDataItem[]>([]);
  const [publishers, setPublishers] = useState<MasterDataItem[]>([]);
  const [categories, setCategories] = useState<MasterDataItem[]>([]);
  const [genres, setGenres] = useState<MasterDataItem[]>([]);
  const [masterLoading, setMasterLoading] = useState(true);
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const [a, p, c, g] = await Promise.all([
          getAdminAuthors(), getAdminPublishers(), getAdminCategories(), getAdminGenres(),
        ]);
        setAuthors(Array.isArray(a) ? a : (a as any)?.data || []);
        setPublishers(Array.isArray(p) ? p : (p as any)?.data || []);
        setCategories(Array.isArray(c) ? c : (c as any)?.data || []);
        setGenres(Array.isArray(g) ? g : (g as any)?.data || []);
      } catch (e) {
        console.error("Failed to load master data", e);
      } finally {
        setMasterLoading(false);
      }
    };
    fetchMasterData();
  }, []);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckedChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleMultiSelect = (field: "categories" | "genres", id: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(id)
        ? prev[field].filter((v) => v !== id)
        : [...prev[field], id],
    }));
  };

  const handleGalleryChange = (index: number, value: string) => {
    setFormData((prev) => {
      const gallery = [...prev.image_gallery];
      gallery[index] = value;
      return { ...prev, image_gallery: gallery };
    });
  };

  const addSpec = () => {
    if (!specKey.trim()) return;
    setFormData((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, [specKey.trim()]: specValue.trim() },
    }));
    setSpecKey("");
    setSpecValue("");
  };

  const removeSpec = (key: string) => {
    setFormData((prev) => {
      const specs = { ...prev.specifications };
      delete specs[key];
      return { ...prev, specifications: specs };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formDataToPayload(formData));
  };

  const GALLERY_LABELS = ["Front Cover", "Back Cover", "Spine", "Inside Pages"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-1 p-1 bg-gray-50 rounded-xl">
          {[
            { value: "basic", icon: BookOpen, label: "Informasi Dasar" },
            { value: "media", icon: ImageIcon, label: "Media" },
            { value: "specs", icon: FileText, label: "Spesifikasi" },
            { value: "pricing", icon: DollarSign, label: "Harga & Stok" },
            { value: "content", icon: AlignLeft, label: "Deskripsi" },
            { value: "seo", icon: Globe, label: "SEO & Flags" },
          ].map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-3 py-2">
              <tab.icon className="size-3.5" /> {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab 1: Basic Info */}
        <TabsContent value="basic" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Buku <span className="text-red-500">*</span></Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required placeholder="Masukkan judul buku" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subjudul</Label>
              <Input id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="Subjudul (opsional)" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Penulis <span className="text-red-500">*</span></Label>
              <Select value={formData.author_id} onValueChange={(val) => handleSelectChange("author_id", val || "")} disabled={masterLoading}>
                <SelectTrigger>
                  <SelectValue placeholder={masterLoading ? "Memuat..." : "Pilih Penulis"}>
                    {authors.find(a => a.id.toString() === formData.author_id)?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {authors.map((a) => <SelectItem key={a.id} value={a.id.toString()}>{a.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Penerbit <span className="text-red-500">*</span></Label>
              <Select value={formData.publisher_id} onValueChange={(val) => handleSelectChange("publisher_id", val || "")} disabled={masterLoading}>
                <SelectTrigger>
                  <SelectValue placeholder={masterLoading ? "Memuat..." : "Pilih Penerbit"}>
                    {publishers.find(p => p.id.toString() === formData.publisher_id)?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {publishers.map((p) => <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Multi-select Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Kategori</Label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-lg min-h-[44px] bg-white">
                {categories.map((cat) => {
                  const selected = formData.categories.includes(cat.id);
                  return (
                    <Badge
                      key={cat.id}
                      variant={selected ? "default" : "outline"}
                      className={`cursor-pointer transition-all text-xs ${selected ? "bg-amber-600 hover:bg-amber-700" : "hover:bg-gray-50"}`}
                      onClick={() => handleMultiSelect("categories", cat.id)}
                    >
                      {cat.name} {selected && <X className="ml-1 size-3" />}
                    </Badge>
                  );
                })}
                {masterLoading && <span className="text-xs text-gray-400">Memuat kategori...</span>}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Genre</Label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-lg min-h-[44px] bg-white">
                {genres.map((genre) => {
                  const selected = formData.genres.includes(genre.id);
                  return (
                    <Badge
                      key={genre.id}
                      variant={selected ? "default" : "outline"}
                      className={`cursor-pointer transition-all text-xs ${selected ? "bg-amber-600 hover:bg-amber-700" : "hover:bg-gray-50"}`}
                      onClick={() => handleMultiSelect("genres", genre.id)}
                    >
                      {genre.name} {selected && <X className="ml-1 size-3" />}
                    </Badge>
                  );
                })}
                {masterLoading && <span className="text-xs text-gray-400">Memuat genre...</span>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Bahasa</Label>
              <Select value={formData.language} onValueChange={(val) => handleSelectChange("language", val || "")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((l) => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status <span className="text-red-500">*</span></Label>
              <Select value={formData.status} onValueChange={(val) => handleSelectChange("status", val || "")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="published_at">Tanggal Terbit</Label>
              <Input id="published_at" name="published_at" type="date" value={formData.published_at} onChange={handleChange} />
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Media */}
        <TabsContent value="media" className="mt-6 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Cover Utama</CardTitle></CardHeader>
            <CardContent>
              <MediaUploader 
                value={formData.cover_image} 
                onChange={(val) => handleSelectChange("cover_image", val)} 
                label="Cover Buku" 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Galeri Gambar</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GALLERY_LABELS.map((label, index) => (
                  <div key={index} className="space-y-2">
                    <Label className="text-xs">{label}</Label>
                    <MediaUploader 
                      value={formData.image_gallery[index] || ""}
                      onChange={(val) => handleGalleryChange(index, val)}
                      label={label}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">File Digital (E-book)</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="digital_file_url">URL File</Label>
                  <Input id="digital_file_url" name="digital_file_url" value={formData.digital_file_url} onChange={handleChange} placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="digital_file_format">Format</Label>
                  <Select value={formData.digital_file_format} onValueChange={(val) => handleSelectChange("digital_file_format", val || "")}>
                    <SelectTrigger><SelectValue placeholder="Pilih format" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="EPUB">EPUB</SelectItem>
                      <SelectItem value="MOBI">MOBI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="digital_file_size">Ukuran File</Label>
                  <Input id="digital_file_size" name="digital_file_size" value={formData.digital_file_size} onChange={handleChange} placeholder="cth: 15 MB" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Specs */}
        <TabsContent value="specs" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input id="isbn" name="isbn" value={formData.isbn} onChange={handleChange} placeholder="978-..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" name="sku" value={formData.sku} onChange={handleChange} placeholder="MP-XXX-0000" />
            </div>
            <div className="space-y-2">
              <Label>Tipe Buku <span className="text-red-500">*</span></Label>
              <Select value={formData.book_type} onValueChange={(val) => handleSelectChange("book_type", val || "")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">Physical</SelectItem>
                  <SelectItem value="digital">Digital</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="page_count">Jumlah Halaman</Label>
              <Input id="page_count" name="page_count" type="number" min="1" value={formData.page_count} onChange={handleChange} placeholder="324" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Berat (gram)</Label>
              <Input id="weight" name="weight" type="number" min="0" step="0.01" value={formData.weight} onChange={handleChange} placeholder="250" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensi</Label>
              <Input id="dimensions" name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="14 x 21 cm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Jenis Cover</Label>
              <Select value={formData.cover_type} onValueChange={(val) => handleSelectChange("cover_type", val || "")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="softcover">Softcover</SelectItem>
                  <SelectItem value="hardcover">Hardcover</SelectItem>
                  <SelectItem value="other">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paper_type">Jenis Kertas</Label>
              <Input id="paper_type" name="paper_type" value={formData.paper_type} onChange={handleChange} placeholder="Book Paper 70gsm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edition">Edisi</Label>
              <Input id="edition" name="edition" value={formData.edition} onChange={handleChange} placeholder="Edisi Pertama" />
            </div>
          </div>

          {/* Specifications Key-Value */}
          <Card>
            <CardHeader><CardTitle className="text-base">Spesifikasi Tambahan</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-xs">{key}</Badge>
                  <span className="text-sm text-gray-600 flex-1">{value}</span>
                  <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeSpec(key)}>
                    <X className="size-3.5" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input placeholder="Nama (cth: Binding)" value={specKey} onChange={(e) => setSpecKey(e.target.value)} className="flex-1" />
                <Input placeholder="Nilai (cth: Perfect Binding)" value={specValue} onChange={(e) => setSpecValue(e.target.value)} className="flex-1" />
                <Button type="button" variant="outline" size="sm" onClick={addSpec}><Plus className="size-4" /></Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Pricing */}
        <TabsContent value="pricing" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Harga Normal (Rp) <span className="text-red-500">*</span></Label>
              <Input id="price" name="price" type="number" min="0" value={formData.price} onChange={handleChange} required placeholder="85000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Diskon (%)</Label>
              <Input id="discount" name="discount" type="number" min="0" max="100" value={formData.discount} onChange={handleChange} placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stok <span className="text-red-500">*</span></Label>
              <Input id="stock" name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} required placeholder="100" />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Harga Promo (Opsional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="promo_price">Harga Promo (Rp)</Label>
                <Input id="promo_price" name="promo_price" type="number" min="0" value={formData.promo_price} onChange={handleChange} placeholder="65000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="promo_start_at">Mulai Promo</Label>
                <Input id="promo_start_at" name="promo_start_at" type="date" value={formData.promo_start_at} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="promo_end_at">Akhir Promo</Label>
                <Input id="promo_end_at" name="promo_end_at" type="date" value={formData.promo_end_at} onChange={handleChange} />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 5: Content */}
        <TabsContent value="content" className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="short_description">Deskripsi Singkat</Label>
            <Textarea id="short_description" name="short_description" value={formData.short_description} onChange={handleChange} rows={3} placeholder="Sinopsis singkat buku..." />
          </div>

          <div className="space-y-2">
            <Label>Deskripsi Lengkap</Label>
            <div className="border rounded-lg overflow-hidden [&_.ql-container]:min-h-[200px] [&_.ql-editor]:min-h-[200px]">
              <ReactQuill
                theme="snow"
                value={formData.long_description}
                onChange={(value: string) => setFormData((prev) => ({ ...prev, long_description: value }))}
                modules={QUILL_MODULES}
                placeholder="Tulis deskripsi lengkap buku..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="editor_note">Catatan Editor / Pengantar Redaksi</Label>
            <Textarea id="editor_note" name="editor_note" value={formData.editor_note} onChange={handleChange} rows={4} placeholder="Catatan dari editor..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional_info">Informasi Tambahan</Label>
            <Textarea id="additional_info" name="additional_info" value={formData.additional_info} onChange={handleChange} rows={3} placeholder="Info tambahan lainnya..." />
          </div>
        </TabsContent>

        {/* Tab 6: SEO & Flags */}
        <TabsContent value="seo" className="mt-6 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Label & Flags</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="is_featured" checked={formData.is_featured} onCheckedChange={(c) => handleCheckedChange("is_featured", !!c)} />
                  <Label htmlFor="is_featured">Featured Book</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="is_bestseller" checked={formData.is_bestseller} onCheckedChange={(c) => handleCheckedChange("is_bestseller", !!c)} />
                  <Label htmlFor="is_bestseller">Bestseller</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="is_editor_choice" checked={formData.is_editor_choice} onCheckedChange={(c) => handleCheckedChange("is_editor_choice", !!c)} />
                  <Label htmlFor="is_editor_choice">Editor Choice</Label>
                </div>
              </div>
              <div className="mt-4 max-w-xs space-y-2">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input id="sort_order" name="sort_order" type="number" min="0" value={formData.sort_order} onChange={handleChange} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">SEO Metadata</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input id="meta_title" name="meta_title" value={formData.meta_title} onChange={handleChange} placeholder="Judul untuk mesin pencari" />
                <p className="text-xs text-gray-400">{formData.meta_title.length}/60 karakter</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea id="meta_description" name="meta_description" value={formData.meta_description} onChange={handleChange} rows={2} placeholder="Deskripsi untuk mesin pencari" />
                <p className="text-xs text-gray-400">{formData.meta_description.length}/160 karakter</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta_keywords">Meta Keywords</Label>
                <Input id="meta_keywords" name="meta_keywords" value={formData.meta_keywords} onChange={handleChange} placeholder="buku, novel, fiksi, ..." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
        <Link href="/admin/books" className={buttonVariants({ variant: "outline" })}>Batal</Link>
        <Button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Simpan Buku"}
        </Button>
      </div>
    </form>
  );
}
