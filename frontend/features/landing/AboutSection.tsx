"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/atoms/Section";
import { 
  ArrowRight, BookOpen, Book, BookMarked, Layers, PenTool, CheckCircle, 
  LayoutTemplate, Star, MessageSquare, FileText, Send, MoreHorizontal, FileSpreadsheet, Bot, Wand2, Mail
} from "lucide-react";

export function AboutSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Section className="py-20 md:py-24 overflow-hidden bg-transparent">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Text, Graphic, Text, Button */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left relative z-20"
          >
            {/* Top Text Block */}
            <div className="mb-12 flex flex-col items-center lg:items-start">
              <div className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-[#657555] mb-2 opacity-90">
                Kabar Dari Penerbit
              </div>
              <h2 className="font-serif text-[32px] md:text-[40px] leading-[1.1] mb-3 text-gray-900">
                Alur Kerja Penulis
              </h2>
              <a href="#" className="inline-flex items-center text-[13px] md:text-[15px] font-bold text-[#DB8B00] hover:text-[#C27A00] transition-colors group">
                Pelajari lebih lanjut 
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Middle Graphic (Circular Books Illustration) */}
            <div className="relative w-[280px] h-[280px] md:w-[300px] md:h-[300px] mb-12 flex items-center justify-center">
              {/* Central badge Image */}
              <img 
                src="https://ik.imagekit.io/yqhp1cmbp/megapress/book.svg" 
                alt="Book Graphic" 
                className="absolute z-30 w-[260px] h-[260px] md:w-[280px] md:h-[280px] object-contain drop-shadow-[0_10px_30px_rgba(219,139,0,0.3)]" 
              />
            </div>

            {/* Bottom Text Block */}
            <div className="flex flex-col items-center lg:items-start">
              <p className="text-[15px] md:text-[17px] leading-[1.6] text-gray-600 mb-6 max-w-[340px]">
                Yayasan untuk penerbitan modern, mengubah naskah mentah menjadi peluncuran yang sukses.
              </p>
              <button className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-xl font-bold transition-all text-[14px]">
                Tingkatkan Penerbitan Anda
              </button>
            </div>
          </motion.div>


          {/* RIGHT COLUMN: The Storyboard/Workbench UI */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 relative w-full h-[550px] md:h-[600px] flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            {/* Wrapper to align all boards relative to the center */}
            <div className="relative w-full max-w-[480px] md:max-w-[540px] h-[560px] flex items-center justify-center scale-95 md:scale-100 transform origin-right">

              {/* BACK CARD (Left): Naskah Metrics */}
              <motion.div 
                animate={{ x: isHovered ? -15 : 0, y: isHovered ? -10 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute top-8 -left-[5%] md:-left-[20%] lg:-left-[160px] w-[260px] lg:w-[300px] bg-[#FAF8F5] rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-0 hidden md:block"
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-[#8C4332]" />
                    <span className="font-bold text-gray-800 text-[13px]">Naskah</span>
                  </div>
                </div>
                <div className="p-5 bg-white m-2 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex gap-1 mb-4">
                    <div className="bg-[#F6EBE9] text-[#8C4332] text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8C4332]"></span> Nigh
                    </div>
                  </div>
                  <h5 className="font-bold text-gray-900 text-[18px] mb-2 leading-tight">Tinjauan sedang berlangsung</h5>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#657555]"></span> Tinjauan sedang berlangsung
                  </div>
                  
                  <div className="text-[11px] font-bold text-gray-500 mb-2">Case metrics</div>
                  <div className="w-full text-left text-[12px]">
                    <div className="flex justify-between border-b border-gray-100 pb-2 mb-2 font-bold text-gray-600">
                      <span>Halaman</span>
                      <span>Kata</span>
                      <span>Bab</span>
                    </div>
                    <div className="flex justify-between text-gray-800">
                      <span>320</span>
                      <span>85,000</span>
                      <span>22</span>
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-5 text-[11px] text-gray-500 leading-relaxed">
                  Lihat detail di bawah untuk analisis editorial lebih lanjut, termasuk garis besar bab, pemeriksaan karakter, dan rekomendasi gaya.
                </div>
              </motion.div>

              {/* MAIN BOARD (Center): Pipa Editorial Workflow */}
              <div className="relative w-full h-full bg-white rounded-2xl border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col z-10">
                
                {/* Header */}
                <div className="w-full h-12 border-b border-gray-100 flex items-center justify-between px-4 bg-white z-10">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate size={16} className="text-gray-500" />
                    <span className="font-bold text-gray-700 text-[14px]">Pipa Editorial</span>
                  </div>
                  <div className="flex gap-2 text-gray-400">
                    <MoreHorizontal size={16} />
                  </div>
                </div>

                {/* Dotted Grid Body */}
                <div className="relative flex-1 bg-[#FAFAFA] overflow-hidden p-6 flex justify-center" style={{ backgroundImage: 'radial-gradient(circle, #E5E5E5 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}>
                  
                  {/* Workflow Nodes */}
                  <div className="relative w-full max-w-[240px] flex flex-col items-center mt-2 -translate-x-6 lg:-translate-x-12">
                    
                    {/* Node 1 */}
                    <div className="bg-[#F6EBE9] px-4 py-2 rounded-lg border border-[#8C4332]/20 flex items-center gap-2 w-[160px] shadow-sm z-10">
                      <Mail size={14} className="text-[#8C4332]" />
                      <div className="text-[11px] font-bold text-[#8C4332]">Naskah Diterima</div>
                    </div>
                    
                    <div className="w-px h-6 bg-gray-300"></div>

                    {/* Node 2 */}
                    <div className="bg-[#FDF0D5] px-4 py-2 rounded-lg border border-[#DB8B00]/20 flex items-center gap-2 w-[160px] shadow-sm z-10">
                      <Bot size={14} className="text-[#DB8B00]" />
                      <div className="text-[11px] font-bold text-[#DB8B00]">Analisis Teks AI</div>
                    </div>

                    <div className="w-px h-6 bg-gray-300"></div>

                    {/* Node 3 */}
                    <div className="bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200 flex items-center gap-2 w-[160px] shadow-sm z-10">
                      <CheckCircle size={14} className="text-emerald-600" />
                      <div className="text-[11px] font-bold text-emerald-700">Tinjauan Selesai</div>
                    </div>

                    <div className="w-px h-6 bg-gray-300"></div>

                    {/* Branching */}
                    <div className="w-[180px] border-t border-gray-300 relative h-6">
                      <div className="absolute top-0 left-0 w-px h-6 bg-gray-300"></div>
                      <div className="absolute top-0 right-0 w-px h-6 bg-gray-300"></div>
                    </div>

                    <div className="flex gap-4 w-[200px] justify-between">
                      {/* Branch Left */}
                      <div className="bg-red-50 px-3 py-2 rounded-lg border border-red-200 flex items-center gap-1.5 w-[90px] shadow-sm z-10 justify-center text-center">
                        <div className="text-[10px] font-bold text-red-600">Revisi Mayor</div>
                      </div>
                      {/* Branch Right */}
                      <div className="bg-green-50 px-3 py-2 rounded-lg border border-green-200 flex items-center gap-1.5 w-[90px] shadow-sm z-10 justify-center text-center">
                        <div className="text-[10px] font-bold text-green-700">Revisi Minor</div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Tools Icons (Left edge of board) */}
                  <div className="absolute left-3 top-6 flex flex-col gap-4 text-gray-400">
                    <PenTool size={18} />
                    <LayoutTemplate size={18} />
                    <Book size={18} />
                    <FileText size={18} />
                  </div>
                </div>
              </div>

              {/* FRONT CARD (Right): Obrolan Penulis Chat */}
              <motion.div 
                animate={{ x: isHovered ? 10 : 0, y: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-1/4 -right-[2%] md:-right-[10%] lg:-right-[140px] w-[280px] md:w-[340px] bg-white rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-gray-200 overflow-hidden z-20"
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-[#657555]" />
                    <span className="font-bold text-gray-800 text-[14px]">Obrolan Penulis</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-4 bg-[#FAFAFA] flex flex-col gap-3 h-[240px] overflow-y-auto">
                  {/* Chat Bubble Right */}
                  <div className="self-end bg-[#657555] text-white p-3 rounded-2xl rounded-tr-sm text-[12px] max-w-[85%] shadow-sm">
                    Halo, bisa Anda tinjau bab ketiga Jennifer Browne?
                  </div>
                  
                  {/* Chat Bubble Left */}
                  <div className="self-start bg-white border border-gray-100 text-gray-700 p-3 rounded-2xl rounded-tl-sm text-[12px] max-w-[90%] shadow-sm flex flex-col gap-2">
                    <span>Tentu! Langkah pertama adalah mengambil file naskah terbaru dan profil penulis.</span>
                    
                    {/* Action Item inside Chat */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 flex justify-between items-center mt-1">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet size={14} className="text-[#DB8B00]" />
                        <span className="font-bold text-[11px] text-gray-700">Ambil File Naskah (Mss 12)</span>
                      </div>
                      <ArrowRight size={12} className="text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {/* Chat Input */}
                <div className="p-3 border-t border-gray-100 bg-white flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-[12px] text-gray-500">
                    Tulis pesan Anda
                  </div>
                  <div className="w-8 h-8 bg-[#657555] rounded-full flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Send size={14} />
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </Section>
  );
}

