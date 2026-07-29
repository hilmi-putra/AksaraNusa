export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  content?: string;
  isHero?: boolean;
}

export const blogMockData = {
  categories: ["Home", "News", "Tutorials", "Author Tips", "Publishing", "Series", "Guides", "All articles"],
  
  heroPost: {
    id: "hero-1",
    slug: "strategi-pemasaran-buku-era-digital",
    title: "Strategi Pemasaran Buku di Era Digital: Membangun Audiens Sebelum Buku Terbit",
    excerpt: "Di era digital saat ini, 86% penulis sukses sepakat bahwa membangun audiens sebelum buku terbit adalah kunci utama. Pelajari bagaimana alur kerja cerdas dan pemanfaatan platform digital dapat mengurangi beban promosi manual sekaligus meningkatkan penjualan.",
    category: "Author Tips",
    coverImage: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Budi Santoso",
      avatar: "https://i.pravatar.cc/150?u=budi",
      role: "Head of Digital Marketing, Mega Press"
    },
    publishedAt: "February 24, 2026",
    readTime: "7 min read",
    isHero: true,
    content: `
      <p>Pemasaran buku telah berubah drastis dalam satu dekade terakhir. Jika dulu penulis bergantung sepenuhnya pada penerbit untuk melakukan promosi, kini penulis memiliki kendali penuh atas bagaimana buku mereka dipasarkan.</p>
      
      <h2>Pentingnya Membangun Komunitas</h2>
      <p>Membangun komunitas pembaca jauh hari sebelum buku terbit adalah strategi terbaik. Dengan memiliki audiens yang setia, Anda menciptakan pasar yang sudah menantikan karya Anda.</p>
      
      <blockquote>
        "Buku terbaik sekalipun tidak akan terjual jika tidak ada yang tahu bahwa buku itu ada. Pemasaran adalah jembatan antara karya Anda dan pembaca."
      </blockquote>
      
      <h3>Langkah Praktis Memulai</h3>
      <ul>
        <li>Buatlah website penulis profesional.</li>
        <li>Kumpulkan daftar email (newsletter) sejak hari pertama.</li>
        <li>Bagikan cuplikan atau behind-the-scene proses penulisan di media sosial.</li>
      </ul>
      
      <p>Dengan strategi yang tepat, peluncuran buku Anda tidak akan menjadi momen yang menegangkan, melainkan sebuah perayaan bersama komunitas yang telah Anda bangun.</p>
    `
  },
  
  latestArticles: [
    {
      id: "latest-1",
      slug: "cara-mengatasi-writers-block",
      title: "Cara Efektif Mengatasi Writer's Block dalam 7 Hari",
      excerpt: "Mengalami kebuntuan menulis adalah hal biasa. Berikut panduan praktis dari penulis terlaris kami untuk kembali produktif.",
      category: "Guides",
      coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&w=600&q=80",
      author: {
        name: "Siti Aminah",
        avatar: "https://i.pravatar.cc/150?u=siti",
        role: "Senior Editor"
      },
      publishedAt: "February 20, 2026",
      readTime: "5 min read",
    },
    {
      id: "latest-2",
      slug: "panduan-self-publishing-pemula",
      title: "Panduan Lengkap Self-Publishing untuk Penulis Pemula",
      excerpt: "Mulai dari penyuntingan hingga distribusi, ini semua yang perlu Anda ketahui sebelum menerbitkan buku secara mandiri.",
      category: "Tutorials",
      coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80",
      author: {
        name: "Andi Wijaya",
        avatar: "https://i.pravatar.cc/150?u=andi",
        role: "Publishing Consultant"
      },
      publishedAt: "February 18, 2026",
      readTime: "10 min read",
    },
    {
      id: "latest-3",
      slug: "tren-desain-cover-buku-2026",
      title: "Tren Desain Sampul Buku Paling Menarik di Tahun 2026",
      excerpt: "Minimalis, tipografi ekspresif, dan ilustrasi digital mendominasi desain sampul tahun ini. Intip inspirasinya di sini.",
      category: "News",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
      author: {
        name: "Maya Sari",
        avatar: "https://i.pravatar.cc/150?u=maya",
        role: "Art Director"
      },
      publishedAt: "February 15, 2026",
      readTime: "4 min read",
    }
  ],

  popularArticles: [
    {
      id: "pop-1",
      slug: "tips-menulis-dialog",
      title: "Membuat Dialog Fiksi yang Terdengar Nyata dan Natural",
      excerpt: "Dialog yang kaku dapat merusak imersi pembaca. Pelajari teknik membuat percakapan karakter yang hidup.",
      category: "Guides",
      coverImage: "https://images.unsplash.com/photo-1522881451255-f59ad836fdf8?auto=format&fit=crop&w=600&q=80",
      author: { name: "Siti Aminah", avatar: "https://i.pravatar.cc/150?u=siti", role: "Senior Editor" },
      publishedAt: "January 10, 2026",
      readTime: "6 min read",
    },
    {
      id: "pop-2",
      slug: "membangun-dunia-fantasi",
      title: "World-Building 101: Menciptakan Semesta Fantasi yang Logis",
      excerpt: "Cara merancang sistem sihir, geografi, dan budaya untuk novel fantasi Anda agar terasa masuk akal.",
      category: "Series",
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
      author: { name: "Andi Wijaya", avatar: "https://i.pravatar.cc/150?u=andi", role: "Publishing Consultant" },
      publishedAt: "January 5, 2026",
      readTime: "8 min read",
    }
  ]
};
