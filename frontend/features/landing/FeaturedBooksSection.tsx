"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Typography } from "@/components/atoms/Typography";
import { ArrowRight, BookOpen } from "lucide-react";
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
    <Section className="py-24 md:py-32 relative overflow-visible bg-transparent scroll-mt-24">
      <Container className="max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* LEFT: Sticky Header Column */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start"
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-[2px] bg-[#EF7A08]" />
                <span className="text-[#EF7A08] font-bold tracking-[0.2em] text-[10px] uppercase">Koleksi Eksklusif</span>
              </div>
              
              <Typography variant="h2" className="text-[#002D5A] font-serif text-5xl md:text-6xl leading-[1.05] tracking-tight mb-6">
                Karya <em className="italic font-light text-[#EF7A08]">Terbaik,</em> <br />
                Baru Rilis.
              </Typography>
              
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light mb-10 max-w-sm">
                Temukan kurasi mahakarya terbaru dari para penulis berbakat Aksara Nusa. Setiap naskah telah melalui proses penyuntingan ketat dan desain sampul kelas dunia.
              </p>

              <Link 
                href="/bookstore" 
                className="group inline-flex items-center gap-3 bg-[#004A8F] text-white px-8 py-4 rounded-full font-medium text-[14px] shadow-[0_10px_30px_rgba(0,74,143,0.2)] hover:bg-[#002D5A] hover:shadow-[0_15px_40px_rgba(0,45,90,0.3)] transition-all duration-300 hover:-translate-y-1"
              >
                <BookOpen className="w-4 h-4" />
                Jelajahi Semua Koleksi
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: High-End Book Grid */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-20">
              
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <Skeleton className="w-[220px] h-[330px] rounded-r-md bg-slate-200/50 mb-8" />
                    <Skeleton className="h-6 w-3/4 mb-3 bg-slate-200/50" />
                    <Skeleton className="h-4 w-1/2 mb-4 bg-slate-200/50" />
                    <Skeleton className="h-5 w-24 bg-slate-200/50" />
                  </div>
                ))
              ) : (
                featuredBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                    className={`flex flex-col group ${index % 2 !== 0 ? 'sm:mt-16' : ''}`} // Staggered masonry effect on desktop
                  >
                    <Link href={`/bookstore/buku/${book.slug || book.id}`} className="flex flex-col items-center cursor-pointer">
                      
                      {/* Physical Book Cover (No borders, just shadow) */}
                      <div className="relative w-full max-w-[240px] aspect-[2/3] mb-8 transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-[1.03]">
                        {/* Ambient glow */}
                        <div className="absolute inset-0 bg-[#004A8F]/10 blur-[30px] rounded-full scale-90 group-hover:bg-[#EF7A08]/20 transition-colors duration-500" />
                        
                        <img
                          src={book.cover_image || "https://placehold.co/400x600/F8FAFC/002D5A?text=Karya+Terbaik"}
                          alt={book.title}
                          className="relative w-full h-full object-cover rounded-r-md shadow-[10px_15px_35px_rgba(0,45,90,0.15)] group-hover:shadow-[15px_25px_45px_rgba(0,45,90,0.25)] border-l-[4px] border-white/60 transition-shadow duration-500"
                        />
                        
                        {/* 3D Spine effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/[0.08] via-transparent to-transparent rounded-r-md pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-r-md pointer-events-none" />
                      </div>

                      {/* Clean Typography Info */}
                      <div className="text-center w-full px-2">
                        <h3 className="font-serif text-[22px] font-bold text-[#002D5A] leading-[1.2] mb-2 group-hover:text-[#EF7A08] transition-colors duration-300 line-clamp-2">
                          {book.title}
                        </h3>
                        
                        <p className="text-slate-400 text-[11px] font-bold tracking-[0.15em] uppercase mb-4">
                          {book.author?.name || 'Penulis Aksara Nusa'}
                        </p>
                        
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-bold text-[18px] text-[#004A8F]">
                            Rp {book.price.toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                      
                    </Link>
                  </motion.div>
                ))
              )}
              
              {!loading && featuredBooks.length === 0 && (
                <div className="col-span-1 sm:col-span-2 py-24 text-center text-slate-400">
                  Belum ada koleksi buku yang tersedia.
                </div>
              )}
              
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
