"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/atoms/Section";
import { Typography } from "@/components/atoms/Typography";
import { Send, PenTool, LayoutTemplate, Store, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/atoms/Container";

const workflowSteps = [
  {
    icon: <Send size={20} className="text-white" />,
    title: "Pengiriman Naskah",
    description: "Kirimkan draf atau naskah lengkap Anda. Tim ahli kami akan melakukan seleksi awal dan kurasi untuk menilai potensi serta kesesuaian cerita Anda dengan visi Aksara Nusa.",
    color: "from-[#004A8F] to-[#0074B7]"
  },
  {
    icon: <PenTool size={20} className="text-white" />,
    title: "Kurasi & Editorial",
    description: "Naskah Anda akan melewati proses penyuntingan profesional secara intensif. Kami memastikan setiap kata, paragraf, dan dialog memiliki kekuatan emosional untuk menginspirasi pembaca.",
    color: "from-[#EF7A08] to-[#F9A03F]"
  },
  {
    icon: <LayoutTemplate size={20} className="text-white" />,
    title: "Pracetak & Desain",
    description: "Dari tata letak halaman yang nyaman dibaca hingga desain sampul premium yang memikat mata di rak buku. Buku Anda akan dirancang layaknya mahakarya kelas dunia.",
    color: "from-[#002D5A] to-[#004A8F]"
  },
  {
    icon: <Store size={20} className="text-white" />,
    title: "Rilis di Bookstore",
    description: "Momen yang ditunggu! Buku Anda dicetak dengan kualitas terbaik dan didistribusikan secara eksklusif ke Aksara Nusa Bookstore serta puluhan jaringan mitra di seluruh Indonesia.",
    color: "from-[#EF7A08] to-[#C27A00]"
  }
];

export function AboutSection() {
  return (
    <Section className="py-16 md:py-20 bg-transparent relative overflow-visible">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#004A8F]/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#EF7A08]/10 rounded-full blur-[100px] pointer-events-none translate-y-1/4 -translate-x-1/4" />
      
      <Container className="relative z-10 max-w-[1100px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Context */}
          <div className="lg:w-5/12 pt-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-[2px] bg-[#EF7A08]" />
                <span className="text-[#EF7A08] font-bold tracking-[0.2em] text-[10px] uppercase">Alur Kerja Penulis</span>
              </div>

              <Typography variant="h2" className="text-[#002D5A] mb-5 leading-[1.1] font-serif text-3xl md:text-4xl tracking-tight">
                Perjalanan Naskah Menjadi <span className="block mt-1 italic font-light text-[#EF7A08]">Mahakarya</span>
              </Typography>
              
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#004A8F] to-transparent mb-6 opacity-30" />

              <Typography variant="description" className="text-slate-600 mb-8 text-sm md:text-base leading-relaxed font-light">
                Kami percaya setiap cerita pantas untuk didengar. Di Aksara Nusa Mediatama, kami mendampingi penulis melalui proses penerbitan eksklusif yang terstruktur, transparan, dan berstandar internasional.
              </Typography>
              
              <Button size="default" className="group rounded-full px-6 h-11 bg-white text-[#004A8F] hover:bg-[#004A8F] hover:text-white font-bold text-sm transition-all duration-300 shadow-md shadow-slate-200 hover:shadow-[#004A8F]/20 border border-slate-100">
                Mulai Terbitkan Buku
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Vertical Timeline */}
          <div className="lg:w-7/12 relative w-full pt-4 lg:pt-0">
            {/* The vertical connecting line */}
            <div className="absolute left-[27px] md:left-[27px] top-4 bottom-10 w-[2px] bg-gradient-to-b from-[#004A8F]/20 via-[#EF7A08]/20 to-transparent hidden sm:block" />

            <div className="flex flex-col gap-8 md:gap-10 relative">
              {workflowSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="relative flex flex-col sm:flex-row gap-5 md:gap-6 group"
                >
                  {/* Step Icon / Number Indicator */}
                  <div className="relative z-10 flex shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-white shadow-lg shadow-slate-200/50 flex items-center justify-center border border-slate-50 relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-300 ease-out">
                      {/* Gradient background that reveals on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      
                      {/* Icon normal state */}
                      <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                        {React.cloneElement(step.icon as React.ReactElement, { className: "text-[#004A8F]" })}
                      </div>
                      
                      {/* Icon hover state */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {step.icon}
                      </div>
                    </div>

                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#EF7A08] text-white flex items-center justify-center font-bold text-[10px] shadow-sm border-[1.5px] border-white">
                      {index + 1}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-0 sm:pt-1">
                    <Typography variant="h3" className="text-[#002D5A] mb-2 font-serif text-xl md:text-2xl group-hover:text-[#EF7A08] transition-colors duration-300">
                      {step.title}
                    </Typography>
                    <Typography variant="p" className="text-slate-500 text-sm leading-relaxed font-light">
                      {step.description}
                    </Typography>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}

