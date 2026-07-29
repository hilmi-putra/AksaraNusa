"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { CTASection } from "@/features/landing/CTASection";
import { CatalogHeader } from "@/features/store/catalog/CatalogHeader";
import { CatalogSidebar } from "@/features/store/catalog/CatalogSidebar";
import { CatalogGrid } from "@/features/store/catalog/CatalogGrid";
import { getPublicBooks, mapApiBookToFrontendBook } from "@/lib/api/books";
import { BookCardSkeleton } from "@/components/molecules/BookCardSkeleton";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";

export default function ProductCatalogPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getPublicBooks();
        if (response.data) {
          setBooks(response.data.map(mapApiBookToFrontendBook));
        }
      } catch (error) {
        console.error("Failed to fetch books", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="flex flex-col bg-transparent min-h-screen">
      <Container className="pt-24 md:pt-32">
        <CatalogHeader 
          title="Semua Koleksi" 
          totalResults={books.length} 
          onFilterToggle={() => setIsMobileFilterOpen(true)}
        />
        
        <div className="flex flex-col md:flex-row gap-8 pb-20">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 shrink-0">
            <CatalogSidebar />
          </div>

          {/* Main Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <BookCardSkeleton key={i} variant="grid" />
                ))}
              </div>
            ) : books.length > 0 ? (
              <CatalogGrid books={books} />
            ) : (
              <div className="text-center py-20 text-gray-500">
                Tidak ada buku yang ditemukan.
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Mobile Filter Sheet */}
      <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 border-r-0">
          <div className="h-full overflow-y-auto p-6">
            <CatalogSidebar />
          </div>
        </SheetContent>
      </Sheet>

      <CTASection />
    </div>
  );
}
