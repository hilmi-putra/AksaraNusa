# Vision — Mega Press Landing Page

## Konteks
Dokumen ini adalah bagian dari `frontend/docs` untuk project Mega Press & Mega Bookstore (lihat Architecture Blueprint v2.0). Fase saat ini **fokus pada Landing Page Mega Press** sebagai prioritas pertama sebelum modul Bookstore/Dashboard lain dikerjakan.

## Referensi Desain (Mood Reference)
Mockup yang dikirim (portofolio fotografer "Алекс Романов") digunakan sebagai **referensi mood & bahasa visual**, bukan untuk ditiru literal kontennya (karena bisnisnya berbeda: penerbit buku, bukan fotografer). Yang diadaptasi ke Mega Press:

- Nuansa hangat, personal, editorial — bukan e-commerce yang dingin/korporat.
- Palet warna hangat (krem/cream + aksen primary-brand/oranye) dengan teks gelap pekat.
- Bentuk gambar organik (blob/rounded-merge) untuk foto — memberi kesan human, bukan kotak kaku.
- Struktur storytelling: Hero pernyataan besar → perkenalan personal → "kenapa pilih kami" (cards) → showcase karya/katalog → proses kerja bertahap (numbered steps).

## Tujuan Landing Page Mega Press
1. Menyampaikan identitas Mega Press sebagai penerbit terpercaya (1.200+ naskah) dengan nuansa hangat & personal, bukan sekadar company profile generik.
2. Mengarahkan dua audiens berbeda dalam satu halaman:
   - **Calon penulis** → CTA "Ajukan Naskah / Terbitkan Buku".
   - **Calon pembeli** → CTA menuju Mega Bookstore (katalog).
3. Menjadi halaman dengan performa SEO tertinggi di seluruh platform (SSR/SSG Next.js), karena ini pintu masuk trafik organik.
4. Menjadi dasar design system (warna, tipografi, komponen) yang dipakai ulang di halaman publik lain (blog, tentang kami).

## Prinsip Desain yang Dipegang
- **Personal over corporate** — gunakan nada bicara langsung ("Halo, saya...") mengikuti pola mockup, diadaptasi untuk representasi tim/perusahaan Mega Press.
- **Warm & editorial** — palet krem + primary-brand, tipografi bold-sans, banyak white space.
- **Human shapes** — foto/ilustrasi memakai bentuk organik (blob mask), tidak melulu kotak tajam.
- **Progressive disclosure** — informasi bertahap: Hero → Kenapa Mega Press → Katalog unggulan → Proses kerja sama → CTA akhir.

## Non-Goals (Fase Ini)
- Tidak membangun halaman Bookstore, Dashboard, atau Admin Panel.
- Tidak melakukan integrasi API — seluruh konten memakai mock data (lihat `roadmap.md`).
- Tidak menentukan copywriting final (butuh review tim marketing Mega Press), dokumen ini hanya menentukan struktur & visual.
