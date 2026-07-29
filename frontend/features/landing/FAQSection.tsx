"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { landingData } from "@/lib/mock/landing.mock";
import { ArrowDown, ArrowUp } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section className="py-24 md:py-32 bg-transparent">
      <Container className="max-w-4xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-[42px] md:text-[56px] text-gradient-secondary mb-6">
              FAQs
            </h2>
          </motion.div>
        </div>

        <div className="flex flex-col">
          {landingData.faq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-t border-[#EF7A08]/20"
              >
                <button
                  className="w-full flex items-center justify-between py-6 md:py-8 text-left focus:outline-none group"
                  onClick={() => toggleOpen(index)}
                >
                  <h4 className="pr-8 text-[18px] md:text-[22px] font-bold text-gradient-secondary transition-colors duration-300">
                    {item.question}
                  </h4>
                  <div className="shrink-0 text-gradient-primary group-hover:text-gradient-secondary transition-colors duration-300">
                    {isOpen ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pt-0">
                        <p className="text-[#EF7A08]/80 text-[15px] md:text-[16px] leading-relaxed max-w-3xl">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {/* Bottom border for the last item */}
          <div className="border-t border-[#EF7A08]/20"></div>
        </div>
      </Container>
    </Section>
  );
}
