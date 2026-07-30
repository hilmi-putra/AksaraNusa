"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Typography } from "@/components/atoms/Typography";

const services = [
  {
    id: "01",
    title: "Penyuntingan Profesional",
    desc: "Naskah dikurasi secara presisi oleh editor ahli. Kami memastikan tata bahasa dan alur cerita yang sempurna tanpa menghilangkan nyawa tulisan Anda.",
  },
  {
    id: "02",
    title: "Desain Sampul Premium",
    desc: "Tim desainer in-house merancang sampul kelas dunia dengan nilai estetika dan daya tarik komersial tinggi untuk memikat mata pembaca di toko buku.",
  },
  {
    id: "03",
    title: "Distribusi Nasional",
    desc: "Melalui jaringan distribusi masif, karya Anda didistribusikan secara fisik dan digital agar mudah ditemukan oleh pembaca dari Sabang hingga Merauke.",
  },
  {
    id: "04",
    title: "Royalti Transparan",
    desc: "Akses sistem pelaporan royalti secara waktu nyata. Kami menjamin hak finansial setiap penulis dengan pembagian profit yang jujur dan tepat waktu.",
  }
];

export function ServicesSection() {
  return (
    <Section id="layanan" className="py-24 md:py-32 relative bg-transparent overflow-visible scroll-mt-24">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#004A8F]/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#EF7A08]/5 rounded-full blur-[120px] pointer-events-none translate-y-1/4 translate-x-1/4" />

      <Container className="relative z-10 max-w-[1000px]">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-[#EF7A08]" />
              <span className="text-[#EF7A08] font-bold tracking-[0.25em] text-[11px] uppercase">Layanan Aksara Nusa</span>
              <div className="w-12 h-[1px] bg-[#EF7A08]" />
            </div>
            
            <Typography variant="h2" className="text-[#002D5A] font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-8 max-w-2xl">
              Solusi Penerbitan <em className="italic font-light text-[#EF7A08]">Total.</em>
            </Typography>
            
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light max-w-xl">
              Mulai dari draf kasar hingga terbit dan mejeng di rak toko buku nasional, kami memfasilitasi setiap detail perjalanan naskah Anda.
            </p>
          </motion.div>
        </div>

        {/* Pure Typographic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 lg:gap-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Massive Watermark Number */}
              <div className="absolute -top-10 -left-6 font-serif text-[120px] leading-none font-bold text-slate-100/50 pointer-events-none select-none z-0 transition-colors duration-500 group-hover:text-[#EF7A08]/10">
                {service.id}
              </div>
              
              <div className="relative z-10 pl-4 md:pl-6 border-l border-slate-200 group-hover:border-[#EF7A08] transition-colors duration-500">
                <h4 className="text-2xl md:text-3xl font-serif font-bold text-[#002D5A] leading-tight mb-4 tracking-tight group-hover:text-[#EF7A08] transition-colors duration-500">
                  {service.title}
                </h4>
                <p className="text-slate-500 text-[14px] md:text-[15px] leading-relaxed font-light">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </Section>
  );
}
