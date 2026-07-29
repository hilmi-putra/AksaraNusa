"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

const categories = [
  { id: "terlaris", label: "Buku Terlaris", color: "bg-[#004A8F]", textColor: "text-white", arrowBg: "bg-white", arrowColor: "text-[#004A8F]", rotate: 30, zClass: "z-10", left: "left-[5%]" },
  { id: "fiksi", label: "Buku Fiksi", color: "bg-[#EF7A08]", textColor: "text-white", arrowBg: "bg-white", arrowColor: "text-[#EF7A08]", rotate: 24, zClass: "z-20", left: "left-[30%]" },
  { id: "non-fiksi", label: "Non-Fiksi", color: "bg-[#002D5A]", textColor: "text-white", arrowBg: "bg-white", arrowColor: "text-[#002D5A]", rotate: 18, zClass: "z-30", left: "left-[55%]" },
  { id: "anak", label: "Buku Anak", color: "bg-[#E6F0FA]", textColor: "text-[#004A8F]", arrowBg: "bg-[#004A8F]", arrowColor: "text-white", rotate: 12, zClass: "z-40", left: "left-[80%]" }
];

export function StoreHeroSection() {
  const spinesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    spinesRef.current.forEach((spine, index) => {
      if (!spine) return;

      const enterAnimation = () => {
        gsap.to(spine, {
          y: -25, // Lifted more so the hover is clearly visible
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const leaveAnimation = () => {
        gsap.to(spine, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      spine.addEventListener("mouseenter", enterAnimation);
      spine.addEventListener("mouseleave", leaveAnimation);

      return () => {
        spine.removeEventListener("mouseenter", enterAnimation);
        spine.removeEventListener("mouseleave", leaveAnimation);
      };
    });
  }, []);

  return (
    <section
      className="pt-16 md:pt-32 overflow-hidden border-b-2 border-[#004A8F]"
      style={{
        backgroundColor: "#F8FAFC",
        backgroundImage: `
          linear-gradient(to right, rgba(0, 74, 143, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 74, 143, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "200px 200px" // Ukuran grid yang diperbesar
      }}
    >
      <Container>
        <div className="flex flex-col md:flex-row items-end justify-between w-full max-w-7xl mx-auto gap-16 relative">

          {/* Left Column: Typography & Text */}
          <div className="flex flex-col items-start max-w-lg pb-16 relative z-10">

            {/* BOOK ROOM Logo (Fixed Layout spacing) */}
            <div className="flex items-center text-[80px] md:text-[110px] font-sans font-bold leading-none text-[#171512] tracking-tighter mb-10">
              <div className="flex flex-col leading-[0.85] mr-4 md:mr-8">
                <span>B</span>
                <span>R</span>
              </div>

              {/* Linked O's SVG */}
              <div className="flex items-center -mx-2 z-10">
                {/* Left O */}
                <svg width="60" height="150" viewBox="0 0 60 150" className="md:w-[85px] md:h-[210px] rotate-[15deg] z-10" fill="none">
                  <rect x="5" y="5" width="50" height="140" rx="25" stroke="#004A8F" strokeWidth="10" />
                </svg>
                {/* Right O */}
                <svg width="60" height="150" viewBox="0 0 60 150" className="md:w-[85px] md:h-[210px] -ml-6 md:-ml-8 rotate-[-5deg] z-0" fill="none">
                  <rect x="5" y="5" width="50" height="140" rx="25" stroke="#EF7A08" strokeWidth="10" />
                </svg>
              </div>

              <div className="flex flex-col leading-[0.85] ml-4 md:ml-8">
                <span>K</span>
                <span>M</span>
              </div>
            </div>

            {/* Enter -> Go to shop */}
            <div className="flex items-center gap-4 mb-16">
              <div className="flex items-center justify-between border-2 border-[#171512] rounded-full px-4 py-2 w-56 md:w-64 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="font-medium text-[#171512] text-lg">Mulai</span>
                <Link href="/bookstore/koleksi/semua" className="bg-[#EF7A08] text-white p-1 rounded-full hover:bg-[#d66d07] transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <span className="font-bold text-[#171512] text-lg">Jelajahi koleksi</span>
            </div>

            {/* Paragraph */}
            <p className="text-xl md:text-2xl font-medium text-[#171512] leading-snug">
              Belum tahu ingin baca apa hari ini? Temukan <Link href="/bookstore/koleksi/semua" className="underline decoration-[#004A8F] decoration-2 underline-offset-4 hover:text-[#004A8F] transition-colors">inspirasi bacaan</Link> terbaik terbitan Aksara Nusa untuk menemani keseharian Anda.
            </p>
          </div>

          {/* Right Column: Domino Book Spines (Absolute position along bottom line) */}
          <div className="w-full md:w-1/2 h-[450px] md:h-[550px] relative z-10">
            {categories.map((cat, index) => (
              <div
                key={cat.id}
                className={`absolute bottom-0 ${cat.left} ${cat.zClass}`}
                ref={(el) => { spinesRef.current[index] = el; }}
              >
                <Link
                  href={`/bookstore/kategori/${cat.id}`}
                  className={`block w-16 md:w-20 lg:w-[90px] h-[350px] md:h-[420px] ${cat.color} cursor-pointer flex flex-col items-center justify-between py-6 transition-colors shadow-[-4px_4px_0px_rgba(23,21,18,1)] border-2 border-[#171512] hover:brightness-105`}
                  style={{
                    transform: `rotate(${cat.rotate}deg)`,
                    transformOrigin: "bottom left"
                  }}
                >
                  {/* Arrow Circle Top */}
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${cat.arrowBg} flex items-center justify-center`}>
                    <ArrowRight className={`w-5 h-5 ${cat.arrowColor}`} />
                  </div>

                  {/* Spine Text */}
                  <span className={`${cat.textColor} font-semibold text-xl md:text-2xl lg:text-3xl whitespace-nowrap tracking-wider mb-8`} style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                    {cat.label}
                  </span>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
