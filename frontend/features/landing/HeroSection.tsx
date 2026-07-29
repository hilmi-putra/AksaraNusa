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
    <Section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 min-h-[90vh] flex items-center bg-transparent">

      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-brand/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />



      <Container className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary-brand/20 text-primary-brand mb-8 shadow-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary-brand animate-pulse" />
          <Typography variant="caption" className="font-medium text-primary-brand m-0 leading-none">
            Penerbit Independen Terpercaya
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* Using dangerouslySetInnerHTML to render the italic parts if they were in the mock, or we can hardcode the styling to match the reference */}
          <Typography variant="hero" className="text-ink mb-6 max-w-3xl mx-auto">
            Wujudkan Naskahmu Menjadi Buku yang <em className="italic font-light text-primary-brand">Menginspirasi</em>
          </Typography>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography variant="description" className="mx-auto max-w-2xl mb-12 text-ink/70">
            {subtitle}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
        >
          <Button size="lg" className="rounded-full px-8 h-14 w-full sm:w-auto bg-primary-brand hover:bg-primary-brand/90 text-white font-semibold text-base shadow-xl shadow-primary-brand/20 transition-all hover:-translate-y-1">
            {ctaText}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-14 w-full sm:w-auto bg-white/50 backdrop-blur-sm text-ink border-border hover:bg-white text-base font-semibold transition-all hover:-translate-y-1">
            Jelajahi Bookstore
          </Button>
        </motion.div>
      </Container>

      <div className="absolute bottom-0 left-0 w-full z-10">
        <LogoMarqueeSection />
      </div>
    </Section>
  );
}
