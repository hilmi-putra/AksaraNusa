# Performance & SEO Guidelines

## Performance (Web Vitals)
- **LCP (Largest Contentful Paint)**: Harus di bawah 2.5 detik. Optimalkan hero image (gunakan format WebP/AVIF, `<Image priority />` dari `next/image`).
- **FID/INP (Interaction to Next Paint)**: Harus di bawah 200ms. Hindari long-blocking JavaScript tasks, gunakan *React concurrent features*, dan *code splitting*.
- **CLS (Cumulative Layout Shift)**: Harus di bawah 0.1. Selalu berikan width & height eksplisit untuk gambar dan hindari memuat elemen secara dinamis tanpa skeleton/placeholder yang memiliki dimensi tetap.

## SEO (Search Engine Optimization)
- **Meta Tags**: Setiap halaman utama harus memiliki meta title, meta description, dan Open Graph (OG) image. Gunakan fitur Metadata Next.js 15+ App Router.
- **Semantic HTML**: Gunakan tag HTML5 yang tepat (`<header>`, `<main>`, `<article>`, `<nav>`, `<footer>`) daripada sekadar `<div>`.
- **Heading Structure**: Hanya gunakan satu `<h1>` per halaman. Ikuti hierarki heading secara berurutan (h2, h3).
- **URL Structure**: Gunakan slug yang bersih dan deskriptif. (Contoh: `/bookstore/judul-buku-yang-menarik`).
- **Sitemap & Robots.txt**: Konfigurasikan sitemap dinamis dan `robots.txt` yang sesuai sebelum produksi.
- **Accessibility**: (Membantu SEO). Selalu sertakan tag `alt` pada gambar dan aria-labels pada elemen interaktif yang tidak memiliki teks visual (mis. ikon tombol).
