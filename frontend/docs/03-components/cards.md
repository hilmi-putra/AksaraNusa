# Cards

## Jenis Card di Landing Page

### 1. Advantage Card (Kartu Keunggulan)
- Background `primary-brand`, radius besar (`24–32px`), padding `24px`.
- Isi: `IconBadge` (atas), judul singkat, deskripsi 1 baris.
- Grid 2×2, gap `16px`.

### 2. Feature Highlight Card (Card Besar "Keunggulan Kami")
- Background `surface-muted` (abu-abu krem), radius besar.
- Isi: judul section + ikon panah kecil (indikasi "lihat detail" meski link ke section yang sama).

### 3. Catalog Item Card
- Cover buku full-bleed di dalam card radius besar, overlay gradient tipis di bawah untuk keterbacaan judul bila teks ditumpuk di atas gambar.
- Varian ukuran: `large` (span 2 kolom/baris) dan `small` (1 kolom), untuk bento grid.

### 4. Process Step Card (varian aktif)
- Step yang sedang ditonjolkan (nomor 02 pada mockup) memakai card gelap (`ink`) dengan foto blob kecil di sisi kanan, kontras dari step lain yang hanya teks+garis.

## Aturan Umum Card
- Radius besar konsisten (`24px` minimum) di semua jenis card — ini elemen signature dari mockup, jangan dicampur dengan radius kecil (`8px`) di card manapun pada landing page.
- Shadow minimal/tidak ada — mockup mengandalkan kontras warna blok, bukan drop-shadow tebal.
- Padding internal card mengikuti `spacing.md` (`space-lg` untuk card besar, `space-md` untuk card kecil).
