# Atoms

Komponen terkecil, tidak bisa dipecah lagi, tanpa logic bisnis.

## Daftar Atoms (Landing Page)

### `Button`
- Varian: `primary` (pill ink/hitam, teks putih, ikon panah bulat kanan), `secondary` (pill outline), `ghost` (teks saja + ikon).
- Props: `variant`, `size` (`sm`/`md`), `withArrow?: boolean`, `href?`, `onClick?`.
- Radius penuh (`rounded-full`), padding `16px 24px`.

### `IconBadge`
- Lingkaran solid berisi 1 ikon (lihat `iconography.md`).
- Props: `icon`, `bg` (`ink` | `primary-brand` | `cream`), `size` (`sm 36px` / `md 44px`).

### `Tag` / `Badge Teks`
- Label kecil pill (mis. kategori buku di showcase katalog).
- Props: `label`, `tone` (`primary-brand` | `muted`).

### `SectionEyebrow`
- Teks kecil di atas judul section (mis. label kategori sebelum `<h2>`).

### `NumberBadge`
- Lingkaran berisi angka (01, 02, 03) untuk numbered step.
- Props: `number`, `active: boolean` (mengubah dari outline → solid ink saat aktif).

## Aturan
- Atoms **tidak** melakukan fetch data atau menyimpan state kompleks.
- Semua styling atoms wajib pakai token dari `styles/tokens.ts` (lihat `coding-standard.md`).
