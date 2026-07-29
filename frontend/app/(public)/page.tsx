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
    <div className="flex flex-col relative bg-cream min-h-screen">
      {/* Global Soft Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
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
