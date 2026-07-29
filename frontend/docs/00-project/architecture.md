# Frontend Architecture — Ringkasan

> Detail lengkap arsitektur sistem ada di dokumen utama *B2D Enterprise E-Commerce Architecture Blueprint v2.0*. Dokumen ini merangkum bagian yang relevan untuk kerja frontend sehari-hari.

## Stack (Final — Tidak Ada Alternatif)
- **Next.js (App Router)** — seluruh halaman publik: Landing Page Aksara Nusa, Blog, Katalog, Detail Produk, Search. Rendering SSR/SSG untuk SEO.
- **Laravel Inertia.js + React** — Customer Dashboard & Admin Panel (repo backend, bukan bagian dari repo frontend ini).
- **Laravel 12 REST API** — satu-satunya sumber data (single source of truth). Frontend tidak pernah bicara langsung ke database.

## Posisi Landing Page dalam Arsitektur
```
Client (Browser)
   │
   ▼
Next.js Frontend  ──REST API (JSON)──▶  Laravel 12 API  ──▶ Database / Storage
   │
   └─ Landing Page Aksara Nusa  ← fase saat ini (mock data, belum terhubung API)
```

Selama fase Landing Page, seluruh data (daftar keunggulan, katalog unggulan, testimoni) berasal dari **mock data lokal** di `lib/mock/`, bukan dari Laravel API. Kontrak data (shape/interface) tetap dirancang sesuai `types/` agar saat fase *API Integration* nanti, hanya perlu mengganti data source tanpa mengubah komponen.

## Prinsip Arsitektur Frontend
1. **Server Components by default** — halaman publik memakai React Server Component Next.js untuk performa & SEO; interaktivitas kecil (form, carousel) dibuat Client Component eksplisit (`"use client"`).
2. **Feature-first, bukan page-first** — logic per fitur (hero, showcase, proses) hidup di `features/landing/`, dipanggil dari `app/page.tsx`.
3. **Design token sebagai kontrak visual** — semua warna/spacing/font harus melalui `styles/tokens.ts` & Tailwind config, tidak hardcoded.
4. **Mock-first development** — struktur data mock dibuat semirip mungkin dengan kontrak API masa depan (lihat `types/`).

## Ketergantungan Antar Dokumen
- Struktur folder detail → `folder-structure.md`
- Aturan penulisan kode → `coding-standard.md`
- Target performa → `performance.md`
- Strategi SEO Landing Page → `seo.md`
