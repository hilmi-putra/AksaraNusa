"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Typography } from "@/components/atoms/Typography";
import { Star, BookOpen, PenTool, TrendingUp, Award } from "lucide-react";

// Aksara Nusa Brand Colors for Cards
const colors = {
  yellow: "#F7F09E",
  blue: "#97AAFA",
  pink: "#FA79B7",
  white: "#FFFFFF",
  green: "#A8E6CF",
  orange: "#FFD3B6",
  purple: "#CBAACB",
  peach: "#FFBE7B",
};

// Variety of Card Components with INLINE WIDTH to guarantee layout
const QuoteCard = ({ quote, author, role, bg, text, width = 380 }: any) => (
  <div className="h-[240px] shrink-0 rounded-[20px] p-8 flex flex-col justify-between" style={{ width, backgroundColor: bg, color: text }}>
    <p className="font-serif text-[18px] leading-relaxed font-medium mb-4">"{quote}"</p>
    <div className="flex items-center justify-between opacity-80 mt-auto">
      <div>
        <div className="font-bold text-[14px]">{author}</div>
        <div className="text-[12px]">{role}</div>
      </div>
    </div>
  </div>
);

const StatCard = ({ stat, label, bg, text, width = 280 }: any) => (
  <div className="h-[240px] shrink-0 rounded-[20px] p-8 flex flex-col justify-center items-center text-center" style={{ width, backgroundColor: bg, color: text }}>
    <h3 className="font-serif text-[56px] font-bold leading-none mb-3 tracking-tight">{stat}</h3>
    <p className="text-[13px] font-bold tracking-widest uppercase opacity-80">{label}</p>
  </div>
);

