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
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold tracking-widest uppercase text-xs text-[#171512] mb-2">PENGANTAR REDAKSI</h4>
              <div className="leading-relaxed">
                {book.editor_note ? (
                  <p>{book.editor_note}</p>
                ) : (
                  <p className="text-gray-400 italic">Tidak ada pengantar redaksi.</p>
                )}
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold tracking-widest uppercase text-xs text-[#171512] mb-2">DETAIL SPESIFIKASI</h4>
              <div className="leading-relaxed">
                {book.short_description ? (
                  <p>{book.short_description}</p>
                ) : (
                  <p className="text-gray-400 italic">Tidak ada deskripsi singkat.</p>
                )}
              </div>
              <ul className="flex flex-col gap-2 mt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gray-400"></span> 
                  <strong>Format:</strong> <span className="capitalize">{book.cover_type || '-'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gray-400"></span> 
                  <strong>Jumlah Halaman:</strong> {book.page_count ? `${book.page_count} Halaman` : '-'}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gray-400"></span> 
                  <strong>Tanggal Terbit:</strong> {book.published_at ? new Date(book.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold tracking-widest uppercase text-xs text-[#171512] mb-2">INFORMASI LAINNYA</h4>
              <p className="leading-relaxed">
                <strong>Penerbit:</strong> {book.publisher?.name || '-'}<br/>
                <strong>ISBN:</strong> {book.isbn || '-'}<br/>
                <strong>Berat:</strong> {book.weight ? `${book.weight} gr` : '-'}
              </p>
              
              <h4 className="font-bold tracking-widest uppercase text-xs text-[#171512] mt-4 mb-2">CATATAN</h4>
              <div className="leading-relaxed">
                {book.additional_info ? (
                  <p>{book.additional_info}</p>
                ) : (
                  <p className="text-gray-400 italic">Tidak ada catatan tambahan.</p>
                )}
              </div>
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
