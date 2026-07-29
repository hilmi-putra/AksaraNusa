"use client";

import React, { useState } from "react";
import { StoreHeroSection } from "@/features/store/home/StoreHeroSection";
import { CTASection } from "@/features/landing/CTASection";
import { Container } from "@/components/atoms/Container";
import { Filter, ChevronDown, LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LazyBookList } from "@/features/store/home/LazyBookList";

export default function StoreHomePage() {
  const [totalBooks, setTotalBooks] = useState(0);

  return (
    <div className="flex flex-col bg-[#FAF8F4] min-h-screen">
      <StoreHeroSection />
      
      <section className="py-12 md:py-24">
        <Container>
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" className="rounded-full bg-[#F0EBE1] border-[#E8E3D9] text-[#171512] hover:bg-[#E8E3D9] flex items-center gap-2 px-6">
                Semua Filter <Filter className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="rounded-full bg-[#F0EBE1] border-[#E8E3D9] text-[#171512] hover:bg-[#E8E3D9] flex items-center gap-2 px-6">
                Penulis <ChevronDown className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="rounded-full bg-[#F0EBE1] border-[#E8E3D9] text-[#171512] hover:bg-[#E8E3D9] flex items-center gap-2 px-6">
                Usia Baca <ChevronDown className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-6 text-[#171512]">
              <span className="text-sm font-medium">
                {totalBooks > 0 ? `${totalBooks} Produk` : 'Memuat...'}
              </span>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-[#E8E3D9] rounded-md transition-colors">
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-[#E8E3D9] rounded-md transition-colors opacity-50">
                  <LayoutList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Lazy Loaded Book List */}
          <LazyBookList onBooksLoaded={(count) => setTotalBooks(count)} />
          
        </Container>
      </section>

      <CTASection />
    </div>
  );
}
