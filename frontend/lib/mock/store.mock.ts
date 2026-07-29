import { Book } from "@/types/book";
import { CategoryCardProps } from "@/components/molecules/CategoryCard";

export const storeMockData = {
  heroBanner: {
    title: "Eksplorasi Dunia Tanpa Batas Melalui Buku",
    subtitle: "Dapatkan diskon hingga 50% untuk koleksi bestseller bulan ini.",
    imageUrl: "https://placehold.co/1200x600/DAD6C9/171512?text=Bazar+Buku+Mega+Press",
    ctaText: "Belanja Sekarang",
    ctaLink: "/bookstore/promo",
  },
  categories: [
    { id: "fiksi", name: "Fiksi", description: "Novel, Kumcer, dan Sastra", imageUrl: "https://placehold.co/600x400/EFEADD/171512?text=Fiksi" },
    { id: "non-fiksi", name: "Non Fiksi", description: "Esai, Biografi, dan Sejarah", imageUrl: "https://placehold.co/600x400/EFEADD/171512?text=Non+Fiksi" },
    { id: "pengembangan-diri", name: "Pengembangan Diri", description: "Motivasi dan Produktivitas", imageUrl: "https://placehold.co/600x400/EFEADD/171512?text=Self+Improvement" },
    { id: "bisnis", name: "Bisnis & Keuangan", description: "Strategi dan Investasi", imageUrl: "https://placehold.co/600x400/EFEADD/171512?text=Bisnis" },
  ] as CategoryCardProps[],
  books: [
    { id: "b1", title: "Menari di Atas Awan", author: "Lestari", price: 85000, coverUrl: "https://megapress.co.id/wp-content/uploads/2024/04/cover-1.png", category: "Fiksi", stock: 12, isNew: true },
    { id: "b2", title: "Seni Berpikir Positif", author: "Dr. Budi", price: 99000, coverUrl: "https://megapress.co.id/wp-content/uploads/2024/04/cover-3.png", category: "Pengembangan Diri", stock: 45, isBestseller: true },
    { id: "b3", title: "Sejarah Rempah Nusantara", author: "Ahmad Sejarawan", price: 125000, originalPrice: 150000, coverUrl: "https://megapress.co.id/wp-content/uploads/2024/04/cover-5.png", category: "Non Fiksi", stock: 8 },
    { id: "b4", title: "Startup 101", author: "Rizal Tech", price: 110000, coverUrl: "https://megapress.co.id/wp-content/uploads/2024/04/cover-4.png", category: "Bisnis", stock: 30, isNew: true },
    { id: "b5", title: "Puisi Malam Hujan", author: "Senja Kata", price: 65000, coverUrl: "https://megapress.co.id/wp-content/uploads/2024/04/cover-1.png", category: "Fiksi", stock: 0 },
    { id: "b6", title: "Investasi Saham Pemula", author: "Susi Investor", price: 105000, coverUrl: "https://megapress.co.id/wp-content/uploads/2024/04/cover-3.png", category: "Bisnis", stock: 25, isBestseller: true },
    { id: "b7", title: "Berdamai dengan Diri", author: "Psikolog Ana", price: 89000, coverUrl: "https://megapress.co.id/wp-content/uploads/2024/04/cover-5.png", category: "Pengembangan Diri", stock: 100 },
    { id: "b8", title: "Biografi Pahlawan Tak Dikenal", author: "Tim Sejarah", price: 140000, coverUrl: "https://megapress.co.id/wp-content/uploads/2024/04/cover-4.png", category: "Non Fiksi", stock: 5 },
  ] as Book[],
};
