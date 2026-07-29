# Molecules

Gabungan beberapa atoms menjadi satu unit fungsional kecil.

## Daftar Molecules (Landing Page)

### `NavLink`
- Teks link + underline animasi saat hover/active. Dipakai di `Header`.

### `AdvantageCard`
- Kombinasi `IconBadge` + judul + deskripsi singkat, background primary-brand, radius besar.
- Props: `icon`, `title`, `description`.
- Dipakai 4× di section "Kenapa Aksara Nusa".

### `ProcessStepItem`
- Kombinasi `NumberBadge` + judul step + deskripsi + (opsional) gambar kecil blob-shape.
- Props: `number`, `title`, `description`, `image?`, `active: boolean`.

### `GalleryBlobImage`
- Wrapper `next/image` dengan clip-path/border-radius organik (lihat `illustration.md`).
- Props: `src`, `alt`, `shapeVariant` (`A` | `B` | `C` — beberapa varian bentuk agar galeri tidak monoton).

### `ContactQuickAction`
- Ikon bulat kecil di header (WhatsApp/Email) dengan `aria-label`.

### `CatalogItemCard`
- Cover buku + judul + kategori (`Tag`), dipakai dalam grid Showcase Katalog.
- Props: `coverImage`, `title`, `category`, `size` (`large` | `small` — untuk bento grid).

## Aturan
- Molecules boleh menerima props array kecil, tapi tidak melakukan fetching sendiri — data selalu dikirim dari komponen `features/landing/*` (organisms/section level).
