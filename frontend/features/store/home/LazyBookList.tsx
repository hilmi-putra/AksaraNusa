"use client";

import React, { useEffect, useState } from "react";
import { BookCard } from "@/components/molecules/BookCard";
import { BookCardSkeleton } from "@/components/molecules/BookCardSkeleton";
import { getPublicBooks, mapApiBookToFrontendBook } from "@/lib/api/books";
import { useInView } from "@/hooks/useInView";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LazyBookList({ onBooksLoaded }: { onBooksLoaded: (count: number) => void }) {
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, isIntersecting } = useInView({ rootMargin: "200px" });

  useEffect(() => {
    if (!isIntersecting) return;
    
    // Only fetch once when intersecting
    if (!loading && allBooks.length > 0) return;

    const fetchBooks = async () => {
      try {
        const response = await getPublicBooks();
        if (response.data) {
          const books = response.data.map(mapApiBookToFrontendBook);
          setAllBooks(books);
          onBooksLoaded(books.length);
        }
      } catch (error) {
        console.error("Failed to fetch books", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [isIntersecting]);

  if (loading || allBooks.length === 0) {
    return (
      <div ref={ref} className="flex flex-col gap-24">
        <section>
          <BookCardSkeleton variant="featured" />
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex justify-center">
              <div className="w-full max-w-sm">
                <BookCardSkeleton variant="grid" />
              </div>
            </div>
          ))}
        </section>
        <section className="pt-12 border-t border-[#E8E3D9]">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#171512]">Top selling book</h2>
            <Button variant="ghost" className="text-[#171512] hover:bg-[#F0EBE1] hover:text-[#DB8B00] rounded-full" disabled>
              View all <ChevronDown className="w-4 h-4 ml-2 -rotate-90" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {Array.from({ length: 8 }).map((_, i) => (
              <BookCardSkeleton key={i} variant="grid" />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-24">
      {/* 1. Featured Book Section */}
      <section>
        {allBooks[0] && (
          <BookCard book={allBooks[0]} variant="featured" />
        )}
      </section>

      {/* 2. Two Books Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {allBooks.slice(1, 3).map((book) => (
          <div key={book.id} className="flex justify-center">
            <div className="w-full max-w-sm">
              <BookCard book={book} variant="grid" />
            </div>
          </div>
        ))}
      </section>

      {/* 3. Top Selling Books Section */}
      <section className="pt-12 border-t border-[#E8E3D9]">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-serif text-3xl font-bold text-[#171512]">Top selling book</h2>
          <Link href="/bookstore/koleksi">
            <Button variant="ghost" className="text-[#171512] hover:bg-[#F0EBE1] hover:text-[#DB8B00] rounded-full">
              View all <ChevronDown className="w-4 h-4 ml-2 -rotate-90" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
          {allBooks.slice(3, 11).map((book) => (
            <BookCard key={book.id} book={book} variant="grid" />
          ))}
        </div>
      </section>
    </div>
  );
}
