# Animation & Transition

## Prinsip
Animasi bersifat halus & fungsional — menegaskan hierarki (scroll reveal), bukan dekorasi berlebihan yang mengganggu performa/SEO.

## Jenis Animasi

| Elemen | Animasi | Durasi/Easing |
|---|---|---|
| Section masuk saat scroll | Fade + translateY(16px → 0) | 400ms, `ease-out` |
| Card keunggulan (hover, desktop) | Scale 1 → 1.02, shadow naik sedikit | 200ms, `ease` |
| Tombol CTA (hover) | Background sedikit gelap + ikon panah bergeser 2px kanan | 150ms |
| Galeri blob hero | Tidak animasi masuk berlebihan — cukup fade-in bertahap (stagger 80ms) | 400ms |
| Numbered step aktif | Highlight background muncul dengan fade saat step masuk viewport | 300ms |

## Implementasi
- Gunakan CSS transition/`transform`/`opacity` saja (GPU-friendly) — hindari animasi `width`, `height`, `top/left` yang memicu reflow (lihat `performance.md`).
- Scroll-reveal via `IntersectionObserver` (hook `useScrollReveal`), bukan library animasi berat kecuali benar-benar dibutuhkan.
- Hormati `prefers-reduced-motion`: jika aktif, semua transisi masuk section dihilangkan (langsung tampil).

## Larangan
- Tidak ada parallax kompleks pada fase ini (menambah kompleksitas & risiko CLS).
- Tidak ada auto-playing carousel tanpa kontrol pause di galeri hero.
