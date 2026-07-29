# Accessibility Standard — Landing Page

Target minimum: **WCAG 2.1 Level AA**.

## Kontras Warna
| Kombinasi | Rasio Kontras | Status |
|---|---|---|
| `ink (#171512)` di atas `cream (#EFEADD)` | ~14.8:1 | ✅ AAA |
| `white` di atas `primary-brand (#DD6B3A)` | ~3.1:1 | ⚠️ Cukup untuk teks besar/bold (≥18px bold), gunakan `secondary-brand` untuk teks kecil |
| `text-muted (#6B6860)` di atas `cream` | ~4.6:1 | ✅ AA (teks normal) |

## Navigasi Keyboard
- Semua elemen interaktif (nav link, CTA, badge kontak, card yang clickable) dapat dijangkau via `Tab` dengan urutan logis (kiri-ke-kanan, atas-ke-bawah).
- Focus state terlihat jelas (outline 2px warna `secondary-brand`, bukan dihilangkan dengan `outline: none` tanpa pengganti).

## Semantic HTML
- Gunakan `<nav>`, `<header>`, `<main>`, `<section>`, `<footer>` sesuai fungsi — jangan `<div>` semua.
- Heading berurutan (`h1` → `h2` → `h3`), tidak ada lompatan level (lihat `seo.md`).
- Numbered step process memakai `<ol>` bukan `<div>` biasa, agar screen reader membacakan urutannya.

## Gambar & Media
- Semua `<img>`/`next/image` wajib `alt` deskriptif.
- Galeri blob-shape dekoratif murni (tanpa informasi penting) boleh `alt=""` (bukan dihilangkan atributnya).

## Form (jika ada form kontak/naskah statis)
- Setiap input punya `<label>` terhubung (`htmlFor`), bukan hanya `placeholder`.
- Pesan error/validasi (fase mendatang) harus terhubung via `aria-describedby`.

## Reduced Motion
- Hormati `prefers-reduced-motion: reduce` — matikan animasi scroll-reveal & hover-scale (lihat `animation.md`).
