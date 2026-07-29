"use client";

import React, { useEffect, useState } from "react";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { getWishlist, toggleWishlist, addToCart } from "@/lib/api/store";
import Link from "next/link";
import { Heart, Package, Trash2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const res = await getWishlist();
      setWishlistItems(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (bookId: number) => {
    const previousItems = [...wishlistItems];
    setWishlistItems(wishlistItems.filter(item => item.book.id !== bookId));

    try {
      await toggleWishlist(bookId);
      toast.success("Item dihapus dari wishlist");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus item");
      setWishlistItems(previousItems);
    }
  };

  const handleAddToCart = async (bookId: number) => {
    try {
      await addToCart(bookId, 1);
      toast.success("Buku ditambahkan ke keranjang");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menambahkan ke keranjang");
    }
  };

  const handleAddAllToCart = async () => {
    try {
      for (const item of wishlistItems) {
        await addToCart(item.book.id, 1);
      }
      toast.success("Semua buku ditambahkan ke keranjang");
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat menambahkan beberapa buku");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-border p-8 flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse flex flex-col items-center">
          <Heart className="w-10 h-10 text-red-200 mb-4 animate-bounce" />
          <p className="text-gray-400 font-medium">Memuat Wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="p-6 md:p-8 border-b border-gray-100">
        <Typography variant="h2" className="text-2xl font-black text-[#171512] uppercase tracking-tighter mb-1">
          Wishlist Saya
        </Typography>
        <p className="text-sm text-gray-500">Lihat dan kelola buku-buku yang Anda simpan.</p>
      </div>

      <div className="p-6 md:p-8">
        {wishlistItems.length > 0 ? (
          <div className="flex flex-col">
            <div className="flex flex-col divide-y divide-gray-200">
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start py-8 first:pt-0 gap-6">
                  {/* Image (Mobile First) */}
                  <div className="w-24 h-36 md:w-32 md:h-44 bg-[#EBEBEB] shrink-0 p-2 flex items-center justify-center overflow-hidden rounded-sm order-1 sm:order-2 self-start sm:self-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.book.cover_url || "https://placehold.co/100x150?text=No+Cover"} alt={item.book.title} className="max-w-full max-h-full object-cover shadow-sm" />
                  </div>

                  {/* Info & Actions */}
                  <div className="flex flex-col gap-4 flex-1 order-2 sm:order-1">
                    <div className="flex flex-col gap-1.5">
                      <Link href={`/bookstore/buku/${item.book.slug}`}>
                        <h4 className="font-bold text-[#171512] text-xl hover:text-gradient-primary transition-colors leading-tight">
                          {item.book.title}
                        </h4>
                      </Link>
                      <p className="font-bold text-gradient-primary text-lg">{formatRupiah(item.book.price)}</p>
                      <p className="text-sm text-gray-500">Penulis: <span className="font-medium text-[#171512]">{item.book.author?.name || 'Tidak diketahui'}</span></p>
                    </div>
                    
                    <Button 
                      onClick={() => handleAddToCart(item.book.id)}
                      variant="outline" 
                      className="w-fit border-[#171512] text-[#171512] hover:bg-[#171512] hover:text-white rounded-none px-8 h-10 text-[10px] font-bold uppercase tracking-widest transition-colors mt-2"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 mr-2" />
                      Add to cart
                    </Button>

                    <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-2">
                      <button onClick={() => handleRemove(item.book.id)} className="flex items-center gap-1 hover:text-red-500 transition-colors">
                        <Trash2 className="w-3 h-3" /> Hapus Item
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-8 border-t border-gray-200 mt-4">
              <div className="flex flex-col gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <span className="text-[#171512]">{wishlistItems.length} Buku tersimpan</span>
              </div>
              <Button 
                onClick={handleAddAllToCart}
                className="bg-[#171512] hover:bg-gradient-primary text-white rounded-none h-14 px-10 font-bold tracking-widest uppercase text-xs transition-colors mt-6 sm:mt-0"
              >
                Masukkan Semua Ke Keranjang
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
            <Heart className="w-16 h-16 text-red-100 mb-4" />
            <p className="text-gray-500 font-medium text-lg mb-2">Wishlist Anda kosong.</p>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">Anda belum menyimpan buku apa pun. Ayo cari buku impian Anda sekarang!</p>
            <Link href="/bookstore">
              <Button className="bg-gradient-primary hover:bg-[#b06f00] text-white rounded-full px-8 h-12 font-bold tracking-widest uppercase text-xs transition-colors">
                Mulai Belanja
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
