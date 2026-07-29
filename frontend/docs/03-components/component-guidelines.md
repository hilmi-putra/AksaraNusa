# Component Guidelines

## 1. Atomic Design & Folder Structure
Semua komponen disusun berdasarkan metodologi Atomic Design di dalam folder `components/`:
- **Atoms** (`components/atoms/`): Komponen dasar yang tidak bisa dipecah lagi (Button, Input, Typography, Icon, Badge).
- **Molecules** (`components/molecules/`): Gabungan dari beberapa atom yang membentuk satu kesatuan fungsi sederhana (FormGroup, SearchBar, Pagination).
- **Organisms** (`components/organisms/`): Komponen kompleks yang menggabungkan molecules dan/atau atoms untuk membentuk bagian mandiri dari UI (Navbar, Footer, ProductGrid, CheckoutForm).
- **Templates** (`layouts/`): Struktur layout global halaman (PublicLayout, StoreLayout, DashboardLayout).
- **Features** (`features/`): Komponen spesifik domain bisnis yang mungkin mengambil data/memiliki *state* kompleks dan tidak selalu reusable (contoh: `features/checkout/ShippingSelection`).

## 2. Naming Convention
- **File & Folder**: Gunakan `PascalCase` untuk komponen (e.g., `BookCard.tsx`, `PrimaryButton.tsx`).
- **Props Interface**: Nama interface harus `[ComponentName]Props` (e.g., `interface BookCardProps {}`).
- **Event Handlers**: Gunakan awalan `on` untuk event props (e.g., `onAddToCart`), dan awalan `handle` untuk implementasi internal (e.g., `const handleAddToCart = () => {}`).

## 3. Props Convention, Variants, & Sizes
Setiap komponen UI (terutama Atoms dan Molecules) harus mendukung variabilitas melalui library seperti `class-variance-authority` (cva) yang terintegrasi di shadcn:
- **Variant**: Merepresentasikan "jenis" tampilan (e.g., `primary`, `secondary`, `outline`, `ghost`, `destructive`).
- **Size**: Merepresentasikan ukuran (e.g., `sm`, `md`, `lg`, `icon`).
- **Standard Props**: Selalu *extend* tipe HTML bawaan (`React.ButtonHTMLAttributes<HTMLButtonElement>`) agar ref dan atribut aria tetap berjalan.

## 4. Component States
Setiap interaktif komponen wajib menangani berbagai state:
- **Default**: State normal.
- **Hover**: State saat kursor berada di atas elemen (ubah brightness/opacity, transisi lembut).
- **Active / Focus**: Wajib menggunakan `focus-visible:ring` untuk *keyboard navigation*.
- **Disabled**: Penurunan opacity (50%), kursor `not-allowed`, menghilangkan pointer events.
- **Loading**: Menggunakan indikator *spinner* pada tombol atau *skeleton loader* pada data.
- **Error**: Menggunakan kombinasi warna `destructive` (border merah, teks merah) dan icon peringatan.

## 5. Accessibility (A11y)
- Gunakan Semantic HTML (`<nav>`, `<main>`, `<article>`).
- Tombol hanya berfungsi sebagai *action* (Gunakan `<button>`), sedangkan navigasi menggunakan `<Link>`.
- Jika komponen murni visual (e.g., dekorasi svg), berikan `aria-hidden="true"`.
- Form controls selalu harus memiliki *Label* terkait, baik visual maupun `aria-label`.

## 6. Contoh Struktur Dokumentasi Komponen
Setiap komponen yang kompleks (seperti BookCard) wajib didokumentasikan di `docs/03-components/` dengan format berikut:
1. **Objective**: Tujuan komponen.
2. **Props**: Tabel props (Name, Type, Default, Description).
3. **Variants**: Penjelasan varian visual.
4. **States**: Bagaimana komponen menangani disabled, loading, dll.
5. **Dependencies**: Library/komponen lain yang diperlukan.
6. **Code Example**: Contoh snippet cara pemakaian.
7. **Responsive & A11y**: Perilaku di layar kecil dan interaksi keyboard.
