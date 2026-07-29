# Modal

> Untuk Landing Page, modal bersifat opsional/ringan — dipakai untuk kebutuhan sederhana, bukan flow kompleks (dashboard/checkout memakai modal system terpisah nanti).

## Kemungkinan Kebutuhan Modal di Landing Page
- Modal "Ajukan Naskah" cepat (bila tidak dibuat sebagai section form penuh).
- Modal preview cover buku (saat item `CatalogItemCard` di-klik, sebelum diarahkan ke halaman detail penuh di Aksara Nusa Bookstore).

## Struktur Dasar
- Overlay: `bg-ink/50` (hitam transparan di atas krem, bukan hitam pekat penuh).
- Panel: background `cream`/`white`, radius besar (`24px`), padding `32px`.
- Tombol close (`×`) di pojok kanan atas, ukuran tap minimal `44px`.

## Perilaku & Aksesibilitas
- Fokus otomatis pindah ke dalam modal saat terbuka (`focus trap`).
- `Esc` menutup modal; klik overlay di luar panel juga menutup.
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` mengarah ke judul modal.
- Scroll body dikunci (`overflow: hidden`) selama modal terbuka.

## Status di Fase Ini
Belum wajib diimplementasikan kecuali PRD Landing Page final memutuskan memakai modal untuk preview katalog — jika tidak, dokumen ini menjadi referensi siap pakai untuk fase Bookstore/Dashboard berikutnya.
