"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Book } from "@/types/book";
import { formatRupiah } from "@/lib/utils";

export interface CartItemType {
  book: Book;
  quantity: number;
}

export interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { book, quantity } = item;

  const bookSlug = `/bookstore/${book.id}`;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 py-8 border-b border-gray-200">
      
      {/* Remove Button */}
      <button 
        onClick={() => onRemove(book.id)}
        className="text-gray-400 hover:text-black transition-colors"
        aria-label={`Hapus ${book.title}`}
      >
        <X className="w-4 h-4" />
      </button>

      {/* Cover */}
      <Link href={bookSlug} className="shrink-0 w-24 h-24 bg-[#EBEBEB] flex items-center justify-center p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={book.coverUrl || "https://placehold.co/80x80"} 
          alt={book.title} 
          className="object-contain w-full h-full"
        />
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-1">
        <Link href={bookSlug} className="font-sans font-medium text-[#171512] hover:text-[#084c3c] transition-colors leading-snug">
          {book.title}
        </Link>
        <div className="text-gray-400 text-xs mt-1">
          {book.author} / {book.category}
        </div>
      </div>

      {/* Price */}
      <div className="w-24 text-sm font-semibold text-[#171512]">
        {formatRupiah(book.price)}
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-4 bg-transparent border border-transparent hover:border-gray-200 transition-colors px-2 py-1 rounded-full">
        <button 
          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black"
          onClick={() => onUpdateQuantity(book.id, Math.max(1, quantity - 1))}
        >
          -
        </button>
        <span className="w-4 text-center text-sm font-semibold">{quantity}</span>
        <button 
          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black"
          onClick={() => onUpdateQuantity(book.id, Math.min(book.stock, quantity + 1))}
        >
          +
        </button>
      </div>

      {/* Total */}
      <div className="w-24 text-right text-sm font-bold text-[#171512]">
        {formatRupiah(book.price * quantity)}
      </div>

    </div>
  );
}
