"use client";

import React from "react";
import { motion } from "framer-motion";
import { Typography } from "@/components/atoms/Typography";
import { Container } from "@/components/atoms/Container";

const LOGOS = [
  "https://ik.imagekit.io/yqhp1cmbp/megapress/image%201123.svg",
  "https://ik.imagekit.io/yqhp1cmbp/megapress/image%201124.svg",
  "https://ik.imagekit.io/yqhp1cmbp/megapress/image%201128.svg",
  "https://ik.imagekit.io/yqhp1cmbp/megapress/image%201121.svg",
  "https://ik.imagekit.io/yqhp1cmbp/megapress/image%201125.svg",
  "https://ik.imagekit.io/yqhp1cmbp/megapress/image%201122.svg",
  "https://ik.imagekit.io/yqhp1cmbp/megapress/image%201120.svg",
  "https://ik.imagekit.io/yqhp1cmbp/megapress/image%201126.svg",
  "https://ik.imagekit.io/yqhp1cmbp/megapress/image%201127.svg",
];

export function LogoMarqueeSection() {
  return (
    <Container className="w-full py-8 md:py-12 bg-transparent">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
      <div 
        className="relative flex w-full overflow-hidden"
        style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)", maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
      >
        <div
          className="flex whitespace-nowrap gap-16 md:gap-24 items-center pr-16 md:pr-24 animate-marquee"
        >
          {/* Double the array for seamless infinite scroll */}
          {[...LOGOS, ...LOGOS].map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="flex-shrink-0 flex items-center justify-center cursor-pointer"
            >
              <img 
                src={logo} 
                alt={`Partner Logo ${index + 1}`} 
                className="h-10 md:h-12 w-auto object-contain brightness-0 opacity-60 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
