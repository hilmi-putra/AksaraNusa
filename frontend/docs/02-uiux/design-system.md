# Design System & UI/UX Guidelines

## 1. Filosofi Desain & Prinsip UI
**Filosofi**: Mega Bookstore adalah ekstensi alami dari Mega Press. Pengalaman membeli buku harus terasa sama personalnya, profesionalnya, dan se-premium proses penerbitannya.
**Prinsip UI**:
- **Clarity over Cleverness**: UI harus intuitif dan mudah dipahami, tidak membingungkan.
- **Content-First**: Konten (buku) adalah raja. Elemen UI harus mendukung dan tidak mendistraksi dari visual buku.
- **Accessible & Inclusive**: Dapat diakses oleh semua kalangan, termasuk navigasi keyboard dan *screen reader*.
- **Consistent**: Konsistensi visual dan interaksi di seluruh bagian website.

## 2. Color System
Menggunakan *palette* warna yang sudah ada namun diekspansi untuk kebutuhan e-commerce:
- **Primary Brand**:
  - `Cream` (`#EFEADD`): Background utama halaman, memberikan nuansa kertas/kertas buku premium.
  - `Ink` (`#171512`): Warna teks utama (Heading & Body), sangat kontras terhadap Cream.
  - `Terracotta` (`#DD6B3A`): Warna aksen utama untuk elemen interaktif (Primary Button, Links, Active States).
- **Secondary / Supporting**:
  - `Terracotta Dark` (`#B8532A`): Untuk *hover states* pada elemen Terracotta.
  - `Surface Muted` (`#DAD6C9`): Warna sekunder untuk elemen non-fokus (Secondary Button background, badge background).
  - `Surface White` (`#FFFFFF`): Background *Card*, *Dropdown*, *Modal* untuk menonjolkan elemen dari background Cream.
- **Feedback & Status**:
  - `Success`: Hijau lembut yang harmonis dengan tone hangat.
  - `Warning`: Kuning emas.
  - `Error/Destructive`: Merah (menggunakan standar shadcn destructive).
- **Dark Mode**: *(Opsional / Ditunda)* Jika diimplementasikan, Cream menjadi Charcoal `#1E1E1E` dan Ink menjadi Off-White `#F5F5F5`.

## 3. Typography
- **Heading Font (Serif)**: Digunakan untuk Judul Halaman (H1), Judul Section (H2), dan Judul Buku di Halaman Detail.
- **Body Font (Sans-Serif - Inter/Roboto)**: Digunakan untuk navigasi, paragraf, label form, deskripsi produk, harga, dan seluruh tombol.
- **Hierarchy**:
  - H1: 2.5rem (40px) / 3rem (48px) md
  - H2: 2rem (32px) / 2.5rem (40px) md
  - H3: 1.5rem (24px) / 1.75rem (28px) md
  - Body Base: 1rem (16px)
  - Body Small: 0.875rem (14px)

## 4. Spacing System, Grid & Breakpoints
- **Spacing**: Mengikuti skala 4pt Tailwind (4, 8, 12, 16, 24, 32, 48, 64, 96).
- **Grid System**:
  - Desktop (`lg` ke atas): 12-column grid, gap 24px.
  - Tablet (`md`): 8-column grid, gap 16px.
  - Mobile (`sm` ke bawah): 4-column grid, gap 16px.
- **Breakpoints**:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

## 5. Border Radius, Shadow, & Elevation
- **Border Radius**:
  - `sm` (0.25rem): Checkbox, Badge kecil.
  - `md` (0.375rem): Input, Button.
  - `lg` (0.5rem): BookCard, Modal, Dropdown.
- **Shadow & Elevation**:
  - Tidak menggunakan shadow tebal. Gunakan flat design dengan border halus (`border-border-subtle`).
  - `shadow-sm`: Dropdown menu.
  - `shadow-md`: Modal/Dialog.
  - *Hover Elevation*: Menggunakan transisi translateY (`-translate-y-1`) daripada membesarkan shadow untuk memberikan nuansa ringan dan responsif.

## 6. Iconography & Illustrations
- **Icons**: Menggunakan `lucide-react`. Ukuran standar: `16px` (inline), `20px` (button icon), `24px` (navbar/sidebar). Stroke width standar `2px`.
- **Illustrations**: Minimalis, berbasis garis atau bentuk geometris organik (seperti blob pada Landing Page) dengan warna aksen Terracotta.

## 7. Design Tokens (Tailwind)
Semua value di atas direpresentasikan melalui CSS variables di `:root` dalam `globals.css` dan dipetakan di layer utilitas Tailwind, sehingga komponen UI tidak pernah menggunakan *hardcoded hex value*.
