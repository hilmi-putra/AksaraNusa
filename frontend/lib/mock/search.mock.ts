export interface SearchResult {
  id: string;
  type: "book" | "author" | "article" | "service";
  title: string;
  description: string;
  category?: string;
  url: string;
}

export const recentSearches = [
  "Cara Menerbitkan Buku",
  "Royalti Penulis",
  "Biaya Cetak Buku",
];

export const popularSearches = [
  "Fiksi Fantasi",
  "Puisi",
  "Syarat Naskah",
  "Paket Penerbitan",
  "Distribusi Toko Buku",
];

export const mockSearchResults: SearchResult[] = [
  {
    id: "b1",
    type: "book",
    title: "Merajut Senja di Ujung Waktu",
    description: "Novel fiksi romantis dengan latar belakang sejarah.",
    category: "Fiksi",
    url: "/bookstore/merajut-senja",
  },
  {
    id: "b2",
    type: "book",
    title: "Senja dan Kopi",
    description: "Kumpulan puisi tentang senja dan secangkir kopi.",
    category: "Puisi",
    url: "/bookstore/senja-dan-kopi",
  },
  {
    id: "a1",
    type: "author",
    title: "Ahmad Rizky",
    description: "Penulis novel fiksi populer.",
    url: "/author/ahmad-rizky",
  },
  {
    id: "c1",
    type: "service",
    title: "Paket Penerbitan Premium",
    description: "Layanan penerbitan lengkap mulai dari editing hingga distribusi.",
    url: "/layanan",
  },
  {
    id: "d1",
    type: "article",
    title: "Panduan Menulis Naskah yang Baik",
    description: "Tips dan trik menulis naskah yang menarik penerbit.",
    category: "Blog",
    url: "/blog/panduan-menulis",
  },
  {
    id: "d2",
    type: "article",
    title: "Bagaimana Sistem Royalti Aksara Nusa Bekerja?",
    description: "Penjelasan lengkap mengenai perhitungan dan pembagian royalti.",
    category: "FAQ",
    url: "/faq/sistem-royalti",
  },
];
