"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/ui/button";
import { landingData } from "@/lib/mock/landing.mock";
import { LogoMarqueeSection } from "./LogoMarqueeSection";

export function HeroSection() {
  const { title, subtitle, ctaText } = landingData.hero;

  return (
    <Section className="relative pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 bg-[#002D5A] overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* Subtle background pattern for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      
      {/* Gradient glow to anchor the visual */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#004A8F]/40 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10 w-full">
        <div className="flex flex-col items-center justify-center w-full">
          
          {/* CENTER COLUMN: Typography & CTAs */}
          <motion.div 
            className="flex flex-col items-center text-center w-full max-w-4xl mx-auto pt-10 lg:pt-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-[#EF7A08]" />
              <span className="text-[#EF7A08] font-bold tracking-widest text-xs uppercase">Aksara Nusa Mediatama</span>
              <div className="w-8 h-[2px] bg-[#EF7A08]" />
            </div>

            <Typography variant="hero" className="text-white mb-6 tracking-tight leading-[1.05] font-serif text-5xl md:text-6xl lg:text-[72px]">
              Wujudkan Naskahmu Menjadi Buku yang <em className="italic font-light text-gradient-secondary">Menginspirasi</em>
            </Typography>
            
            <Typography variant="description" className="text-blue-100/80 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              Penerbit independen terkemuka yang mendampingi penulis dari draf pertama hingga mejeng di Aksara Nusa Bookstore.
            </Typography>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Button size="lg" className="rounded-xl px-8 h-14 bg-gradient-secondary hover:brightness-110 text-white font-bold text-base border-0 shadow-lg shadow-[#EF7A08]/20 transition-all hover:-translate-y-1">
                {ctaText} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl px-8 h-14 bg-white/5 border-white/20 text-white hover:bg-white hover:text-[#002D5A] font-bold text-base transition-all hover:-translate-y-1 backdrop-blur-sm">
                Jelajahi Bookstore
              </Button>
            </div>

            {/* Quick stats / Trust indicators */}
            <div className="mt-16 flex items-center justify-center gap-8 border-t border-white/10 pt-8 w-full max-w-2xl mx-auto">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">5</p>
                <p className="text-sm text-blue-200/70 mt-1">Penulis Aktif</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl font-bold text-white">5</p>
                <p className="text-sm text-blue-200/70 mt-1">Buku Terbit</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl font-bold text-white">4.9</p>
                <p className="text-sm text-blue-200/70 mt-1">Rating Penulis</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
      
      {/* Logos below hero, styled for dark background */}
      <div className="w-full mt-24 opacity-60 hover:opacity-100 transition-opacity">
        <LogoMarqueeSection />
      </div>
    </Section>
  );
}
