"use client";

import React from "react";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeIn } from "@/components/animations/FadeIn";
import { Mail } from "lucide-react";

export function NewsletterSection() {
  return (
    <Section className="py-20 md:py-32">
      <Container>
        <FadeIn>
          <div className="bg-ink rounded-3xl p-8 md:p-16 text-center text-cream relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 opacity-10 pointer-events-none">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[500px] h-[500px] text-cream fill-current">
                <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.1,-46.3C90.4,-33.5,96.1,-18,95.5,-2.9C94.9,12.2,88,26.9,78.2,39.5C68.4,52.1,55.7,62.6,41.5,70.5C27.3,78.4,11.6,83.7,-3.7,89.5C-19,95.3,-38,101.6,-53.4,95.2C-68.8,88.8,-80.6,69.7,-88.2,50C-95.8,30.3,-99.2,10,-95.9,-8.8C-92.6,-27.6,-82.6,-44.9,-69.4,-58.5C-56.2,-72.1,-39.8,-82,-23.7,-85.7C-7.6,-89.4,8.2,-86.9,23.3,-82.7C38.4,-78.5,52.8,-72.7,44.7,-76.4Z" transform="translate(100 100)" />
              </svg>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-cream/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Mail className="w-8 h-8 text-cream" />
              </div>
              <Typography  variant="h2" className="text-cream mb-4">
                Dapatkan Info Diskon & Buku Baru
              </Typography>
              <Typography variant="p" className="text-cream/80 mb-8 max-w-lg mx-auto">
                Berlangganan newsletter Mega Bookstore untuk mendapatkan penawaran eksklusif, rekomendasi buku, dan kabar terbaru seputar literasi.
              </Typography>

              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <Input 
                  type="email" 
                  placeholder="Alamat Email Anda" 
                  className="bg-cream/10 border-cream/20 text-cream placeholder:text-cream/50 h-12 rounded-full focus-visible:ring-cream/30"
                  required
                />
                <Button type="submit" size="lg" className="rounded-full h-12 bg-primary-brand text-white hover:bg-primary-brand/90 px-8 shrink-0">
                  Langganan
                </Button>
              </form>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
