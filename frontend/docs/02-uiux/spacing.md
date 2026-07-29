# Spacing System

## Skala Dasar (basis 4px)
`4, 8, 12, 16, 24, 32, 48, 64, 96, 128`

| Token | Nilai | Penggunaan |
|---|---|---|
| `space-xs` | 4px | Jarak ikon-ke-teks dalam badge kecil |
| `space-sm` | 8px | Padding dalam badge/tag |
| `space-md` | 16px | Padding dalam card kecil |
| `space-lg` | 24px | Padding dalam card besar (keunggulan, showcase) |
| `space-xl` | 32px | Jarak antar elemen dalam satu section |
| `space-2xl` | 64px | Jarak antar section kecil |
| `space-3xl` | 96–128px | Jarak antar section besar (Hero → About, About → Keunggulan) |

## Aturan Layout
- Container utama: max-width `1200px`, padding horizontal `24px` (mobile) / `64–96px` (desktop) — meniru margin lega pada mockup.
- Card keunggulan (4 kartu primary-brand) memakai gap `16px` antar kartu, radius besar (`24–32px`) mengikuti bentuk rounded pada mockup.
- Galeri blob-shape: overlap antar gambar sedikit (`-8px` hingga `-16px` margin negatif) untuk kesan menyatu seperti mockup, tapi tetap dibatasi agar tidak mengganggu keterbacaan di mobile (di mobile, overlap dihilangkan → stack biasa).

## Vertical Rhythm Section (Desktop)
```
Header (sticky, height ~80px)
↓ 96px
Hero Section
↓ 96px
Perkenalan Personal
↓ 64px
Kenapa Mega Press
↓ 96px
Showcase Katalog
↓ 96px
Proses Penerbitan
↓ 64px
Footer
```
