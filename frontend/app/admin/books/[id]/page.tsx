"use client";

import React, { useEffect, useState, use } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { getAdminBook } from "@/lib/api/books";
import { ApiBook } from "@/types/book";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import { Edit, ArrowLeft, Star, Medal, BookOpen, ImageIcon, Globe } from "lucide-react";
import Link from "next/link";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

export default function BookPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [book, setBook] = useState<ApiBook | null>(null);
  const [loading, setLoading] = useState(true);
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response: any = await getAdminBook(Number(resolvedParams.id));
        setBook(response.data);
        setItems([
          { label: "Manajemen Buku", href: "/admin/books" },
          { label: "Buku", href: "/admin/books" },
          { label: response.data.title },
        ]);
      } catch (error) {
        console.error("Failed to fetch book", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [resolvedParams.id, setItems]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="space-y-4">
          <Skeleton className="h-10 w-48 rounded-lg" />
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      </AdminDashboardLayout>
    );
  }

  if (!book) {
    return (
      <AdminDashboardLayout>
        <div className="text-center py-20">Buku tidak ditemukan</div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/books" className={buttonVariants({ variant: "outline", size: "icon" })}>
              <ArrowLeft className="size-4" />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">{book.title}</h1>
                <Badge variant="outline" className={`capitalize ${
                  book.status === 'published' ? 'bg-emerald-50 text-emerald-700' :
                  book.status === 'draft' ? 'bg-gray-50 text-gray-600' : 'bg-red-50 text-red-600'
                }`}>
                  {book.status}
                </Badge>
              </div>
              {book.subtitle && <p className="text-sm text-gray-500 mt-1">{book.subtitle}</p>}
            </div>
          </div>
          <Link href={`/admin/books/edit/${book.id}`} className={buttonVariants()}>
            <Edit className="size-4 mr-2" /> Edit Buku
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Media & Primary Actions */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col items-center">
              <div className="w-48 h-72 rounded-lg shadow-md overflow-hidden bg-white flex items-center justify-center relative">
                {book.cover_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={book.cover_image} alt={book.title} className="object-cover w-full h-full" />
                ) : (
                  <ImageIcon className="size-10 text-gray-300" />
                )}
                {book.is_bestseller && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white rounded-full p-1.5 shadow-sm">
                    <Medal className="size-4" />
                  </div>
                )}
                {book.is_featured && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full p-1.5 shadow-sm">
                    <Star className="size-4" />
                  </div>
                )}
              </div>
            </div>

            {(() => {
              let gallery: string[] = [];
              if (Array.isArray(book.image_gallery)) {
                gallery = book.image_gallery;
              } else if (typeof book.image_gallery === 'string') {
                try { gallery = JSON.parse(book.image_gallery); } catch (e) {}
              }
              if (!gallery || gallery.length === 0) return null;
              
              return (
                <div className="grid grid-cols-4 gap-2">
                  {gallery.map((img, i) => img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={img} alt={`Gallery ${i}`} className="w-full aspect-[2/3] object-cover rounded-lg border border-gray-100" />
                  ))}
                </div>
              );
            })()}

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Harga Final</p>
                <p className="text-3xl font-bold text-emerald-600">{formatPrice(book.final_price)}</p>
                {(book.discount > 0 || book.promo_price) && (
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-gray-400 line-through">{formatPrice(book.price)}</p>
                    {book.discount > 0 && <Badge variant="secondary" className="text-[10px] bg-red-50 text-red-600 border-red-200">Diskon {book.discount}%</Badge>}
                    {book.promo_price && <Badge variant="secondary" className="text-[10px] bg-amber-50 text-amber-600 border-amber-200">Promo Khusus</Badge>}
                  </div>
                )}
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Stok Tersedia</span>
                <span className={`font-bold ${book.stock > 10 ? 'text-gray-900' : 'text-red-600'}`}>{book.stock} Unit</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Meta Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase">Penulis</p>
                  <p className="font-medium mt-1">{book.author?.name || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Penerbit</p>
                  <p className="font-medium mt-1">{book.publisher?.name || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">ISBN</p>
                  <p className="font-medium mt-1">{book.isbn || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">SKU</p>
                  <p className="font-medium mt-1">{book.sku || '-'}</p>
                </div>
              </div>

              <Separator className="my-5" />

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase mb-2">Kategori</p>
                  <div className="flex flex-wrap gap-2">
                    {book.categories?.map((c) => (
                      <Badge key={c.id} variant="secondary" className="bg-amber-50 text-amber-700">{c.name}</Badge>
                    ))}
                    {(!book.categories || book.categories.length === 0) && <span className="text-sm text-gray-400">-</span>}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase mb-2">Genre</p>
                  <div className="flex flex-wrap gap-2">
                    {book.genres?.map((g) => (
                      <Badge key={g.id} variant="outline" className="text-gray-600">{g.name}</Badge>
                    ))}
                    {(!book.genres || book.genres.length === 0) && <span className="text-sm text-gray-400">-</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="size-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Deskripsi</h3>
              </div>
              
              {book.short_description && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Sinopsis Singkat</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{book.short_description}</p>
                </div>
              )}

              {book.long_description && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Deskripsi Lengkap</p>
                  <div className="text-sm text-gray-600 prose prose-sm max-w-none prose-p:leading-relaxed" dangerouslySetInnerHTML={{ __html: book.long_description }} />
                </div>
              )}

              {book.editor_note && (
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                  <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">Pengantar Redaksi</p>
                  <p className="text-sm text-amber-900 leading-relaxed italic">{book.editor_note}</p>
                </div>
              )}
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Spesifikasi Detail</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                <SpecItem label="Tipe Buku" value={book.book_type} className="capitalize" />
                <SpecItem label="Format Cover" value={book.cover_type} className="capitalize" />
                <SpecItem label="Bahasa" value={book.language} className="uppercase" />
                <SpecItem label="Jumlah Halaman" value={book.page_count ? `${book.page_count} Hal` : null} />
                <SpecItem label="Berat" value={book.weight ? `${book.weight} gr` : null} />
                <SpecItem label="Dimensi" value={book.dimensions} />
                <SpecItem label="Jenis Kertas" value={book.paper_type} />
                <SpecItem label="Edisi" value={book.edition} />
                <SpecItem label="Tanggal Terbit" value={book.published_at ? new Date(book.published_at).toLocaleDateString('id-ID') : null} />
              </div>

              {(() => {
                let specs: Record<string, string> = {};
                if (typeof book.specifications === 'string') {
                  try { specs = JSON.parse(book.specifications); } catch(e) {}
                } else if (book.specifications) {
                  specs = book.specifications as Record<string, string>;
                }
                
                if (Object.keys(specs).length === 0) return null;

                return (
                  <>
                    <Separator className="my-6" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                      {Object.entries(specs).map(([key, value]) => (
                        <SpecItem key={key} label={key} value={value as string} />
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>

            {/* SEO */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="size-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">SEO Metadata</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase">Meta Title</p>
                  <p className="text-sm font-medium mt-1">{book.meta_title || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Meta Description</p>
                  <p className="text-sm mt-1">{book.meta_description || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Meta Keywords</p>
                  <p className="text-sm mt-1">{book.meta_keywords || '-'}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}

function SpecItem({ label, value, className = "" }: { label: string, value: string | null | undefined, className?: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-sm font-medium mt-1 ${className}`}>{value}</p>
    </div>
  );
}
