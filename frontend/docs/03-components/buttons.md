# Buttons

## Varian

### Primary (CTA Utama)
- Bentuk pill (`rounded-full`), background `ink`, teks putih, bold.
- Ikon panah (↗) dalam lingkaran kecil kontras di ujung kanan tombol (signature dari mockup — bukan ikon inline biasa, tapi badge bulat terpisah).
- Contoh: "Ajukan Naskah", "Lihat Semua Katalog".

### Secondary (Outline)
- Pill outline, border `ink` 1.5px, teks `ink`, tanpa fill.
- Dipakai untuk aksi sekunder (mis. "Konsultasi Naskah" di section perkenalan bila ingin dibedakan dari CTA utama).

### Ghost / Text Link
- Tanpa background/border, teks `ink` dengan underline saat hover.
- Dipakai di nav atau link kecil dalam paragraf.

## Ukuran
| Size | Height | Padding X | Font |
|---|---|---|---|
| `sm` | 40px | 16px | 14px |
| `md` (default) | 48px | 24px | 15px |
| `lg` | 56px | 32px | 16px |

## State
- **Hover**: background sedikit gelap (`ink` → `ink/90%`), ikon panah bergeser 2px ke kanan (lihat `animation.md`).
- **Focus**: ring 2px `secondary-brand`, offset 2px — tidak dihilangkan demi aksesibilitas.
- **Disabled**: opacity `50%`, cursor `not-allowed`, tanpa hover effect.

## Aturan
- Setiap tombol CTA utama pada satu section maksimal 1 (hindari 2 tombol primary bersaing dalam satu view).
- Ikon panah badge hanya dipakai pada varian `primary`, tidak pada `secondary`/`ghost`.
