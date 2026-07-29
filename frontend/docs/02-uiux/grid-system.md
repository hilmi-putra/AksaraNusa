# Grid System

## Breakpoints
| Nama | Lebar |
|---|---|
| `mobile` | < 640px |
| `tablet` | 640–1024px |
| `desktop` | 1024–1440px |
| `wide` | > 1440px |

## Container
- Max-width: `1200px`, center-aligned.
- Kolom grid: 12 kolom (desktop), 6 kolom (tablet), 4 kolom (mobile).
- Gutter: `24px` (desktop), `16px` (mobile).

## Layout per Section

| Section | Grid Desktop | Grid Mobile |
|---|---|---|
| Header | Flex 3 kolom (logo \| nav \| aksi) | Flex 2 kolom (logo \| hamburger) |
| Hero | 2 kolom (headline 8/12, sub-copy+CTA 4/12) | Stack 1 kolom |
| Galeri Hero | 3 kolom sejajar, blob overlap | Carousel horizontal / stack |
| Kenapa Aksara Nusa | 2 kolom (card besar 5/12, grid 2×2 7/12) | Stack: card besar, lalu grid 2×2 tetap 2 kolom |
| Showcase Katalog | Bento grid 3 kolom (1 besar + 5 kecil) | Grid 2 kolom, urutan disederhanakan |
| Proses Penerbitan | 2 kolom (list step 6/12, sub-copy 6/12) lalu step full width | Stack 1 kolom |

## Aturan Bento-Grid Showcase
- Gunakan CSS Grid dengan `grid-template-areas` eksplisit per breakpoint agar susunan besar-kecil tetap terkendali (tidak mengandalkan `auto-fit` yang tidak presisi).
- Rasio gambar dijaga konsisten (`aspect-ratio: 3/4` untuk item vertikal, `4/3` untuk item horizontal besar).
