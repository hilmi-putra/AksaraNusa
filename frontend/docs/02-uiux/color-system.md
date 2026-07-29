# Color System

Palet diekstrak dari mockup referensi (dominan krem hangat + aksen primary-brand/oranye + hitam pekat).

## Token Warna

| Token | Hex (kira-kira) | Penggunaan |
|---|---|---|
| `--color-bg-cream` | `#EFEADD` | Background utama halaman |
| `--color-ink` | `#171512` | Teks utama, tombol CTA utama, section "Katalog Unggulan" |
| `--color-primary-brand` | `#DD6B3A` | Aksen utama — card keunggulan, highlight, hover state |
| `--color-secondary-brand` | `#B8532A` | Hover/active state dari primary-brand |
| `--color-surface-muted` | `#DAD6C9` | Card besar netral (mis. card "Keunggulan Kami") |
| `--color-surface-white` | `#FFFFFF` | Card/permukaan yang butuh kontras tinggi |
| `--color-text-muted` | `#6B6860` | Teks sekunder/caption |
| `--color-border-subtle` | `#DDD8C8` | Divider, border tipis |

## Aturan Pemakaian
- **Background utama** selalu `--color-bg-cream`, tidak putih polos, agar konsisten dengan mood hangat.
- **Terracotta** dipakai maksimal untuk 1 blok visual dominan per section (card keunggulan) — jangan dipakai berlebihan hingga terkesan norak.
- **Ink (hitam pekat)** dipakai untuk teks headline & tombol CTA utama, bukan hitam pure `#000000` (agar tidak terlalu tajam di atas krem).
- Kontras teks-ke-background wajib memenuhi WCAG AA (lihat `accessibility.md`) — kombinasi ink-on-cream dan white-on-primary-brand sudah AA-safe.

## Dark Elements
Beberapa blok sengaja gelap pekat (`--color-ink`) untuk kontras dramatis, meniru card "Мои работы" & step aktif pada mockup:
- Card judul grid katalog.
- Step aktif pada "Proses Penerbitan".

## Contoh Tailwind Config
```js
colors: {
  cream: "#EFEADD",
  ink: "#171512",
  primary-brand: {
    DEFAULT: "#DD6B3A",
    dark: "#B8532A",
  },
  muted: "#DAD6C9",
  "text-muted": "#6B6860",
  border: "#DDD8C8",
}
```
