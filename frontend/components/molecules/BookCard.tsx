"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Book } from "@/types/book";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Trash2 } from "lucide-react";
import { Typography } from "@/components/atoms/Typography";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AddToCartModal } from "@/components/organisms/AddToCartModal";
import { useCartStore } from "@/stores/cartStore";

export interface BookCardProps {
  book: Book;
  variant?: 
    | "grid" 
    | "list" 
    | "featured" 
    | "bestseller" 
    | "related" 
    | "wishlist" 
    | "cart-preview" 
    | "search-result" 
    | "recommendation" 
    | "author-books";
  rank?: number; // for bestseller
  recommendationReason?: string;
  onAddToCart?: (book: Book) => void;
  onRemove?: (id: string) => void;
}

export function BookCard({
  book,
  variant = "grid",
  rank,
  recommendationReason,
  onAddToCart,
  onRemove,
}: BookCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const coverRef = useRef<HTMLImageElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { addItem, openCart } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const isOutOfStock = book.stock === 0;
  const bookSlug = `/bookstore/buku/${book.slug || book.id}`;

  // GSAP Hover Animations
  useGSAP(() => {
    if (variant === "grid" || variant === "related" || variant === "author-books") {
      const card = cardRef.current;
      const cover = coverRef.current;
      const blob = blobRef.current;

      if (!card || !cover || !blob) return;

      const enterAnimation = () => {
        gsap.to(card, { scale: 1.03, duration: 0.4, ease: "power2.out" });
        gsap.to(cover, { 
          y: -12, 
          rotationZ: 2, 
          scale: 1.05, 
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", 
          duration: 0.4, 
          ease: "power2.out" 
        });
        gsap.to(blob, { scale: 1.15, rotationZ: -10, duration: 0.6, ease: "power2.out" });
      };

      const leaveAnimation = () => {
        gsap.to(card, { scale: 1, duration: 0.5, ease: "power2.out" });
        gsap.to(cover, { 
          y: 0, 
          rotationZ: 0, 
          scale: 1, 
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", 
          duration: 0.5, 
          ease: "power2.out" 
        });
        gsap.to(blob, { scale: 1, rotationZ: 0, duration: 0.5, ease: "power2.out" });
      };

      card.addEventListener("mouseenter", enterAnimation);
      card.addEventListener("mouseleave", leaveAnimation);

      return () => {
        card.removeEventListener("mouseenter", enterAnimation);
        card.removeEventListener("mouseleave", leaveAnimation);
      };
    }
  }, { scope: cardRef, dependencies: [variant] });

  // Helper renderers for common parts
  const renderCover = (className?: string) => (
    <div className={cn("relative overflow-hidden rounded-xl bg-[#F0EBE1] aspect-square flex items-center justify-center p-6 transition-all duration-300 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={book.coverUrl || "https://placehold.co/400x600/DAD6C9/171512?text=Cover"}
        alt={book.title}
        className="object-contain w-auto h-full max-h-[90%] transition-transform duration-500 group-hover:scale-105 shadow-md group-hover:shadow-xl"
        loading="lazy"
      />
      {book.isNew && variant !== "cart-preview" && (
        <Badge className="absolute top-4 left-4 bg-[#DB8B00] text-white border-none rounded-full px-3 text-xs">Baru</Badge>
      )}
      {book.isBestseller && variant !== "cart-preview" && !book.isNew && (
        <Badge variant="secondary" className="absolute top-4 left-4 bg-[#171512] text-[#FAF8F4] border-none rounded-full px-3 text-xs">Bestseller</Badge>
      )}
    </div>
  );

  const renderTitle = (className?: string) => (
    <Link href={bookSlug} className={cn("hover:opacity-70 transition-opacity text-[#171512]", className)}>
      {book.title}
    </Link>
  );

  const renderPrice = (className?: string) => (
    <div className={cn("flex flex-col", className)}>
      <span className="font-semibold text-ink">{formatPrice(book.price)}</span>
      {book.originalPrice && (
        <span className="text-xs text-muted-foreground line-through">
          {formatPrice(book.originalPrice)}
        </span>
      )}
    </div>
  );

  // Variant implementations
  let cardContent = null;
  switch (variant) {
    case "grid":
    case "related":
    case "author-books": {
      // User requested specific color for background
      const blobColor = "text-[#9B5C00]";

      cardContent = (
        <div className="w-full">
        <Link 
          ref={cardRef}
          href={bookSlug}
          className="group flex flex-col items-center bg-transparent cursor-pointer w-full"
        >
          {/* Top Section: Cover + Blob */}
          <div className="relative w-full aspect-square sm:aspect-[4/5] flex items-center justify-center mb-8">
            
            {/* Abstract Decorative Blob (SVG) */}
            <div 
              ref={blobRef}
              className={cn("absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none opacity-90 z-0", blobColor)}
            >
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[110%] h-[110%] fill-current drop-shadow-sm">
                <path d="M47.5,-73.4C61.3,-66.2,71.7,-52.1,79.5,-36.8C87.3,-21.5,92.5,-4.9,90.2,10.6C87.8,26.1,77.9,40.4,66,51.8C54.1,63.1,40.2,71.5,25.3,77.1C10.4,82.8,-5.5,85.6,-20.9,82.8C-36.2,80.1,-50.9,71.8,-63.4,60C-75.9,48.1,-86.2,32.6,-89.4,15.6C-92.6,-1.5,-88.7,-20.1,-79,-35.1C-69.3,-50.1,-53.8,-61.5,-38.7,-68.2C-23.7,-74.9,-9.1,-76.9,6.5,-81C22,-85.1,44,-91.3,47.5,-73.4Z" transform="translate(100 100)" />
              </svg>
            </div>
            
            {/* The Book Cover */}
            <div className="relative z-10 w-[60%] sm:w-[65%] aspect-[2/3] flex items-center justify-center">
              <img
                ref={coverRef}
                src={book.coverUrl || "https://placehold.co/400x600/DAD6C9/171512?text=Cover"}
                alt={book.title}
                className="object-cover w-full h-full shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-shadow rounded-sm"
                loading="lazy"
                style={{ transformOrigin: "bottom center" }}
              />
              {/* Badges positioned relative to the cover */}
              {book.isNew && (
                <Badge className="absolute -top-3 -left-3 bg-[#DB8B00] text-white border-none rounded-full px-3 py-1 text-[10px] shadow-sm uppercase tracking-widest z-20">Baru</Badge>
              )}
              {book.isBestseller && !book.isNew && (
                <Badge className="absolute -top-3 -left-3 bg-[#171512] text-white border-none rounded-full px-3 py-1 text-[10px] shadow-sm uppercase tracking-widest z-20">Top</Badge>
              )}
            </div>
          </div>

          {/* Bottom Section: Info */}
          <div className="w-full flex flex-col items-center text-center px-4 relative z-20">
            <Typography variant="caption" className="text-[#322855] opacity-80 font-bold tracking-[0.2em] uppercase text-[10px] sm:text-[11px] mb-2 line-clamp-1">
              {book.author}
            </Typography>
            <Typography as="h3" className="font-serif text-xl sm:text-[24px] font-normal leading-[1.1] text-[#322855] line-clamp-2 mb-3 px-2">
              {book.title}
            </Typography>
            
            <div className="flex flex-col items-center gap-4 w-full mt-1">
              <span className="font-semibold text-[#322855] text-lg sm:text-xl">{formatPrice(book.price)}</span>
              
              <Button 
                size="sm" 
                className="rounded-none bg-[#171512] text-white hover:bg-[#DB8B00] h-10 px-8 text-xs font-bold uppercase tracking-widest transition-all duration-300 w-full mt-4"
                disabled={isOutOfStock}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
              >
                {isOutOfStock ? "Habis" : "Beli Sekarang"}
              </Button>
            </div>
          </div>
        </Link>
        </div>
      );
      break;
    }

    case "list":
    case "search-result":
      cardContent = (
        <div className="flex gap-6 border-b border-[#E8E3D9] py-8 group">
          <Link href={bookSlug} className="shrink-0 w-32 sm:w-48 transition-transform duration-300 group-hover:-translate-y-1">
            {renderCover("aspect-[3/4] p-4")}
          </Link>
          <div className="flex flex-col flex-1 justify-center">
            <div>
              <Typography variant="caption" className="text-gray-500 font-medium tracking-wide uppercase text-[11px] mb-2 block">{book.author}</Typography>
              <Typography as="h3" className="font-serif text-2xl sm:text-3xl line-clamp-2 mt-1 mb-3">
                {renderTitle()}
              </Typography>
              <Typography variant="p" className="line-clamp-2 sm:line-clamp-3 text-gray-600">
                Sinopsis singkat buku ini akan ditampilkan di sini sebagai preview konten.
              </Typography>
            </div>
            <div className="mt-6 flex items-center justify-between">
              {renderPrice("text-lg")}
              <Button 
                size="sm"
                className="rounded-full bg-[#171512] text-white px-6"
                disabled={isOutOfStock}
                onClick={() => setIsModalOpen(true)}
              >
                {isOutOfStock ? "Habis" : "Tambah"}
              </Button>
            </div>
          </div>
        </div>
      );
      break;

    case "featured": {
      // User requested specific color for background
      const blobColor = "text-[#9B5C00]";

      cardContent = (
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center bg-transparent py-8 md:py-16">
          <div className="w-full md:w-1/2 shrink-0 group relative flex justify-center">
             {/* Abstract Decorative Blob (SVG) for Featured */}
             <div className={cn("absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] flex items-center justify-center pointer-events-none opacity-90 z-0", blobColor)}>
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current drop-shadow-sm">
                <path d="M47.5,-73.4C61.3,-66.2,71.7,-52.1,79.5,-36.8C87.3,-21.5,92.5,-4.9,90.2,10.6C87.8,26.1,77.9,40.4,66,51.8C54.1,63.1,40.2,71.5,25.3,77.1C10.4,82.8,-5.5,85.6,-20.9,82.8C-36.2,80.1,-50.9,71.8,-63.4,60C-75.9,48.1,-86.2,32.6,-89.4,15.6C-92.6,-1.5,-88.7,-20.1,-79,-35.1C-69.3,-50.1,-53.8,-61.5,-38.7,-68.2C-23.7,-74.9,-9.1,-76.9,6.5,-81C22,-85.1,44,-91.3,47.5,-73.4Z" transform="translate(100 100)" />
              </svg>
            </div>
             <Link href={bookSlug} className="block transition-transform duration-500 group-hover:-translate-y-2 relative z-10 w-[70%] max-w-sm">
              <div className="relative aspect-[2/3] flex items-center justify-center">
                <img src={book.coverUrl || "https://placehold.co/400x600/DAD6C9/171512?text=Cover"} alt={book.title} className="object-cover w-full h-full shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-500 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] rounded-md" loading="lazy" />
              </div>
            </Link>
          </div>
          <div className="flex flex-col flex-1 text-center md:text-left z-10">
            <Typography variant="caption" className="text-[#322855] opacity-80 font-bold tracking-[0.3em] uppercase text-xs mb-4">
              Pilihan Editor
            </Typography>
            <Typography as="h2" className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 text-[#322855] font-normal">
              {renderTitle()}
            </Typography>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 mb-8 text-sm">
              <div>
                <p className="text-[#322855] opacity-80 mb-1">Author</p>
                <p className="font-semibold text-[#322855]">{book.author}</p>
              </div>
              <div>
                <p className="text-[#322855] opacity-80 mb-1">Type</p>
                <p className="font-semibold text-[#322855]">{book.category}</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-6 mt-4">
               {renderPrice("text-3xl md:text-4xl text-[#322855] font-semibold")}
               <div className="flex flex-col gap-3 w-full md:w-auto">
                 <Button size="lg" className="rounded-none bg-[#DB8B00] hover:bg-[#E0790A] text-white px-8 h-12 text-sm font-bold uppercase tracking-widest shadow-lg transition-transform w-full" disabled={isOutOfStock} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsModalOpen(true); }}>
                   {isOutOfStock ? "Habis" : "Beli Sekarang"}
                 </Button>
                 <Button variant="outline" size="lg" className="rounded-none border-[#171512] text-[#171512] hover:bg-[#171512] hover:text-white px-8 h-12 text-sm font-bold uppercase tracking-widest w-full" disabled={isOutOfStock} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsModalOpen(true); }}>
                   Add to Cart
                 </Button>
               </div>
            </div>
          </div>
        </div>
      );
      break;
    }

    case "bestseller":
      cardContent = (
        <div className="group flex flex-col gap-4 text-center cursor-pointer relative pt-6">
          {rank && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#DB8B00] text-white flex items-center justify-center font-bold z-10 shadow-lg border-4 border-[#FAF8F4]">
              {rank}
            </div>
          )}
          <Link href={bookSlug} className="block transition-transform duration-300 group-hover:-translate-y-2">
            {renderCover()}
          </Link>
          <div className="flex flex-col gap-1 items-center px-2 mt-2">
            <Typography as="h3" className="font-serif text-lg leading-tight line-clamp-1">
              {renderTitle()}
            </Typography>
            <Typography variant="caption" className="text-gray-500 uppercase text-[11px] font-medium tracking-wide mt-1">{book.author}</Typography>
          </div>
        </div>
      );
      break;

    case "wishlist":
      cardContent = (
        <div className="group flex gap-6 bg-white p-6 rounded-2xl border border-[#E8E3D9] shadow-sm hover:shadow-md transition-shadow">
          <Link href={bookSlug} className="shrink-0 w-24 sm:w-32 rounded-lg overflow-hidden">
            {renderCover("p-2")}
          </Link>
          <div className="flex flex-col flex-1 justify-between py-2">
            <div>
              <Typography as="h3" className="font-serif text-xl sm:text-2xl line-clamp-2 mb-2">
                {renderTitle()}
              </Typography>
              <Typography variant="caption" className="text-gray-500 uppercase text-[11px] font-medium tracking-wide">{book.author}</Typography>
            </div>
            <div className="flex items-center justify-between mt-4">
              {renderPrice()}
              <div className="flex gap-3">
                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => onRemove?.(book.id)}>
                  <Trash2 className="h-5 w-5" />
                </Button>
                <Button size="sm" className="rounded-full bg-[#171512] text-white px-6" disabled={isOutOfStock} onClick={() => setIsModalOpen(true)}>
                  Beli
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
      break;

    case "cart-preview":
      cardContent = (
        <div className="flex gap-4 py-4 border-b border-[#E8E3D9] last:border-0">
          <Link href={bookSlug} className="shrink-0 w-20 h-28 rounded-md overflow-hidden bg-[#F0EBE1] flex items-center justify-center p-2">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={book.coverUrl || "https://placehold.co/100x150"} alt={book.title} className="object-contain h-full shadow-sm" />
          </Link>
          <div className="flex flex-col flex-1 justify-between">
            <div className="flex justify-between items-start gap-3">
              <Typography as="h4" className="font-serif text-lg leading-tight line-clamp-2">
                {renderTitle()}
              </Typography>
              <button onClick={() => onRemove?.(book.id)} className="text-gray-400 hover:text-red-500 shrink-0 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-between items-end mt-2">
              <span className="text-sm font-semibold">{formatPrice(book.price)}</span>
            </div>
          </div>
        </div>
      );
      break;

    case "recommendation":
      cardContent = (
        <div className="group flex flex-col gap-4 bg-transparent p-4 rounded-2xl border border-[#E8E3D9] hover:bg-white transition-colors">
           {recommendationReason && (
            <Badge variant="outline" className="w-fit text-[10px] uppercase tracking-wider mb-2 border-[#DB8B00] text-[#DB8B00] rounded-full">{recommendationReason}</Badge>
           )}
          <div className="flex gap-4 items-center">
            <Link href={bookSlug} className="shrink-0 w-20 rounded-lg overflow-hidden transition-transform group-hover:scale-105">
              {renderCover("p-2 aspect-[3/4]")}
            </Link>
            <div className="flex flex-col py-1">
              <Typography as="h3" className="font-serif text-lg leading-tight line-clamp-2 mb-1">
                {renderTitle()}
              </Typography>
              <Typography variant="caption" className="text-gray-500 text-[11px] uppercase tracking-wide mb-3 block">{book.author}</Typography>
              {renderPrice("text-sm")}
            </div>
          </div>
        </div>
      );
      break;

    default:
      cardContent = null;
  }

  return (
    <>
      {cardContent}
      <AddToCartModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        book={book} 
        onConfirm={(b, qty) => {
          addItem(b, qty);
          openCart();
          onAddToCart?.(b);
        }} 
      />
    </>
  );
}
