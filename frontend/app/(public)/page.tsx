import React from "react";
import { HeroSection } from "@/features/landing/HeroSection";
import { AboutSection } from "@/features/landing/AboutSection";
import { ServicesSection } from "@/features/landing/ServicesSection";
import { ProcessSection } from "@/features/landing/ProcessSection";
import { FeaturedBooksSection } from "@/features/landing/FeaturedBooksSection";

import { TestimonialSection } from "@/features/landing/TestimonialSection";
import { CTASection } from "@/features/landing/CTASection";
import { FAQSection } from "@/features/landing/FAQSection";

export const metadata = {
  title: "Aksara Nusa | Wujudkan Naskahmu Menjadi Buku yang Menginspirasi",
  description: "Penerbit indie terkemuka yang mendampingi penulis dari draf pertama hingga mejeng di Aksara Nusa Bookstore.",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col relative bg-cream min-h-screen overflow-x-hidden">
      {/* Global Soft Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-100 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 32 Q40 40 48 40 Q40 40 40 48 Q40 40 32 40 Q40 40 40 32 Z' fill='%23004A8F' fill-opacity='0.03'/%3E%3Cpath d='M15 11 Q15 15 19 15 Q15 15 15 19 Q15 15 11 15 Q15 15 15 11 Z' fill='%23EF7A08' fill-opacity='0.02'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      
      <div className="relative z-10 flex flex-col">
        <HeroSection />
      <AboutSection />
      <TestimonialSection />
      <ServicesSection />
      <ProcessSection />
      <FeaturedBooksSection />

      <FAQSection />
      <CTASection />
      </div >
    </div>
  );
}
