# PRD — Landing Page Aksara Nusa

## Ringkasan
Landing Page adalah halaman utama Aksara Nusa: media branding, promosi layanan penerbitan, dan pengarah trafik ke Aksara Nusa Bookstore. Struktur & nuansa mengikuti referensi mockup fotografer (personal, hangat, storytelling), diadaptasi ke konteks penerbit buku.

## Audiens
1. **Calon penulis** — ingin menerbitkan naskah (Buku Ajar, Referensi, Novel, dll).
2. **Calon pembeli** — ingin membeli buku terbitan Aksara Nusa.
3. **Institusi/kampus** — mencari mitra penerbitan Jurnal/Proceeding.

## Struktur Halaman (Section by Section)

### 1. Header / Navigasi
- Logo + nama "Aksara Nusa" (kiri).
- Menu: *Tentang Kami, Katalog, Layanan, Cara Kerja* (tengah/kanan) — adaptasi dari menu mockup (*Обо мне, Портфолио, Этапы, Услуги*).
- Ikon kontak cepat (WhatsApp/Email) di ujung kanan — mengikuti pola 2 ikon bulat pada mockup.
- Sticky di top saat scroll.

### 2. Hero Section
- Headline besar 2 baris, bold: **"Satu Penerbit. Ribuan Cerita Penting."** (adaptasi dari *"Один фотограф. Сотни важных историй."*).
- Sub-copy kecil di kanan atas headline: kalimat singkat nilai jual (2 baris, mengikuti pola *"Живые кадры с настроением..."*).
- Tombol CTA pill hitam **"Ajukan Naskah"** dengan ikon panah bulat di kanan (pola tombol mockup).
- Di bawah headline: galeri showcase 3-4 foto/buku dengan bentuk **blob/organic merge** (bukan kotak lurus) — representasi buku-buku unggulan/behind-the-scene penerbitan.

### 3. Perkenalan Personal
- Paragraf tengah, font besar, nada personal: **"Halo! Kami Aksara Nusa, dan kami penerbit."** dilanjut kalimat tentang misi menghadirkan naskah berkualitas ke pembaca (adaptasi dari paragraf perkenalan fotografer).
- Highlight kata kunci dengan badge bulat kecil (seperti emoji ☀️ dan 🙂 pada referensi) — diganti ikon buku/pena.
- CTA pill kecil di bawah paragraf: **"Konsultasi Naskah"**.

### 4. Kenapa Aksara Nusa (Preimushestva/Keunggulan)
- Layout 2 kolom: kiri card besar abu-abu judul **"Keunggulan Kami"** + panah; kanan grid 2×2 card oranye (primary-brand) berisi 4 poin keunggulan, masing-masing dengan ikon bulat:
  1. Proses review naskah cepat & transparan (ikon dokumen).
  2. Desain sampul & tata letak profesional (ikon palet/kuas).
  3. Distribusi ke Aksara Nusa Bookstore & mitra toko buku (ikon lokasi/toko).
  4. Pendampingan penulis dari awal hingga terbit (ikon chat).

### 5. Showcase Katalog Unggulan ("Мои работы" → "Katalog Unggulan")
- Judul section dengan badge bulat kecil (ikon buku) di card hitam pojok kiri atas grid.
- Bento-grid galeri (3 kolom, ukuran campuran: 1 besar + beberapa kecil) menampilkan cover buku unggulan dari berbagai kategori (Novel, Buku Ajar, Biografi, dll).
- CTA di akhir grid: **"Lihat Semua Katalog →"** menuju Aksara Nusa Bookstore.

### 6. Bagaimana Prosesnya ("Как проходит съёмка" → "Proses Penerbitan")
- Judul + sub-copy kanan (2 baris) seperti mockup.
- List numbered step (01, 02, 03...) dengan garis vertikal penghubung:
  1. Pengajuan Naskah & Diskusi Konsep.
  2. Review, Editing & Desain.
  3. Cetak/Produksi E-book & Distribusi.
- Step aktif (nomor 02 pada mockup) ditonjolkan dengan card gelap + foto ilustrasi blob kecil di kanan.

### 7. Footer
- Kontak, sosial media, link legal, newsletter singkat (opsional), copyright.

## Konten Mock Data yang Dibutuhkan
Lihat `types/landing.ts` & `lib/mock/landing.ts`:
- `heroContent` (headline, subcopy, cta)
- `aboutIntro` (paragraf, highlight terms)
- `advantages[]` (4 item: title, icon, description)
- `catalogShowcase[]` (judul buku, kategori, cover image, ukuran grid)
- `processSteps[]` (nomor, judul, deskripsi, gambar opsional)

## Out of Scope
- Form pengajuan naskah fungsional (baru form UI statis; validasi & submit menyusul di fase API Integration).
- Halaman Katalog/Detail Produk penuh (dokumen terpisah, di luar fokus saat ini).

## Acceptance Criteria
- [ ] Seluruh 7 section di atas tersedia sesuai urutan.
- [ ] Semua data section berasal dari mock, tidak hardcode di JSX komponen.
- [ ] Responsive penuh (mobile, tablet, desktop) — lihat `responsive.md`.
- [ ] Lolos checklist SEO & Performance dasar (`seo.md`, `performance.md`).
