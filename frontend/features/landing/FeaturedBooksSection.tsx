"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { ArrowRight } from "lucide-react";
import { getPublicBooks, Book, mapApiBookToFrontendBook } from "@/lib/api/books";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedBooksSection() {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getPublicBooks({ featured: true, limit: 4 });
        if (response.data) {
          setFeaturedBooks(response.data.map(mapApiBookToFrontendBook));
        }
      } catch (error) {
        console.error("Failed to fetch featured books", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  return (
    <Section className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <Container>

        {/* Large Bordered Container (Using fieldset to cut the border on a patterned background) */}
        <fieldset className="relative border border-[#EF7A08]/20 rounded-[12px] px-6 pb-6 md:px-12 md:pb-12 lg:px-16 lg:pb-16 mt-24">

          {/* Header Intersecting the Border */}
          <legend className="ml-0 md:ml-8 px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start"
            >
              <h2 className="text-gradient-secondary font-serif text-[48px] md:text-[68px] leading-[0.95] tracking-[-0.02em] mb-12">
                Koleksi Terkini,<br />
                Karya Terbaik,<br />
                Baru Rilis
              </h2>
              <button className="px-6 py-3 border border-[#EF7A08]/30 rounded-md text-gradient-secondary font-bold text-[14px] hover:bg-gradient-secondary/5 transition-colors">
                Jelajahi Semua Koleksi
              </button>
            </motion.div>
          </legend>

          {/* Grid of 4 Book Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col">
                  <div className="w-full h-[300px] md:h-[380px] flex items-center justify-center p-8 border border-[#EF7A08]/15 rounded-2xl">
                    <Skeleton className="w-[60%] h-[90%] rounded-md bg-gradient-secondary/10" />
                  </div>
                  <div className="pt-6 flex flex-col flex-1">
                    <div>
                      <Skeleton className="h-8 w-3/4 mb-2 bg-gradient-secondary/10" />
                      <Skeleton className="h-4 w-1/2 bg-gradient-secondary/10" />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Skeleton className="h-6 w-24 bg-gradient-secondary/10" />
                      <Skeleton className="h-4 w-16 bg-gradient-secondary/10" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              featuredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="group relative flex flex-col"
                >
                  <Link href={`/bookstore/buku/${book.slug || book.id}`} className="flex flex-col h-full cursor-pointer">
                    {/* Book Image Area (The Card) */}
                    <div className="w-full h-[300px] md:h-[380px] flex items-center justify-center p-8 border border-[#EF7A08]/15 rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1">
                      <img
                        src={book.cover_image || "https://placehold.co/400x600/DAD6C9/171512?text=Cover"}
                        alt={book.title}
                        className="h-full w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Book Info (Outside the card) */}
                    <div className="pt-6 flex flex-col flex-1">
                      <div>
                        <h3 className="font-serif text-[22px] md:text-[24px] font-bold leading-tight mb-2 text-gradient-secondary group-hover:text-gradient-primary transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-[14px] text-[#EF7A08]/70">
                          {book.author?.name || 'Penulis'}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-bold text-[18px] text-gradient-secondary">
                          Rp {book.price.toLocaleString("id-ID")}
                        </span>
                        <div className="flex items-center text-gradient-primary text-[14px] font-bold group-hover:text-gradient-secondary transition-colors">
                          Beli <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
            
            {!loading && featuredBooks.length === 0 && (
              <div className="col-span-1 md:col-span-2 py-12 text-center text-[#EF7A08]/60">
                Belum ada koleksi buku yang tersedia.
              </div>
            )}
          </div>

        </fieldset>

      </Container>
    </Section>
  );
}
