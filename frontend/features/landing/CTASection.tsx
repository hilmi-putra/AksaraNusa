"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, PenTool, Edit3, Bookmark, Type, Feather } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Static array of background shapes to prevent hydration mismatch
const BACKGROUND_SHAPES = [
  { id: 1, type: 'circle', color: 'bg-blue-400/40', size: 'w-4 h-4', top: '10%', left: '15%', zIndex: 1, depth: 0.8 },
  { id: 2, type: 'square', color: 'bg-orange-400/40', size: 'w-6 h-6', top: '25%', left: '8%', zIndex: 2, depth: 1.2 },
  { id: 3, type: 'triangle', color: 'bg-blue-500/40', size: 'w-5 h-5', top: '45%', left: '12%', zIndex: 1, depth: 0.6 },
  { id: 4, type: 'circle', color: 'bg-orange-500/40', size: 'w-8 h-8', top: '70%', left: '5%', zIndex: 0, depth: 0.4 },
  { id: 5, type: 'square', color: 'bg-slate-400/40', size: 'w-3 h-3', top: '85%', left: '18%', zIndex: 2, depth: 1.5 },
  { id: 6, type: 'icon', icon: Book, color: 'text-blue-500/40', size: 'w-6 h-6', top: '15%', left: '28%', zIndex: 1, depth: 0.9 },
  { id: 7, type: 'circle', color: 'bg-slate-300/60', size: 'w-5 h-5', top: '35%', left: '25%', zIndex: 0, depth: 0.5 },
  { id: 8, type: 'square', color: 'bg-orange-400/30', size: 'w-4 h-4', top: '65%', left: '22%', zIndex: 1, depth: 0.7 },
  { id: 9, type: 'icon', icon: PenTool, color: 'text-orange-500/40', size: 'w-5 h-5', top: '85%', left: '32%', zIndex: 2, depth: 1.3 },
  { id: 10, type: 'circle', color: 'bg-slate-400/40', size: 'w-3 h-3', top: '50%', left: '38%', zIndex: 1, depth: 0.8 },
  
  { id: 11, type: 'circle', color: 'bg-blue-400/40', size: 'w-6 h-6', top: '12%', right: '18%', zIndex: 2, depth: 1.1 },
  { id: 12, type: 'square', color: 'bg-orange-300/50', size: 'w-5 h-5', top: '28%', right: '8%', zIndex: 1, depth: 0.7 },
  { id: 13, type: 'triangle', color: 'bg-blue-400/40', size: 'w-4 h-4', top: '48%', right: '15%', zIndex: 0, depth: 0.5 },
  { id: 14, type: 'circle', color: 'bg-orange-400/40', size: 'w-7 h-7', top: '75%', right: '10%', zIndex: 2, depth: 1.4 },
  { id: 15, type: 'square', color: 'bg-slate-400/40', size: 'w-3 h-3', top: '90%', right: '22%', zIndex: 1, depth: 0.9 },
  { id: 16, type: 'icon', icon: Edit3, color: 'text-blue-500/40', size: 'w-6 h-6', top: '18%', right: '32%', zIndex: 1, depth: 0.8 },
  { id: 17, type: 'circle', color: 'bg-blue-300/50', size: 'w-4 h-4', top: '38%', right: '28%', zIndex: 0, depth: 0.4 },
  { id: 18, type: 'square', color: 'bg-orange-400/40', size: 'w-5 h-5', top: '68%', right: '25%', zIndex: 2, depth: 1.2 },
  { id: 19, type: 'icon', icon: Bookmark, color: 'text-orange-500/40', size: 'w-5 h-5', top: '88%', right: '35%', zIndex: 1, depth: 0.7 },
  { id: 20, type: 'circle', color: 'bg-blue-400/40', size: 'w-3 h-3', top: '55%', right: '40%', zIndex: 1, depth: 0.6 },
  
  { id: 21, type: 'icon', icon: Type, color: 'text-blue-500/30', size: 'w-6 h-6', top: '8%', left: '50%', zIndex: 0, depth: 0.3 },
  { id: 22, type: 'icon', icon: Feather, color: 'text-slate-400/50', size: 'w-6 h-6', top: '92%', left: '48%', zIndex: 2, depth: 1.1 },
];

