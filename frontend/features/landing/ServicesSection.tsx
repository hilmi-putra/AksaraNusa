"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { landingData } from "@/lib/mock/landing.mock";
import { ArrowRight } from "lucide-react";

// Using the provided assets
const serviceImages = [
  "https://ik.imagekit.io/yqhp1cmbp/megapress/penyuntingan.svg",
  "https://ik.imagekit.io/yqhp1cmbp/megapress/design.svg",
  "https://ik.imagekit.io/yqhp1cmbp/megapress/distribusi.svg",
  "https://ik.imagekit.io/yqhp1cmbp/megapress/royalti.svg",
];

export function ServicesSection() {
  return (
    <Section id="layanan" className="py-24 md:py-32 relative overflow-hidden bg-transparent scroll-mt-24">
      
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[12px] md:text-[13px] font-bold tracking-[0.2em] uppercase mb-4 text-[#DB8B00]">
              Layanan Kami
            </h2>
            <h3 className="mb-6 font-serif text-[36px] md:text-[48px] text-[#6E0000] leading-tight">
              Solusi Lengkap untuk <em className="italic font-light text-[#DB8B00]">Penulis</em>
            </h3>
            <p className="text-[#6E0000]/70 text-[16px] md:text-[18px]">
              Mulai dari penyuntingan hingga royalti, kami memfasilitasi setiap aspek.
            </p>
          </motion.div>
        </div>

        {/* Cards Grid (2x2 layout for landscape rectangles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {landingData.services.map((service, index) => {
            const imageSrc = serviceImages[index] || serviceImages[3];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -5, backgroundColor: "rgba(110, 0, 0, 0.02)" }}
                className="group relative p-8 md:p-10 rounded-3xl transition-all duration-300 flex flex-col justify-center"
                style={{ 
                  background: 'transparent',
                  border: '1px solid rgba(110, 0, 0, 0.15)'
                }}
              >
                {/* Card Content (Horizontal Layout) */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8 h-full">
                  
                  {/* Left: Text & Action */}
                  <div className="flex flex-col justify-center w-full sm:w-1/2 text-center sm:text-left">
                    <h4 className="text-[22px] md:text-[26px] font-serif font-bold mb-6 leading-[1.2] text-[#6E0000]">
                      {service.title}
                    </h4>
                    
                    {/* Action Link */}
                    <div className="flex items-center justify-center sm:justify-start text-[#DB8B00] font-bold text-[14px] group-hover:text-[#6E0000] transition-colors cursor-pointer w-full sm:w-fit">
                      Pelajari lebih lanjut <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>

                  {/* Right: SVG Illustration */}
                  <div className="w-full sm:w-1/2 flex justify-center sm:justify-end items-center h-[140px] md:h-[180px]">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      src={imageSrc} 
                      alt={service.title} 
                      className="max-h-full max-w-full object-contain drop-shadow-lg"
                      onError={(e) => {
                        if (index === 0) e.currentTarget.src = serviceImages[3];
                      }}
                    />
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Filter/Nav */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-[#6E0000]/70 text-[14px]">
          <span>Jelajahi Ekosistem Mega Press untuk</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 font-medium hover:text-[#6E0000] cursor-pointer transition-colors"><span className="w-2 h-2 rounded-full bg-[#DB8B00]"></span> Fiksi</span>
            <span className="flex items-center gap-2 font-medium hover:text-[#6E0000] cursor-pointer transition-colors"><span className="w-2 h-2 rounded-full bg-[#FAEDEE] border border-[#6E0000]/20"></span> Non-Fiksi</span>
            <span className="flex items-center gap-2 font-medium hover:text-[#6E0000] cursor-pointer transition-colors"><span className="w-2 h-2 rounded-full bg-[#DB8B00]"></span> Akademik</span>
          </div>
        </div>

      </Container>
    </Section>
  );
}
