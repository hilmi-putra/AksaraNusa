# SEO Strategy — Landing Page Aksara Nusa

Landing Page adalah halaman dengan prioritas SEO tertinggi karena menjadi pintu masuk trafik organik untuk dua audiens (calon penulis & calon pembeli).

## Rendering
- Gunakan **SSG (Static Site Generation)** untuk Landing Page karena kontennya jarang berubah (`generate` saat build, revalidate berkala via ISR bila konten katalog unggulan diperbarui).

## Metadata
- `title`: "Aksara Nusa — Penerbit Buku Ajar, Novel, hingga Jurnal Ilmiah"
- `description`: ringkas, menyebutkan 1.200+ naskah, jenis buku, dan CTA.
- Open Graph & Twitter Card lengkap (gambar hero sebagai `og:image`).
- `canonical` URL wajib diset.

## Struktur Heading
- Satu `<h1>` per halaman: judul hero ("Satu Penerbit. Ribuan Cerita Penting." — versi Aksara Nusa dari pola mockup).
- `<h2>` untuk tiap section (Tentang Kami, Kenapa Aksara Nusa, Katalog Unggulan, Bagaimana Prosesnya).
- Hindari skip level (h1 → h3 langsung).

## Structured Data (Schema.org)
- `Organization` schema di footer/head (nama, logo, kontak, sosial media).
- `BreadcrumbList` bila landing page menjadi bagian dari navigasi situs.

## Internal Linking
- CTA "Lihat Katalog" → Aksara Nusa Bookstore (`rel` normal, bukan `nofollow`, karena internal).
- Link ke Blog Aksara Nusa untuk memperkuat topical relevance seputar dunia penerbitan.

## Konten
- Semua gambar showcase katalog wajib punya `alt` deskriptif (judul buku + kategori), bukan generik "buku1.jpg".
- Teks section jangan hanya slogan — sertakan minimal 1-2 kalimat deskriptif yang mengandung kata kunci alami (mis. "Buku Ajar", "Jurnal Penelitian", "penerbit buku Indonesia").

## Checklist Sebelum Rilis
- [ ] Lighthouse SEO score > 95.
- [ ] Sitemap.xml & robots.txt menyertakan Landing Page.
- [ ] Semua gambar punya `alt`.
- [ ] Meta title/description unik (tidak duplikat dengan halaman lain).
