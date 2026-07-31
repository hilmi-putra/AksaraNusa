"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book } from "@/types/book";

export interface ProductMetadataProps {
  book: any;
}

export function ProductMetadata({ book }: ProductMetadataProps) {
  return (
    <div className="w-full mt-8">
      <Tabs defaultValue="description" className="w-full">
        {/* Centered Tabs with custom active state (short green underline) */}
        <TabsList className="w-full flex justify-center h-auto p-0 bg-transparent border-b border-gray-100 rounded-none gap-8 mb-16">
          <TabsTrigger 
            value="description" 
            className="relative px-2 pb-4 text-xs font-bold tracking-widest uppercase text-gray-500 data-[state=active]:text-[#171512] data-[state=active]:bg-transparent hover:bg-transparent data-[state=active]:shadow-none group"
          >
            Description
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-data-[state=active]:bg-[#084c3c]"></div>
          </TabsTrigger>
          <TabsTrigger 
            value="reviews"
            className="relative px-2 pb-4 text-xs font-bold tracking-widest uppercase text-gray-500 data-[state=active]:text-[#171512] data-[state=active]:bg-transparent hover:bg-transparent data-[state=active]:shadow-none group"
          >
            Reviews (0)
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-data-[state=active]:bg-[#084c3c]"></div>
          </TabsTrigger>
          <TabsTrigger 
            value="shipping"
            className="relative px-2 pb-4 text-xs font-bold tracking-widest uppercase text-gray-500 data-[state=active]:text-[#171512] data-[state=active]:bg-transparent hover:bg-transparent data-[state=active]:shadow-none group"
          >
            Shipping & Delivery
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-data-[state=active]:bg-[#084c3c]"></div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="mt-0 outline-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-gray-600">
            {/* Column 1: Main Description */}
            <div className="flex flex-col gap-4 md:col-span-2 min-w-0 overflow-hidden">
              <h4 className="font-bold tracking-widest uppercase text-xs text-[#171512] mb-2">DESKRIPSI BUKU</h4>
              <div 
                className="leading-relaxed prose prose-sm max-w-none text-gray-600 break-words whitespace-pre-wrap [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#171512] [&_h2]:mt-6 [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4"
                dangerouslySetInnerHTML={{ __html: book.long_description || '<p class="text-gray-400 italic">Tidak ada deskripsi tersedia.</p>' }}
              />
            </div>

            {/* Column 2: Metadata */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold tracking-widest uppercase text-xs text-[#171512] mb-2">DETAIL BUKU</h4>
              <ul className="flex flex-col gap-3">
                <li className="grid grid-cols-2 gap-2">
                  <strong className="font-medium text-gray-900">Format</strong> 
                  <span className="capitalize">{book.cover_type || '-'}</span>
                </li>
                <li className="grid grid-cols-2 gap-2">
                  <strong className="font-medium text-gray-900">Jumlah Halaman</strong> 
                  <span>{book.page_count ? `${book.page_count} Halaman` : '-'}</span>
                </li>
                <li className="grid grid-cols-2 gap-2">
                  <strong className="font-medium text-gray-900">Tanggal Terbit</strong> 
                  <span>{book.published_at ? new Date(book.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</span>
                </li>
                <li className="grid grid-cols-2 gap-2">
                  <strong className="font-medium text-gray-900">Penerbit</strong> 
                  <span>{book.publisher?.name || '-'}</span>
                </li>
                <li className="grid grid-cols-2 gap-2">
                  <strong className="font-medium text-gray-900">ISBN</strong> 
                  <span>{book.isbn || '-'}</span>
                </li>
                <li className="grid grid-cols-2 gap-2">
                  <strong className="font-medium text-gray-900">Berat</strong> 
                  <span>{book.weight ? `${book.weight} gr` : '-'}</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-0 outline-none text-center py-10 text-gray-500">
           Belum ada ulasan untuk buku ini.
        </TabsContent>

        <TabsContent value="shipping" className="mt-0 outline-none text-center py-10 text-gray-500">
           Informasi pengiriman dan pengembalian akan tampil di sini.
        </TabsContent>
      </Tabs>
    </div>
  );
}
