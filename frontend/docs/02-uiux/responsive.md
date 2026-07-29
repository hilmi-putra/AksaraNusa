# Responsive Behavior

## Prinsip
Mockup referensi didesain untuk layar lebar (desktop-first, terlihat dari padding besar & grid kompleks). Adaptasi ke mobile dilakukan dengan **menyederhanakan**, bukan mengecilkan proporsional.

## Per Section

### Header
- Desktop: nav horizontal penuh.
- Mobile: nav disembunyikan ke hamburger menu; logo + 1 CTA utama tetap terlihat.

### Hero
- Desktop: headline kiri, sub-copy+CTA kanan (sejajar).
- Mobile: headline dulu, baru sub-copy, baru CTA — full stack, CTA full-width.
- Galeri blob 3 gambar: desktop sejajar overlap; mobile jadi swipeable carousel horizontal (overlap dihilangkan agar tidak menutupi konten).

### Perkenalan Personal
- Desktop: paragraf lebar terpusat dengan font besar.
- Mobile: ukuran font diturunkan 1 tingkat (`text-h3` bukan `text-body-lg` besar), tetap center-aligned.

### Kenapa Mega Press
- Desktop: card besar + grid 2×2 sejajar (2 kolom).
- Mobile: card besar full-width di atas, grid 2×2 tetap 2 kolom (bukan 1 kolom) agar proporsi kartu tidak terlalu memanjang.

### Showcase Katalog
- Desktop: bento grid 3 kolom.
- Mobile: grid 2 kolom, item besar tetap span 2 kolom di baris pertama.

### Proses Penerbitan
- Desktop: list step & sub-copy sejajar 2 kolom, ilustrasi step aktif di kanan.
- Mobile: list step full width, ilustrasi step aktif pindah ke bawah judul step (bukan di samping).

## Touch Target
- Semua tombol/CTA minimal tinggi `44px` di mobile untuk kenyamanan tap.
- Jarak antar elemen interaktif minimal `8px` agar tidak salah tap.
