# Prompt — Brief Desain Landing Page Aksara Nusa

> Prompt ini siap dipakai (copy-paste) untuk meminta AI design tool / desainer / Claude membuatkan tampilan Landing Page Aksara Nusa berdasarkan mockup referensi & dokumentasi di folder `docs/02-uiux` dan `docs/01-prd`.

---

Saya ingin membuat desain Landing Page untuk **Aksara Nusa**, sebuah perusahaan penerbit buku (1.200+ naskah: Buku Ajar, Buku Referensi, Monograf, Buku Umum, Novel, Biografi, Jurnal Penelitian, Proceeding).

**Referensi gaya visual**: gunakan mood dari mockup portofolio personal bernuansa warm-editorial yang saya lampirkan — nuansa hangat, personal, storytelling — BUKAN gaya e-commerce dingin/korporat. Adaptasikan pola berikut ke konteks penerbit buku (bukan fotografer):

1. **Header**: logo "Aksara Nusa" kiri, menu (Tentang Kami, Katalog, Proses Kerja, Layanan) di kanan, 2 ikon kontak cepat bulat (WhatsApp/Email) di ujung kanan.
2. **Hero**: headline besar 2 baris bold hitam ("Satu Penerbit. Ribuan Cerita Penting."), sub-copy singkat 2 baris di kanan atas headline, tombol CTA pill hitam dengan ikon panah bulat ("Ajukan Naskah"). Di bawahnya, galeri 3 gambar dengan bentuk organik/blob (bukan kotak lurus) menampilkan suasana proses penerbitan.
3. **Perkenalan personal**: paragraf besar di tengah, nada hangat menyapa langsung ("Halo! Kami Aksara Nusa..."), dengan 1-2 kata kunci di-highlight badge bulat kecil, diikuti tombol CTA kecil.
4. **Kenapa Aksara Nusa**: layout 2 kolom — card besar abu-abu "Keunggulan Kami" + panah (kiri), grid 2×2 card warna primary-brand/oranye berisi 4 keunggulan dengan ikon bulat masing-masing (kanan).
5. **Showcase Katalog**: judul dengan badge ikon buku di card hitam, lalu bento-grid galeri cover buku (1 besar + beberapa kecil), diakhiri CTA "Lihat Semua Katalog".
6. **Proses Penerbitan**: judul + sub-copy kanan, list numbered step (01, 02, 03) dengan garis vertikal penghubung; step aktif ditonjolkan dengan card gelap + foto kecil blob-shape di sampingnya.
7. **Footer**: kontak, sosial media, link legal.

**Palet warna**: dominan krem hangat (`#EFEADD`) sebagai background, aksen primary-brand/oranye (`#DD6B3A`) untuk kartu keunggulan & CTA, teks hitam pekat (`#171512`), dengan 1-2 blok gelap pekat untuk kontras dramatis (card judul showcase, step aktif).

**Tipografi**: heading bold-tight geometric sans, body sans regular yang mudah dibaca. Radius elemen besar & konsisten (card, tombol pill), bukan sudut tajam.

**Yang harus dihindari**:
- Jangan meniru identitas visual fotografer secara literal (nama, foto pribadi, teks Rusia) — ini murni referensi *mood & layout*, bukan konten.
- Jangan gunakan gaya e-commerce generik (grid produk kaku, warna biru korporat).
- Jangan gunakan bentuk kotak tajam untuk galeri — pertahankan bentuk organik/blob sebagai signature visual.

**Output yang saya butuhkan**: desain/wireframe visual untuk Landing Page (desktop & mobile) sesuai 7 section di atas, konsisten dengan token warna & tipografi yang disebutkan.

---

## Cara Pakai Prompt Ini
- Untuk AI design/image generator: tempel langsung, lampirkan mockup referensi sebagai gambar acuan mood.
- Untuk Claude (membangun komponen React/Next.js): tempel prompt ini bersama isi `docs/01-prd/landing-page.md` dan `docs/02-uiux/*.md` agar hasil kode konsisten dengan token desain yang sudah ditentukan.
- Untuk desainer manusia (Figma dsb.): gunakan sebagai brief awal, lengkapi dengan link ke `docs/02-uiux/color-system.md` dan `typography.md` untuk nilai token pasti.
