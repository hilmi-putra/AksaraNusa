# Organisms

Section besar yang menggabungkan banyak molecules/atoms, biasanya satu organism = satu section penuh di halaman.

## Daftar Organisms (Landing Page)

### `Header`
- Terdiri dari: Logo, `NavLink[]`, `ContactQuickAction[]`, hamburger (mobile).
- Sticky top, background `cream` dengan sedikit blur/shadow saat scroll.

### `HeroSection`
- Headline, sub-copy, `Button` CTA utama, 3× `GalleryBlobImage`.
- Data dari `landing.mock.ts → heroContent`.

### `AboutIntroSection`
- Paragraf besar perkenalan personal Aksara Nusa + `Button` CTA sekunder.

### `WhyAksaraNusaSection`
- Card besar judul "Keunggulan Kami" (kiri) + grid 2×2 `AdvantageCard` (kanan).
- Data: `advantages[]`.

### `CatalogShowcaseSection`
- Badge judul + grid bento `CatalogItemCard[]` + CTA "Lihat Semua Katalog".
- Data: `catalogShowcase[]`.

### `ProcessStepsSection`
- Judul + sub-copy + list `ProcessStepItem[]` (dengan 1 step ditandai `active`).
- Data: `processSteps[]`.

### `Footer`
- Kontak, sosial media, link legal, copyright.

## Aturan Komposisi
- Setiap organism di atas berada di `features/landing/` (lihat `folder-structure.md`), dipanggil berurutan dari `app/(public)/page.tsx`.
- Organism boleh Server Component kecuali butuh interaktivitas (mis. hamburger menu di `Header` → bagian togglenya jadi Client Component kecil terpisah).
