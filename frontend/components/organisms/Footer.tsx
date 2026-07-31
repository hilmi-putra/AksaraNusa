import React from "react";
import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { ArrowRight, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-cream border-t border-slate-200/60 text-[#002D5A] pt-20 pb-10 md:pt-28 md:pb-12 relative overflow-hidden">
      <Container className="relative z-10 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-12">
          
          {/* Left Column */}
          <div className="w-full lg:w-5/12 flex flex-col justify-between h-full min-h-[250px]">
            <div>
              {/* Premium Floating Badges (Editorial Style) */}
              <div className="relative h-36 w-full max-w-[340px] mb-10 select-none">
                {/* Pill 1 */}
                <div className="absolute top-2 left-0 border border-[#004A8F]/20 text-[#004A8F] rounded-full px-5 py-2 text-sm font-semibold tracking-wide uppercase bg-white shadow-sm -rotate-3 hover:rotate-0 transition-transform duration-500">
                  Penerbit
                </div>
                {/* Pill 2 */}
                <div className="absolute top-12 left-16 bg-[#004A8F]/5 border border-[#004A8F]/10 text-[#002D5A] rounded-full px-6 py-2.5 text-xl font-serif font-bold rotate-2 hover:rotate-0 transition-transform duration-500 backdrop-blur-sm">
                  Nusantara
                </div>
                {/* Pill 3 (Accent) */}
                <div className="absolute top-24 left-6 bg-[#EF7A08] text-white rounded-full px-7 py-2.5 text-lg font-bold -rotate-2 hover:rotate-0 transition-transform duration-500 shadow-[0_10px_20px_rgba(239,122,8,0.25)] border border-[#EF7A08]/50">
                  Terpercaya
                </div>
                {/* Small star accent */}
                <div className="absolute top-16 left-[280px] w-8 h-8 flex items-center justify-center rotate-12 text-[#EF7A08] opacity-60">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.6h8l-6.4 4.7 2.4 7.6-6.4-4.7-6.4 4.7 2.4-7.6-6.4-4.7h8z"/></svg>
                </div>
              </div>

              <p className="text-[14px] md:text-[15px] leading-relaxed font-light text-slate-500 max-w-[90%] mb-10">
                Penerbit anggota IKAPI yang dipercaya ribuan penulis di seluruh nusantara. Menerbitkan berbagai genre mulai dari Fiksi, Novel, hingga Buku Ajar dan Jurnal Ilmiah dengan standar kualitas editorial terbaik.
                <br /><br />
                <strong className="text-[#002D5A] font-medium">Layanan Pelanggan:</strong> <br/>
                <span className="text-[#EF7A08] font-bold text-lg">0857-2469-3474</span>
              </p>
            </div>
            
            <div className="mt-auto pt-6">
              <img src="https://ik.imagekit.io/yqhp1cmbp/Teks%20paragraf%20Anda%201.png" alt="Aksara Nusa Logo" className="w-[160px] md:w-[180px] h-auto object-contain" />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="w-full lg:w-7/12 flex flex-col justify-between h-full min-h-[250px] lg:items-end text-left lg:text-right">
            
            <div className="flex flex-col lg:items-end w-full">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-[54px] leading-[1.05] tracking-tight mb-8 max-w-[600px] text-[#002D5A]">
                Siap Menerbitkan <em className="italic font-light text-[#EF7A08]">Karya Terbaik</em> Anda?
              </h2>
              
              <Link 
                href="/layanan" 
                className="group inline-flex items-center gap-3 bg-[#004A8F] text-white px-8 py-4 rounded-full font-medium text-[15px] shadow-[0_10px_30px_rgba(0,74,143,0.2)] hover:bg-[#002D5A] hover:shadow-[0_15px_40px_rgba(0,45,90,0.3)] transition-all duration-300 hover:-translate-y-1 mb-16 self-start lg:self-end"
              >
                <BookOpen className="w-4 h-4" />
                Mulai Konsultasi Naskah
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              {/* Links */}
              <div className="flex flex-wrap gap-x-8 gap-y-4 text-[13px] font-bold uppercase tracking-wider text-[#002D5A]/70 justify-start lg:justify-end w-full mb-12">
                <Link href="/" className="hover:text-[#EF7A08] transition-colors">Beranda</Link>
                <Link href="/bookstore" className="hover:text-[#EF7A08] transition-colors">Toko Buku</Link>
                <Link href="/layanan" className="hover:text-[#EF7A08] transition-colors">Layanan Penerbitan</Link>
                <Link href="/kontak" className="hover:text-[#EF7A08] transition-colors">Hubungi Kami</Link>
              </div>
            </div>

            <div className="border-t border-slate-100 w-full pt-6 text-[12px] font-light text-slate-400 flex flex-col lg:flex-row items-start lg:items-center justify-between mt-auto gap-4">
              <p>Dibuat dan dikelola dengan penuh dedikasi oleh <strong className="font-medium text-[#002D5A]">Aksara Nusa Nusantara</strong>.</p>
              <p>© {new Date().getFullYear()} Aksara Nusa. Seluruh hak cipta dilindungi.</p>
            </div>
          </div>
          
        </div>
      </Container>
    </footer>
  );
}
