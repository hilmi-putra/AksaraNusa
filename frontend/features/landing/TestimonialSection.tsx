"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Typography } from "@/components/atoms/Typography";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

// Premium Data
const stats = [
  { value: "200+", label: "Ulasan Penerbitan" },
  { value: "4.9", label: "Rating Kepuasan", icon: true },
  { value: "500+", label: "Penulis Aktif" },
  { value: "1M+", label: "Eksemplar Terjual" }
];

const testimonials = [
  {
    quote: "Aksara Nusa mengubah cara saya memandang penerbitan. Sangat transparan dan super cepat.",
    author: "Ahmad Rizky",
    role: "Penulis Novel",
    book: "Jejak Langkah"
  },
  {
    quote: "Desain sampulnya memukau! Buku saya tampil dengan estetika yang sangat premium di rak toko buku.",
    author: "Siti Nurbaya",
    role: "Penulis Fiksi",
    book: "Lembayung Sore"
  },
  {
    quote: "Tim editor yang tajam. Naskah saya berkembang drastis berkat diskusi intens dengan redaksi.",
    author: "Ibu Fatma",
    role: "Penulis Buku Referensi",
    book: "Rahasia Dapur"
  },
  {
    quote: "Sistem royalti bulanan dengan transparansi data yang paling jelas yang pernah saya alami.",
    author: "Budi Santoso",
    role: "Penulis Biografi",
    book: "Sang Pemimpin"
  }
];

const bookReviews = [
  { bookTitle: "Jejak Langkah", review: "Distribusi ke toko buku nasional berjalan luar biasa mulus tanpa kendala.", coverUrl: "https://megapress.co.id/wp-content/uploads/2024/04/cover-1.png" },
  { bookTitle: "Rahasia Dapur", review: "Kualitas cetakan yang sangat tajam dan tidak main-main kualitas kertasnya.", coverUrl: "https://megapress.co.id/wp-content/uploads/2024/04/cover-5.png" },
  { bookTitle: "Lembayung Sore", review: "Buku saya dipajang di etalase depan Aksara Nusa Bookstore. Sangat bangga!", coverUrl: "https://megapress.co.id/wp-content/uploads/2024/04/cover-2.png" },
  { bookTitle: "Sang Pemimpin", review: "Penjualan cetakan kedua berhasil dicapai hanya dalam waktu 1 bulan rilis.", coverUrl: "https://megapress.co.id/wp-content/uploads/2024/04/cover-4.png" }
];

const BookReviewCard = ({ bookTitle, review, coverUrl }: any) => (
  <div className="h-[180px] w-[400px] shrink-0 bg-white rounded-2xl p-5 flex items-center gap-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-lg transition-shadow">
    <div className="w-[100px] h-[140px] rounded shrink-0 shadow-md overflow-hidden bg-slate-100 relative">
      {coverUrl ? (
        <img src={coverUrl} alt={bookTitle} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-[#004A8F] flex items-center justify-center p-2 text-center">
          <span className="text-white text-xs font-serif leading-tight">{bookTitle}</span>
        </div>
      )}
    </div>
    <div className="flex-1 flex flex-col justify-center">
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#EF7A08] text-[#EF7A08]" />)}
      </div>
      <p className="font-medium text-[13px] leading-relaxed text-slate-700">"{review}"</p>
    </div>
  </div>
);

const MarqueeRow = ({ children, reverse = false, speed = 50 }: any) => (
  <div className="flex w-full overflow-hidden group">
    <motion.div
      className="flex gap-6 min-w-max pr-6"
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ ease: "linear", duration: speed, repeat: Infinity }}
      style={{ width: "max-content" }}
    >
      <div className="flex gap-6 items-center hover:[animation-play-state:paused]">{children}</div>
      <div className="flex gap-6 items-center hover:[animation-play-state:paused]">{children}</div>
    </motion.div>
  </div>
);

export function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <Section className="py-20 md:py-32 relative bg-transparent overflow-visible">
      {/* Background Blending Elements */}
      {/* Right orb to balance the bottom */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#004A8F]/5 rounded-full blur-[120px] pointer-events-none translate-y-1/4 translate-x-1/4" />

      <Container className="relative z-10 max-w-[1100px] mb-20">
        {/* Header - Centered for better proportions */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-4 mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#EF7A08]" />
              <span className="text-[#EF7A08] font-bold tracking-[0.2em] text-[10px] uppercase">Kisah & Pencapaian</span>
              <div className="w-8 h-[2px] bg-[#EF7A08]" />
            </div>
            <Typography variant="h2" className="text-[#002D5A] font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-4">
              Tumbuh Bersama <em className="text-[#EF7A08] not-italic">Penulis</em>
            </Typography>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 text-sm md:text-base leading-relaxed font-light max-w-xl"
          >
            Mendengar langsung dari mereka yang telah mempercayakan mahakaryanya kepada Aksara Nusa Mediatama.
          </motion.div>
        </div>

        {/* Stats Grid - 4 Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 md:p-8 flex flex-col justify-center items-center text-center border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-slate-200 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#004A8F] to-[#EF7A08] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-4xl md:text-5xl font-serif font-bold text-[#002D5A] tracking-tight">{stat.value}</span>
                {stat.icon && <Star className="w-5 h-5 md:w-6 md:h-6 fill-[#EF7A08] text-[#EF7A08]" />}
              </div>
              <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-slate-400">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Featured Testimonial Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full bg-[#002D5A] rounded-3xl p-8 md:p-14 relative overflow-hidden flex flex-col justify-between shadow-2xl group"
        >
          <Quote className="absolute -top-10 -right-10 w-64 h-64 text-white/5 rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#001730] to-transparent pointer-events-none" />

          <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col justify-center min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#EF7A08] text-[#EF7A08]" />
                  ))}
                </div>
                <Typography variant="h3" className="text-white font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.5] font-medium mb-10 max-w-3xl">
                  "{testimonials[activeIndex].quote}"
                </Typography>
                
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-white font-serif font-bold text-lg">
                    {testimonials[activeIndex].author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold tracking-wide text-sm md:text-base">{testimonials[activeIndex].author}</div>
                    <div className="text-white/60 text-xs md:text-sm font-light">
                      {testimonials[activeIndex].role} &mdash; <em className="text-white/80">{testimonials[activeIndex].book}</em>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#002D5A] transition-all hover:scale-105 active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center">
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#002D5A] transition-all hover:scale-105 active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Mobile controls */}
          <div className="relative z-10 flex md:hidden items-center justify-center gap-6 mt-8">
            <button 
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#002D5A] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#002D5A] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </Container>

      {/* Book Showcases Marquee */}
      <div className="relative z-10 w-full flex flex-col gap-6 pt-10">
        <MarqueeRow speed={60}>
          {bookReviews.map((book, i) => (
            <BookReviewCard key={i} {...book} />
          ))}
          {/* Duplicate for smooth scroll filling */}
          {bookReviews.map((book, i) => (
            <BookReviewCard key={`dup-${i}`} {...book} />
          ))}
        </MarqueeRow>
      </div>
    </Section>
  );
}
