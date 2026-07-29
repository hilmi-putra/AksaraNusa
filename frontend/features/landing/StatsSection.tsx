"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/atoms/Section";
import { landingData } from "@/lib/mock/landing.mock";
import { Star } from "lucide-react";

export function StatsSection() {
  return (
    <Section className="py-24 md:py-32 w-full flex justify-center bg-white">
      {/* The Banner Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[1280px] mx-auto px-6 md:px-8"
      >
        <div 
          className="rounded-[32px] w-full py-16 md:py-24 px-8 md:px-16 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden"
          style={{ backgroundColor: '#EF7A08' }}
        >
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-primary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

          {/* Label */}
          <div className="mb-6">
            <span className="text-[12px] md:text-[13px] font-bold tracking-[0.2em] uppercase text-white/70">
              Kisah & Pencapaian
            </span>
          </div>
          
          {/* Headline */}
          <h2 className="font-serif text-[36px] md:text-[52px] lg:text-[64px] leading-[1.1] text-white max-w-[900px] mb-8">
            Kekuatan Ekosistem <span className="italic" style={{ color: '#004A8F' }}>Penerbitan Kami</span>
          </h2>
          
          {/* Subheadline */}
          <p className="text-[16px] md:text-[18px] text-white/80 max-w-[700px] mb-16 leading-relaxed">
            Ribuan penulis dan kreator telah bergabung. Simak langsung bagaimana ekosistem Aksara Nusa mentransformasi naskah mereka menjadi karya yang dirayakan oleh pembaca luas.
          </p>

          {/* Stats Row (like the G2/Gartner bar) */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 w-full border-t border-white/10 pt-12">
            
            {landingData.statistics.slice(0, 2).map((stat, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <div className="hidden md:block w-px h-12 bg-white/20"></div>
                )}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Star className="text-gradient-primary" fill="#004A8F" size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-[24px] md:text-[32px] font-serif text-white leading-none mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[12px] md:text-[14px] font-medium text-white/70 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}

          </div>

        </div>
      </motion.div>
    </Section>
  );
}
