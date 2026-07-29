# Iconography

## Gaya Ikon
Mengikuti pola mockup: ikon sederhana, garis tipis (line/outline), dibungkus badge lingkaran solid — bukan ikon flat tanpa wadah.

## Aturan Badge Ikon
- Bentuk: lingkaran penuh (`border-radius: 999px`).
- Ukuran: `36px` (default), `44px` (di card besar).
- Warna badge menyesuaikan konteks:
  - Di atas card primary-brand → badge putih/krem dengan ikon warna ink.
  - Di atas card krem/putih → badge ink/primary-brand dengan ikon putih.

## Daftar Ikon yang Dipakai (Landing Page)

| Konteks | Ikon | Makna |
|---|---|---|
| Nav — kontak cepat | WhatsApp, Telegram/Email | Kontak langsung |
| CTA hero | Panah diagonal (↗) dalam lingkaran | "Menuju aksi" |
| Kartu keunggulan 1 | Dokumen/kertas | Proses review naskah |
| Kartu keunggulan 2 | Palet/kuas | Desain sampul & layout |
| Kartu keunggulan 3 | Pin lokasi/toko | Distribusi ke toko buku |
| Kartu keunggulan 4 | Gelembung chat | Pendampingan penulis |
| Badge grid katalog | Buku terbuka | Menandai section showcase |
| Numbered step | Angka dalam lingkaran outline (step belum aktif) / solid ink (step aktif) | Urutan proses |

## Sumber Ikon
Gunakan set ikon garis tunggal yang konsisten (mis. Phosphor Icons/Lucide, weight "regular"), tidak mencampur beberapa gaya ikon berbeda dalam satu halaman.

## Aksesibilitas Ikon
- Ikon dekoratif (badge di dalam judul) → `aria-hidden="true"`.
- Ikon yang berfungsi sebagai tombol tanpa teks (kontak cepat) → wajib `aria-label` deskriptif (mis. `aria-label="Hubungi via WhatsApp"`).
