"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Typography } from "@/components/atoms/Typography";
import { landingData } from "@/lib/mock/landing.mock";
import { Plus, Minus } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section className="py-24 md:py-32 bg-transparent relative overflow-visible">
      <Container className="max-w-[1100px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* LEFT: Sticky Header */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start"
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-[2px] bg-[#EF7A08]" />
                <span className="text-[#EF7A08] font-bold tracking-[0.2em] text-[10px] uppercase">Pusat Bantuan</span>
              </div>
              
              <Typography variant="h2" className="text-[#002D5A] font-serif text-4xl md:text-5xl leading-[1.1] tracking-tight mb-6">
                Pertanyaan yang Sering <em className="italic font-light text-[#EF7A08]">Diajukan.</em>
              </Typography>
              
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light mb-10">
                Temukan jawaban atas pertanyaan umum seputar proses penerbitan, distribusi, dan royalti di Aksara Nusa.
              </p>
              
              <div className="w-full h-[1px] bg-slate-200 hidden lg:block" />
            </motion.div>
          </div>

          {/* RIGHT: Accordion List */}
          <div className="w-full lg:w-2/3 flex flex-col">
            <div className="border-t border-slate-200" />
            
            {landingData.faq.map((item, index) => {
              const isOpen = openIndex === index;
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b border-slate-200 group"
                >
                  <button
                    className="w-full flex items-center justify-between py-8 md:py-10 text-left focus:outline-none"
                    onClick={() => toggleOpen(index)}
                  >
                    <h4 className={`pr-8 text-xl md:text-2xl font-serif font-bold transition-colors duration-300 leading-tight ${isOpen ? 'text-[#EF7A08]' : 'text-[#002D5A] group-hover:text-[#EF7A08]'}`}>
                      {item.question}
                    </h4>
                    
                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen ? 'border-[#EF7A08] bg-[#EF7A08] text-white rotate-180' : 'border-slate-200 text-slate-400 group-hover:border-[#EF7A08] group-hover:text-[#EF7A08]'}`}>
                      {isOpen ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-10 pt-0 pr-4 md:pr-12">
                          <p className="text-slate-600 text-[15px] md:text-base leading-relaxed font-light">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
          
        </div>
      </Container>
    </Section>
  );
}