export function CTASection() {
  const containerRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  useGSAP(() => {
    // QuickSetters for Cursor position
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3.out" });

    // Ensure initial shapes state
    gsap.set(shapesRef.current, { x: 0, y: 0, rotation: 0, scale: 1 });

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update custom cursor
      xTo(x);
      yTo(y);

      // Center of screen for parallax calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / centerX; // -1 to 1
      const deltaY = (y - centerY) / centerY; // -1 to 1

      // Handle shapes parallax and magnetic effect
      shapesRef.current.forEach((shape, i) => {
        if (!shape) return;
        const shapeData = BACKGROUND_SHAPES[i];
        const shapeRect = shape.getBoundingClientRect();
        
        // Shape center relative to container
        const shapeCX = shapeRect.left - rect.left + shapeRect.width / 2;
        const shapeCY = shapeRect.top - rect.top + shapeRect.height / 2;
        
        const dist = Math.hypot(x - shapeCX, y - shapeCY);
        const magneticRadius = 150;
        
        if (dist < magneticRadius) {
          // Magnetic Pull
          const pull = 1 - dist / magneticRadius;
          const pullX = (x - shapeCX) * pull * 0.4;
          const pullY = (y - shapeCY) * pull * 0.4;
          
          gsap.to(shape, {
            x: pullX,
            y: pullY,
            rotation: pull * (i % 2 === 0 ? 10 : -10),
            scale: 1 + (pull * 0.15),
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
        } else {
          // Subtle Parallax based on depth
          const depth = shapeData.depth || 1;
          gsap.to(shape, {
            x: -deltaX * 30 * depth,
            y: -deltaY * 30 * depth,
            rotation: deltaX * 10 * depth,
            scale: 1,
            duration: 1.5,
            ease: "power1.out",
            overwrite: "auto"
          });
        }
      });
      
      // Main Card subtle tilt
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          x: deltaX * 10,
          y: deltaY * 10,
          rotationY: deltaX * 2,
          rotationX: -deltaY * 2,
          duration: 1,
          ease: "power2.out"
        });
      }
    };

    const handleMouseEnter = () => setCursorVisible(true);
    const handleMouseLeave = () => {
      setCursorVisible(false);
      // Reset shapes
      gsap.to(shapesRef.current, {
        x: 0, y: 0, rotation: 0, scale: 1,
        duration: 1.5, ease: "elastic.out(1, 0.3)", overwrite: "auto"
      });
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          x: 0, y: 0, rotationY: 0, rotationX: 0,
          duration: 1.5, ease: "elastic.out(1, 0.5)"
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, { scope: containerRef });

  // Handle interactive hover for cursor expansion
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? "rgba(239, 122, 8, 0.1)" : "rgba(0, 74, 143, 0.1)",
        border: isHovering ? "1px solid rgba(239, 122, 8, 0.5)" : "none",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isHovering]);

  return (
    <Section 
      ref={containerRef} 
      className="py-24 md:py-40 relative overflow-hidden bg-transparent cursor-none perspective-1000"
    >
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="pointer-events-none absolute top-0 left-0 w-4 h-4 rounded-full z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply"
        style={{ opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.3s' }}
      />

      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #EF7A08 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Scattered Parallax/Magnetic Shapes */}
      {BACKGROUND_SHAPES.map((shape, i) => (
        <div
          key={shape.id}
          ref={(el) => { shapesRef.current[i] = el; }}
          className="absolute z-0 pointer-events-none"
          style={{ top: shape.top, left: shape.left, right: shape.right, zIndex: shape.zIndex }}
        >
          {shape.type === 'circle' && <div className={`${shape.size} ${shape.color} rounded-full shadow-sm`} />}
          {shape.type === 'square' && <div className={`${shape.size} ${shape.color} rounded-md shadow-sm transform rotate-12`} />}
          {shape.type === 'triangle' && (
            <div className={`w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent ${shape.color.replace('bg-', 'border-b-')} shadow-sm transform -rotate-12`} />
          )}
          {shape.type === 'icon' && shape.icon && (
            <shape.icon className={`${shape.size} ${shape.color} drop-shadow-sm`} />
          )}
        </div>
      ))}

      <Container className="relative z-10 flex items-center justify-center pointer-events-none">
        
        {/* Main CTA Card */}
        <motion.div 
          ref={cardRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-[10px] max-w-[460px] w-full text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-200 pointer-events-auto relative overflow-hidden flex flex-col"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex flex-col items-center p-10 md:p-12 pb-10">
            {/* Logo */}
            <div className="w-[140px] md:w-[180px] mb-6 flex items-center justify-center">
              <img 
                src="https://ik.imagekit.io/yqhp1cmbp/Teks%20paragraf%20Anda%201.png" 
                alt="Aksara Nusa Logo" 
                className="w-full h-auto object-contain"
              />
            </div>
            
            <h2 className="text-gray-900 font-serif text-[32px] md:text-[36px] leading-[1.15] tracking-tight mb-8">
              Mulai langkah pertama, <br />
              bersama Aksara Nusa
            </h2>
            
            <div className="flex flex-row gap-3 w-full">
              <Button 
                className="flex-1 rounded-[6px] h-12 text-[14px] bg-gradient-primary hover:brightness-110 text-white font-bold transition-all"
              >
                Kirim Naskah
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 rounded-[6px] h-12 text-[14px] bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold transition-colors"
              >
                Hubungi Kami
              </Button>
            </div>
          </div>
          
          {/* Bottom Area (Like Image 2) */}
          <div className="bg-[#F8F9FA] border-t border-gray-100 py-6 px-10 text-[14px] text-gray-600">
            Sudah punya akun? <a href="#" className="font-bold text-[#004A8F] hover:underline">Masuk</a>.
          </div>
        </motion.div>

      </Container>
    </Section>
  );
}
