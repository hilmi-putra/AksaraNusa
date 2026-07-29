# Navigation

## Struktur Menu Utama (Header)
Mengikuti pola menu mockup (*Обо мне, Портфолио, Этапы, Услуги*) diadaptasi:

| Label | Tujuan |
|---|---|
| Tentang Kami | `#tentang-kami` (anchor di landing page) atau `/tentang-kami` |
| Katalog | Menuju Mega Bookstore (`/katalog` atau domain terpisah) |
| Proses Kerja | `#proses-penerbitan` (anchor) |
| Layanan | `#kenapa-mega-press` (anchor) atau halaman layanan terpisah |

## Perilaku
- Desktop: semua item tampil horizontal di tengah/kanan header.
- Mobile: disembunyikan ke hamburger menu (drawer dari kanan atau dropdown penuh).
- Anchor link memakai smooth-scroll dengan offset (agar tidak tertutup header sticky).
- Item aktif (section yang sedang di-scroll) mendapat underline/warna primary-brand (scrollspy sederhana, opsional untuk fase ini).

## Kontak Cepat (Quick Contact)
- 2 ikon bulat di ujung kanan header: WhatsApp & Email/Telegram (sesuai channel yang dipakai Mega Press).
- Setiap ikon adalah `<a>` dengan `target="_blank"` dan `aria-label` jelas (lihat `accessibility.md`).

## CTA Utama di Nav (Opsional)
- Bisa ditambahkan 1 tombol `Button variant="primary"` kecil di ujung kanan bila diperlukan (mis. "Ajukan Naskah"), menyesuaikan lebar header agar tidak penuh sesak.
