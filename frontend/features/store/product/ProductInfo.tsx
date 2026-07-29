"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Mail, GitCompare, ChevronLeft, ChevronRight } from "lucide-react";
import { Book } from "@/types/book";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatRupiah } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { toggleWishlist, checkWishlist } from "@/lib/api/store";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { USER_COOKIE } from "@/lib/api";

export interface ProductInfoProps {
  book: any;
  prevSlug?: string;
  nextSlug?: string;
}

export function ProductInfo({ book, prevSlug, nextSlug }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    const check = async () => {
      const userCookie = Cookies.get(USER_COOKIE);
      if (userCookie && book?.id) {
        try {
          const status = await checkWishlist(Number(book.id));
          setIsWishlisted(status);
        } catch (e) {
          console.error(e);
        }
      }
    };
    check();
  }, [book?.id]);

  const handleAddToCart = () => {
    addItem(book, quantity);
    openCart();
  };

  const handleWishlist = async () => {
    // Check if user is logged in
    const userCookie = Cookies.get(USER_COOKIE);
    if (!userCookie) {
      toast.error("Silakan login terlebih dahulu untuk menambahkan ke wishlist");
      return;
    }

    setIsWishlistLoading(true);
    try {
      await toggleWishlist(Number(book.id));
      setIsWishlisted(!isWishlisted);
      toast.success(isWishlisted ? "Buku dihapus dari wishlist" : "Buku ditambahkan ke wishlist!");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menambahkan ke wishlist");
    } finally {
      setIsWishlistLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full font-sans text-sm">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between mb-8 text-gray-500 text-xs tracking-wider uppercase">
         <div className="flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link href="/bookstore" className="hover:text-black transition-colors">Bookstore</Link>
            <span>/</span>
            <Link href="/bookstore/koleksi" className="hover:text-black transition-colors">Koleksi</Link>
            <span>/</span>
            <span className="font-semibold text-black line-clamp-1 max-w-[150px] md:max-w-xs">{book.title}</span>
         </div>
         <div className="hidden md:flex items-center gap-2 shrink-0 ml-4">
            {prevSlug ? (
              <Link href={`/bookstore/buku/${prevSlug}`} className="hover:text-black transition-colors" title="Previous Book">
                <ChevronLeft className="w-4 h-4" />
              </Link>
            ) : (
              <span className="text-gray-300"><ChevronLeft className="w-4 h-4" /></span>
            )}
            {nextSlug ? (
              <Link href={`/bookstore/buku/${nextSlug}`} className="hover:text-black transition-colors" title="Next Book">
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <span className="text-gray-300"><ChevronRight className="w-4 h-4" /></span>
            )}
         </div>
      </div>

      {/* Title & Price */}
      <Typography variant="h1" className="font-sans font-bold text-4xl lg:text-[40px] text-[#171512] mb-4">
        {book.title}
      </Typography>
      
      <div className="flex flex-col gap-1 mb-6">
        {book.originalPrice && (
          <Typography variant="p" className="line-through text-gray-400 text-sm font-medium">
            {formatRupiah(book.originalPrice)}
          </Typography>
        )}
        <Typography variant="h2" className="text-[#EF7A08] text-2xl lg:text-3xl font-bold mb-0">
          {formatRupiah(book.price)}
        </Typography>
      </div>

      {/* Description */}
      <div className="text-gray-500 leading-relaxed mb-8 max-w-2xl text-sm prose prose-sm prose-p:mb-2 prose-p:leading-relaxed"
           dangerouslySetInnerHTML={{ 
             __html: (book as any).long_description 
                     ? (book as any).long_description.substring(0, 400) + ((book as any).long_description.length > 400 ? '...' : '')
                     : 'Tidak ada deskripsi tersedia.'
           }}
      />

      {/* Actions (Qty + Add to Cart) */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center border border-gray-200">
           <button 
             className="w-10 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
             onClick={() => setQuantity(Math.max(1, quantity - 1))}
           >
             -
           </button>
           <input 
             type="number" 
             value={quantity}
             onChange={(e) => setQuantity(Number(e.target.value) || 1)}
             className="w-12 h-12 text-center text-[#171512] bg-transparent focus:outline-none appearance-none font-medium"
             min="1"
             max={book.stock}
           />
           <button 
             className="w-10 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
             onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
           >
             +
           </button>
        </div>

        <Button 
          className="h-12 px-8 bg-[#004A8F] hover:bg-[#002D5A] text-white rounded-none font-semibold tracking-wider text-xs shadow-none"
          onClick={handleAddToCart}
        >
          ADD TO CART
        </Button>
      </div>
      {/* Secondary Actions */}
      <div className="flex items-center gap-6 mb-8 text-xs font-semibold text-gray-600">
         <button className="flex items-center gap-2 hover:text-[#004A8F] transition-colors uppercase tracking-wider">
            <GitCompare className="w-4 h-4" /> Compare
         </button>
         <button 
           onClick={handleWishlist}
           disabled={isWishlistLoading}
           className="flex items-center gap-2 hover:text-[#004A8F] transition-colors uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
         >
            <Heart 
              className={`w-4 h-4 ${isWishlistLoading ? 'animate-pulse' : ''} ${isWishlisted ? 'fill-[#EF7A08] text-[#EF7A08]' : ''}`} 
            /> 
            {isWishlistLoading ? '...' : (isWishlisted ? 'In wishlist' : 'Add to wishlist')}
         </button>
      </div>

      <Separator className="mb-6 bg-gray-100" />

      {/* Meta (Category & Share) */}
      <div className="flex flex-col gap-3 text-xs text-gray-600">
         <div className="flex items-center gap-2">
            <span className="font-semibold text-black">Category:</span> 
            <span className="hover:text-[#084c3c] cursor-pointer transition-colors">{book.category}</span>
         </div>
         <div className="flex items-center gap-3">
            <span className="font-semibold text-black">Share:</span>
            <div className="flex items-center gap-3 text-gray-500 font-medium">
               <button className="hover:text-black transition-colors">FB</button>
               <button className="hover:text-black transition-colors">TW</button>
               <button className="hover:text-black transition-colors">IN</button>
               <button className="hover:text-black transition-colors"><Mail className="w-3.5 h-3.5" /></button>
            </div>
         </div>
      </div>

    </div>
  );
}
