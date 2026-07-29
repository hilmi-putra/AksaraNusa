# Typography

Tipografi dalam Aksara Nusa dirancang untuk memberikan pengalaman membaca yang optimal, konsistensi merek, dan estetika yang premium. Sistem tipografi kami mengandalkan kombinasi dua *Google Fonts* utama yang diterapkan secara terpusat melalui komponen `Typography` dan *Tailwind CSS v4*.

## Font Families

1. **Heading Font**: **Plus Jakarta Sans**
   Digunakan untuk semua judul utama (Display, Hero, H1-H6) untuk memberikan kesan modern, bersih, dan profesional. Tersedia melalui CSS variable `--font-plus-jakarta-sans` atau kelas utilitas `font-heading`.
2. **Body Font**: **Manrope**
   Digunakan untuk teks paragraf, deskripsi, navigasi, dan antarmuka lainnya agar nyaman dibaca dalam paragraf panjang maupun layar kecil. Tersedia melalui CSS variable `--font-manrope` atau kelas utilitas `font-sans`.

> Keduanya diimpor secara optimal melalui `next/font/google` di dalam `layout.tsx` untuk mencegah *Layout Shift* dan mengoptimalkan performa pemuatan (preload otomatis).

## Hierarchy & Scale

Semua skala tipografi kini dikendalikan secara sentral oleh komponen `Typography` (`@/components/atoms/Typography.tsx`). Jangan menggunakan kelas utilitas secara manual (`text-4xl font-bold`, dsb.) pada elemen teks HTML. Cukup definisikan `variant`.

| Variant | Font Family | Size | Weight | Line Height | Penggunaan |
|---|---|---|---|---|---|
| `display` | Plus Jakarta Sans | 6xl/7xl | Extrabold | Tight | Digunakan untuk headline berukuran sangat besar (jarang digunakan kecuali landing page). |
| `hero` | Plus Jakarta Sans | 5xl/6xl | Bold | Tight | Judul utama pada hero section. |
| `h1` | Plus Jakarta Sans | 4xl/5xl | Bold | Tight | Judul utama halaman (Page Title). |
| `h2` | Plus Jakarta Sans | 3xl/4xl | Semibold | Snug | Judul bagian/section pada halaman. |
| `h3` | Plus Jakarta Sans | 2xl/3xl | Semibold | Snug | Sub-judul section atau judul blok komponen besar. |
| `h4` | Plus Jakarta Sans | xl/2xl | Semibold | Snug | Judul card atau sub-komponen. |
| `h5` | Plus Jakarta Sans | lg/xl | Semibold | Snug | Judul kecil. |
| `h6` | Plus Jakarta Sans | base/lg | Semibold | Snug | Judul terkecil sebelum paragraf tebal. |
| `p` | Manrope | base | Normal | Relaxed | Teks body standar untuk paragraf dan bacaan panjang. |
| `description` | Manrope | lg | Normal | Relaxed | Teks body yang lebih besar dengan warna *muted* untuk sub-heading atau ringkasan. |
| `navigation` | Manrope | sm | Medium | Normal | Teks untuk navigasi menu, tab, dan breadcrumb. |
| `button` | Manrope | sm | Semibold | Normal | Teks di dalam tombol (CTA). |
| `input` | Manrope | sm | Normal | Normal | Teks dalam elemen formulir (textfield, textarea). |
| `card` | Manrope | sm | Normal | Relaxed | Teks body berukuran kecil untuk di dalam kartu produk/artikel. |
| `footer` | Manrope | sm | Normal | Relaxed | Teks sekunder berwarna *muted* untuk tautan footer. |
| `form` | Manrope | sm | Medium | Normal | Label formulir. |
| `caption` | Manrope | xs | Normal | Tight | Keterangan gambar atau teks sangat kecil berwarna *muted*. |
| `badge` | Manrope | xs | Semibold | Normal | Label status, lencana, kategori (umumnya kapital/uppercase). |
| `dashboard` | Manrope | sm | Normal | Relaxed | Teks tabel dan menu pada antarmuka admin/dashboard pelanggan. |
| `commerce` | Manrope | base | Medium | Normal | Teks spesifik untuk elemen transaksi (misal: harga produk). |

## Contoh Penggunaan Komponen Typography

Pastikan semua rendering teks di Aksara Nusa menggunakan komponen `Typography`. Jika tag semantik HTML default tidak sesuai dengan varian (misal butuh desain `h3` tapi secara aksesibilitas harus dibaca sebagai `<p>`), gunakan prop `as`.

```tsx
import { Typography } from "@/components/atoms/Typography";

export default function Example() {
  return (
    <div>
      {/* Menggunakan h1 */}
      <Typography variant="h1">Judul Halaman Ini</Typography>
      
      {/* Secara visual terlihat seperti h4, tapi dirender sebagai h2 */}
      <Typography as="h2" variant="h4">
        Sub-bagian dari dokumen
      </Typography>
      
      {/* Teks paragraf biasa */}
      <Typography variant="p">
        Ini adalah teks paragraf yang akan dirender menggunakan Manrope,
        dengan line-height relaxed untuk kenyamanan membaca.
      </Typography>
      
      {/* Teks yang dirender ke tag <span> untuk keperluan inline */}
      <Typography as="span" variant="badge" className="text-primary">
        LABEL BARU
      </Typography>
    </div>
  );
}
```

## Responsive Behavior & Accessibility

- **Responsive Font Sizes**: Komponen `Typography` secara otomatis menangani responsivitas. Misalnya, varian `h1` akan menggunakan ukuran `text-4xl` pada *mobile* dan bergeser otomatis menjadi `md:text-5xl` pada layar yang lebih besar (desktop).
- **Accessibility**: Selalu pertimbangkan hierarki semantik (*Semantic HTML*) di samping gaya visual. Pastikan urutan tag H1, H2, dan H3 valid secara hierarkis bagi alat pembaca layar (Screen Reader) menggunakan *prop* `as` jika diperlukan. Jangan pernah melompat dari `h1` ke `h3`.
