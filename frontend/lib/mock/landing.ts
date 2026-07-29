import { LandingData } from "@/types/landing";

export const landingData: LandingData = {
  heroContent: {
    headline: "Satu Penerbit.\nRibuan Cerita Penting.",
    subcopy: "Naskah berkualitas dengan sentuhan personal.\nProses transparan, hasil maksimal.",
    ctaText: "Ajukan Naskah",
    images: [
      "/images/hero-1.jpg",
      "/images/hero-2.jpg",
      "/images/hero-3.jpg",
    ],
  },
  aboutIntro: {
    paragraph: "Halo! Kami Mega Press, dan kami penerbit. Bersama kami, Anda mendapatkan kesempatan untuk mewujudkan naskah menjadi karya berkualitas dan menyebarkannya ke pembaca secara luas.",
    highlights: ["penerbit", "karya berkualitas"],
    ctaText: "Konsultasi Naskah",
  },
  advantages: [
    {
      title: "Review Cepat",
      description: "Proses review naskah yang cepat dan transparan",
      icon: "FileText",
    },
    {
      title: "Desain Profesional",
      description: "Desain sampul & tata letak yang menarik",
      icon: "Palette",
    },
    {
      title: "Distribusi Luas",
      description: "Tersedia di Mega Bookstore dan mitra",
      icon: "Store",
    },
    {
      title: "Pendampingan Penuh",
      description: "Kami mendampingi penulis dari awal hingga terbit",
      icon: "MessageCircle",
    },
  ],
  catalogShowcase: [
    {
      id: "book-1",
      title: "Metode Penelitian Modern",
      category: "Buku Ajar",
      coverImage: "/images/book-1.jpg",
      size: "large",
    },
    {
      id: "book-2",
      title: "Kisah di Ujung Waktu",
      category: "Novel",
      coverImage: "/images/book-2.jpg",
      size: "small",
    },
    {
      id: "book-3",
      title: "Pengantar Algoritma",
      category: "Buku Referensi",
      coverImage: "/images/book-3.jpg",
      size: "small",
    },
    {
      id: "book-4",
      title: "Dinamika Sosial 2024",
      category: "Proceeding",
      coverImage: "/images/book-4.jpg",
      size: "small",
    },
  ],
  processSteps: [
    {
      number: "01",
      title: "Pengajuan Naskah & Diskusi Konsep",
      description: "Kirim naskah Anda, dan mari berdiskusi untuk menentukan format, target pembaca, dan nuansa buku.",
    },
    {
      number: "02",
      title: "Review, Editing & Desain",
      description: "Tim ahli kami akan mereview, menyunting, dan merancang sampul serta tata letak agar sesuai standar.",
      image: "/images/step-2.jpg",
    },
    {
      number: "03",
      title: "Cetak/Produksi E-book & Distribusi",
      description: "Buku Anda dicetak atau diterbitkan sebagai e-book, dan siap didistribusikan ke jaringan kami.",
    },
  ],
};
