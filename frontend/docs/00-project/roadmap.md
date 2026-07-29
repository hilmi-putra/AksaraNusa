# Roadmap — Frontend (Fase Landing Page)

Roadmap besar mengikuti Architecture Blueprint v2.0 (Frontend-First). Dokumen ini merinci roadmap tersebut khusus untuk ruang lingkup **Landing Page Aksara Nusa**, sebagai prioritas pertama.

## Posisi dalam Roadmap Besar

| Tahap Besar | Status |
|---|---|
| 1. Frontend Foundation | 🔵 Sedang berjalan |
| 2. UI/UX Completion | 🔵 Sedang berjalan (Landing Page difokuskan dulu) |
| 3. Mock Data Implementation | ⚪ Berikutnya |
| 4. Component Standardization | ⚪ Berikutnya |
| 5. Frontend Testing | ⚪ Belum |
| 6. API Integration | ⚪ Belum |
| 7. Backend Development | ⚪ Belum |
| 8. End-to-End Testing | ⚪ Belum |
| 9. Production Deployment | ⚪ Belum |

## Rincian Fase Landing Page

### Sprint 1 — Foundation & Design Token
- Setup Next.js App Router, Tailwind config, folder `styles/` (design token dari `02-uiux`).
- Import font, warna, spacing sesuai `color-system.md` & `typography.md`.
- Setup layout dasar: `PublicLayout` (header/nav + footer).

### Sprint 2 — Hero & Navigasi
- Build `Header` (logo, nav menu, tombol kontak) — lihat `03-components/navigation.md`.
- Build `Hero Section` (judul besar, sub-copy, CTA "Ajukan Naskah").
- Build galeri blob-shape untuk showcase buku terbitan (menggantikan galeri foto pada mockup referensi).

### Sprint 3 — Konten Personal & Keunggulan
- Section "Tentang Aksara Nusa" (perkenalan singkat, nada personal).
- Section "Kenapa Aksara Nusa" — 4 card keunggulan (mengikuti pola 4 kartu oranye pada mockup).

### Sprint 4 — Showcase Katalog
- Grid showcase katalog unggulan (bento-grid, mengikuti pola "Мои работы").
- CTA menuju Aksara Nusa Bookstore.

### Sprint 5 — Proses Kerja Sama & Footer
- Section "Bagaimana Prosesnya" — numbered steps (mengikuti pola "Как проходит съёмка").
- Footer lengkap: kontak, sosial media, link legal.

### Sprint 6 — Mock Data & Responsive Pass
- Seluruh konten memakai mock data terstruktur (`lib/mock/`).
- Uji responsive di breakpoint mobile/tablet/desktop (`responsive.md`).

## Definition of Done (Fase Landing Page)
- [ ] Semua section pada `01-prd/landing-page.md` selesai secara visual.
- [ ] Design token 100% dipakai (tidak ada hardcoded hex/spacing di komponen).
- [ ] Lighthouse Performance & SEO score > 90 (mock/local build).
- [ ] Review UI/UX & Project Manager disetujui sebelum lanjut ke Bookstore.
