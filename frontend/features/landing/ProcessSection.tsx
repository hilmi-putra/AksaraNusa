"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Typography } from "@/components/atoms/Typography";
import { landingData } from "@/lib/mock/landing.mock";
import { Bell, Lock, User, CheckCircle2, FileText, Search, PenTool, Layout, Rocket, Send } from "lucide-react";

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Workflow nodes positions for a 360x600 canvas
  // We'll use a fixed coordinate system and scale it with CSS
  const nodes = [
    { x: 180, y: 0 },    // 1. Kirim Naskah (Right)
    { x: 60, y: 120 },   // 2. Kurasi (Left)
    { x: 40, y: 240 },   // 3. Kontrak & Editing (Center-left)
    { x: 60, y: 360 },   // 4. Desain & Layout (Left)
    { x: 0, y: 480 },    // 5. Terbit (Far left)
  ];

  return (
    <Section id="publishing" className="py-24 md:py-32 bg-transparent overflow-hidden scroll-mt-24">
      <Container>
        <div ref={containerRef} className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start relative z-10">
          
          {/* LEFT: Browser Mockup (60%) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-[60%] relative z-20 xl:pr-12"
          >
            {/* The Mockup Window */}
            <div className="relative w-full bg-white rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-slate-200/60 overflow-hidden">
              {/* Browser Header */}
              <div className="bg-white px-5 py-4 border-b border-slate-200/50 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex items-center gap-2 text-xs text-[#002D5A]/40 font-medium font-sans bg-slate-50 px-32 py-1.5 rounded-md border border-slate-200/30">
                  <Lock className="w-3 h-3" />
                  aksaranusa.com/workspace
                </div>
                <div className="w-12" /> {/* Spacer */}
              </div>

              {/* Browser Body: Dashboard Interface */}
              <div className="p-8 md:p-10 min-h-[500px]">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#004A8F]/10 text-[#004A8F] flex items-center justify-center flex-shrink-0 mt-1">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="p" className="text-[13px] font-semibold text-[#004A8F] m-0 mb-1">
                      Naskah Baru Diterima
                    </Typography>
                    <Typography variant="h5" className="text-[#002D5A] text-lg font-semibold m-0 mb-5">
                      Halo Tim Redaksi,
                    </Typography>
                    <Typography variant="p" className="text-[#002D5A]/75 text-[15px] m-0 mb-5 leading-relaxed">
                      Sistem kami mendeteksi ada naskah baru yang masuk dari penulis <strong>Ahmad Rizky</strong>. Naskah ini telah otomatis diteruskan ke antrean kurasi Anda.
                    </Typography>

                    {/* Bullet points mimicking Tines list */}
                    <ul className="text-[14px] text-[#002D5A]/80 space-y-3 m-0 mb-6 p-0 list-none font-medium ml-4">
                      <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#002D5A]/30"/> <strong>Judul:</strong> Merajut Senja di Ujung Waktu</li>
                      <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#002D5A]/30"/> <strong>Genre:</strong> Fiksi / Novel Romantis</li>
                      <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#002D5A]/30"/> <strong>Jumlah Halaman:</strong> 320 Hal</li>
                      <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#004A8F]"/> <strong>Status:</strong> Menunggu Evaluasi</li>
                    </ul>

                    <Typography variant="p" className="text-[#002D5A]/75 text-[15px] m-0 mb-3">
                      Tindakan yang direkomendasikan:
                    </Typography>
                    <ol className="text-[14px] text-[#002D5A]/75 space-y-2 mb-8 pl-5 list-decimal">
                      <li className="pl-1">Tinjau kelayakan tema dan gaya bahasa.</li>
                      <li className="pl-1">Cek potensi pasar untuk genre ini.</li>
                      <li className="pl-1">Tandai sebagai "Lolos Kurasi" jika memenuhi syarat.</li>
                    </ol>

                    {/* Large CTA Button mimicking Tines purple button */}
                    <div className="flex justify-start mb-10">
                      <button className="bg-[#004A8F] text-white px-8 py-3.5 rounded-xl text-[15px] font-semibold shadow-md hover:bg-[#004A8F]/90 transition-colors transform hover:-translate-y-0.5">
                        Mulai Evaluasi Naskah
                      </button>
                    </div>
                    
                    <Typography variant="p" className="text-[#002D5A]/75 text-[14px] m-0 mb-6">
                      Terima kasih atas konfirmasinya. Sistem akan memperbarui status naskah.
                    </Typography>

                    <div className="flex items-center gap-3 text-[14px] font-semibold text-red-500 mb-8">
                      <div className="w-6 h-6 rounded bg-red-100 flex items-center justify-center">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                      Tolak Naskah
                    </div>

                    {/* Input field mockup */}
                    <div className="w-full bg-white border border-slate-200/60 rounded-xl px-4 py-3 text-[14px] text-[#002D5A]/40 shadow-sm flex items-center justify-between">
                      Ketik pesan untuk penulis...
                      <Send className="w-4 h-4 opacity-50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating decorative elements (like Tines paper plane & rings) */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none hidden md:block">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-[#004A8F]/20 rounded-full"
                style={{ borderRadius: "40% 60% 60% 40% / 40% 50% 50% 60%" }}
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-[#EF7A08]/20 rounded-full"
                style={{ borderRadius: "60% 40% 50% 50% / 50% 50% 40% 60%" }}
              />
              <motion.div 
                animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-xl shadow-lg border border-slate-200 flex items-center justify-center rotate-[-10deg]"
              >
                <FileText className="w-5 h-5 text-[#004A8F]" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 15, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-4 w-6 h-6 bg-amber-200 rounded-full border border-amber-300"
              />
              <motion.div 
                animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-2 left-4 w-4 h-4 bg-red-200 rounded shadow-sm border border-red-300 rotate-12"
              />
            </div>
          </motion.div>

          {/* RIGHT: Text & Workflow Diagram (40%) */}
          <div className="w-full lg:w-[40%] flex flex-col pt-2 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <Typography variant="caption" className="text-[#EF7A08] font-bold tracking-widest uppercase mb-4 text-[13px]">
                Bagaimana Kami Bekerja
              </Typography>
              <Typography variant="h2" className="text-[#002D5A] mb-4 font-serif leading-tight">
                Proses <em className="italic text-[#004A8F] font-light">Penerbitan</em>
              </Typography>
              <Typography variant="description" className="text-[#002D5A]/75 m-0 text-[15px] leading-relaxed max-w-md">
                Sistem penerbitan modern kami dirancang khusus agar naskah impian Anda dapat segera dinikmati pembaca melalui alur yang transparan.
              </Typography>
            </motion.div>
            
            {/* The Flowchart Area */}
            <div className="relative w-full mt-4">
              {/* Bleeding Background */}
              <div className="absolute -top-12 -bottom-20 -right-[50vw] -left-[40vw] bg-[#004A8F]/[0.02] border border-[#004A8F]/10 rounded-l-[3rem] -z-10 hidden lg:block overflow-hidden shadow-sm">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L22 18L40 20L22 22L20 40L18 22L0 20L18 18Z' fill='%23EF7A08' fill-opacity='1'/%3E%3C/svg%3E")`, backgroundSize: '30px 30px' }} />
              </div>
              {/* Mobile background */}
              <div className="absolute -inset-6 bg-[#004A8F]/[0.02] border border-[#004A8F]/10 rounded-3xl -z-10 lg:hidden overflow-hidden shadow-sm">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L22 18L40 20L22 22L20 40L18 22L0 20L18 18Z' fill='%23EF7A08' fill-opacity='1'/%3E%3C/svg%3E")`, backgroundSize: '30px 30px' }} />
              </div>
              
              {/* Workflow Canvas */}
              <div className="relative w-[360px] h-[560px] mx-auto lg:mx-0 -ml-4 lg:-ml-0 origin-top-left scale-[0.85] sm:scale-100">
                {/* Connecting SVG Path (The "Snake" Line) */}
                <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 360 560" overflow="visible">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="
                      M 290 60 
                      L 290 80 Q 290 95 275 95 
                      L 185 95 Q 170 95 170 110 
                      L 170 120
                      
                      M 170 180
                      L 170 200 Q 170 210 160 210
                      L 160 210 Q 150 210 150 220
                      L 150 240

                      M 150 300
                      L 150 320 Q 150 330 160 330
                      L 160 330 Q 170 330 170 340
                      L 170 360

                      M 170 420
                      L 170 440 Q 170 450 155 450
                      L 125 450 Q 110 450 110 460
                      L 110 480
                    "
                    fill="none" 
                    stroke="#004A8F" 
                    strokeWidth="2.5" 
                    strokeOpacity="0.4" 
                  />
                </svg>

                {landingData.publishingProcess.map((step, index) => {
                  const iconsList = [FileText, Search, PenTool, Layout, Rocket];
                  const Icon = iconsList[index];
                  const pos = nodes[index];
                  
                  return (
                    <motion.div 
                      key={step.step}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.2 }}
                      className="absolute"
                      style={{ left: pos.x, top: pos.y }}
                    >
                      {/* Tines-style Workflow Node */}
                      <div className="flex items-center gap-3.5 bg-white px-3.5 py-3 rounded-[14px] border border-[#004A8F]/30 shadow-[0_4px_20px_rgba(0,0,0,0.03)] w-[220px]">
                        <div className="w-[34px] h-[34px] rounded-lg bg-slate-50 flex items-center justify-center border border-[#004A8F]/20 flex-shrink-0">
                          <Icon className="w-4 h-4 text-[#004A8F]" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-[10px] font-bold text-[#004A8F] uppercase tracking-wider leading-none mb-1">
                            {step.title}
                          </span>
                          <span className="text-[12px] font-medium text-[#002D5A]/80 leading-[1.3] line-clamp-2">
                            {step.description}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