const RatingCard = ({ quote, author, bg, text, width = 340 }: any) => (
  <div className="h-[240px] shrink-0 rounded-[20px] p-8 flex flex-col justify-between" style={{ width, backgroundColor: bg, color: text }}>
    <p className="font-medium text-[16px] leading-relaxed mb-4">"{quote}"</p>
    <div className="flex flex-col gap-3 mt-auto">
      <div className="flex gap-1">
        {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
      </div>
      <div>
        <div className="font-bold text-[13px]">{author}</div>
      </div>
    </div>
  </div>
);

const BookShowcaseCard = ({ bookTitle, review, bg, text, coverColor, coverUrl, width = 460 }: any) => (
  <div className="h-[240px] shrink-0 rounded-[20px] p-6 flex items-center gap-8" style={{ width, backgroundColor: bg, color: text }}>
    <div className="w-[130px] h-[190px] rounded-md shrink-0 shadow-[0_10px_20px_rgba(0,0,0,0.2)] flex items-center justify-center relative overflow-hidden bg-white">
      {coverUrl ? (
        <img src={coverUrl} alt={bookTitle} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center p-4 text-center" style={{ backgroundColor: coverColor }}>
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-black/20" />
          <span className="font-serif font-bold text-[14px] leading-tight text-white relative z-10">{bookTitle}</span>
        </div>
      )}
    </div>
    <div className="flex-1 flex flex-col justify-center">
      <div className="flex gap-1 mb-4">
        {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
      </div>
      <p className="font-medium text-[15px] leading-relaxed">"{review}"</p>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, bg, text, width = 320 }: any) => (
  <div className="h-[240px] shrink-0 rounded-[20px] p-8 flex flex-col" style={{ width, backgroundColor: bg, color: text }}>
    <Icon className="w-8 h-8 mb-auto" />
    <h4 className="font-bold text-[22px] leading-tight mb-3">{title}</h4>
    <p className="text-[14px] opacity-80 leading-relaxed">{desc}</p>
  </div>
);

// Marquee Row Component
const MarqueeRow = ({ children, reverse = false, speed = 50 }: any) => {
  return (
    <div className="flex w-full overflow-hidden group">
      <motion.div
        className="flex gap-4 min-w-max pr-4"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
        style={{ width: "max-content" }}
      >
        <div className="flex gap-4 items-center hover:[animation-play-state:paused]">
          {children}
        </div>
        <div className="flex gap-4 items-center hover:[animation-play-state:paused]">
          {children}
        </div>
      </motion.div>
    </div>
  );
};


export function TestimonialSection() {
  const row1 = (
    <>
      <QuoteCard quote="Aksara Nusa mengubah cara saya memandang penerbitan. Sangat transparan dan super cepat." author="Ahmad Rizky" role="Penulis Novel" bg={colors.white} text="#171512" width={380} />
      <StatCard stat="1200+" label="Buku Diterbitkan" bg={colors.pink} text="#171512" width={280} />
      <RatingCard quote="Desain sampulnya memukau! Buku saya tampil dengan estetika yang sangat premium." author="Siti Nurbaya" bg={colors.green} text="#171512" width={340} />
      <BookShowcaseCard bookTitle="Jejak Langkah" review="Distribusi ke toko buku nasional berjalan luar biasa mulus tanpa kendala." bg={colors.orange} text="#171512" coverUrl="https://megapress.co.id/wp-content/uploads/2024/04/cover-1.png" width={460} />
      <FeatureCard icon={Award} title="Penjualan Terbaik" desc="Karya cetakan kedua berhasil dicapai hanya dalam waktu 1 bulan rilis." bg={colors.yellow} text="#171512" width={320} />
      <QuoteCard quote="Sistem royalti bulanan dengan transparansi data yang paling jelas." author="Budi Santoso" role="Penulis Biografi" bg={colors.blue} text="#171512" width={340} />
    </>
  );

  const row2 = (
    <>
      <StatCard stat="500+" label="Penulis Aktif" bg={colors.purple} text="#171512" width={280} />
      <QuoteCard quote="Tim editor yang tajam. Naskah saya berkembang drastis berkat diskusi intens dengan redaksi." author="Ibu Fatma" role="Penulis Buku Masakan" bg={colors.peach} text="#171512" width={420} />
      <FeatureCard icon={TrendingUp} title="Distribusi Luas" desc="Karya Anda akan dipajang dan ditemukan di seluruh pelosok Indonesia." bg={colors.white} text="#171512" width={320} />
      <BookShowcaseCard bookTitle="Rahasia Dapur" review="Kualitas cetakan yang sangat tajam dan tidak main-main kualitas kertasnya." bg={colors.pink} text="#171512" coverUrl="https://megapress.co.id/wp-content/uploads/2024/04/cover-5.png" width={480} />
      <RatingCard quote="Sangat suportif bagi penulis pemula yang ingin karya pertamanya rilis maksimal." author="Rangga" bg={colors.blue} text="#171512" width={360} />
      <StatCard stat="1M+" label="Eksemplar Terjual" bg={colors.yellow} text="#171512" width={280} />
    </>
  );

  return (
    <Section className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <Container className="mb-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <Typography variant="caption" className="text-ink font-bold tracking-widest uppercase mb-6 block text-[11px] opacity-60">
              Kisah & Pencapaian
            </Typography>
            <Typography variant="h2" className="text-ink font-serif text-[42px] lg:text-[56px] leading-[1.05] tracking-tight mb-6">
              Pencapaian Bersama <br className="hidden md:block"/><em className="italic font-light text-gradient-primary">Penulis</em>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-ink/80 text-[16px] md:text-[18px] leading-relaxed font-medium mb-10 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan penulis sukses yang telah menerbitkan karya mereka bersama Aksara Nusa.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-[14px] md:text-[16px] font-bold text-ink"
          >
            <div className="flex items-center gap-3">
              <span className="opacity-80">200+ ulasan penerbitan</span>
              <div className="flex gap-1 text-gradient-primary">
                <Star size={16} fill="currentColor" stroke="none" />
                <Star size={16} fill="currentColor" stroke="none" />
                <Star size={16} fill="currentColor" stroke="none" />
                <Star size={16} fill="currentColor" stroke="none" />
                <Star size={16} fill="currentColor" stroke="none" />
              </div>
              <span className="opacity-90">4.9</span>
            </div>
            
            <div className="hidden md:block w-px h-5 bg-ink/20"></div>
            
            <div className="flex items-center gap-3">
              <span className="opacity-80">Penulis Independen</span>
              <div className="flex gap-1 text-gradient-primary">
                <Star size={16} fill="currentColor" stroke="none" />
                <Star size={16} fill="currentColor" stroke="none" />
                <Star size={16} fill="currentColor" stroke="none" />
                <Star size={16} fill="currentColor" stroke="none" />
                <Star size={16} fill="currentColor" stroke="none" />
              </div>
              <span className="opacity-90">5.0</span>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Infinite Marquee Area */}
      <div className="w-full flex flex-col gap-4">
        {/* Important: we wrap the rows in a div with hover control so the user can pause the marquee by hovering over the rows */}
        <div className="group/marquee w-full flex flex-col gap-4">
           {/* Row 1: Right to Left */}
           <MarqueeRow speed={60}>{row1}</MarqueeRow>
           
           {/* Row 2: Left to Right */}
           <MarqueeRow speed={75} reverse>{row2}</MarqueeRow>
        </div>
      </div>
    </Section>
  );
}
