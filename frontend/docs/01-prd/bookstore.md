# PRD - Aksara Nusa Bookstore (Frontend)

## 1. Objective
Membangun antarmuka e-commerce modern (Frontend) untuk Aksara Nusa Bookstore yang terintegrasi secara visual dengan Aksara Nusa, fokus pada user experience (UX) premium, navigasi yang intuitif, dan performa tinggi. Pada fase ini, semua interaksi data menggunakan *mock data*.

## 2. Scope & Features
- **Global Navigation**: Header yang menyatukan link Landing Page Aksara Nusa dan kategori Aksara Nusa Bookstore.
- **Product Catalog (Home Store)**: 
  - Hero image promo/featured books.
  - Category filters & Sorting.
  - Grid produk dengan pagination/infinite scroll.
- **Product Detail Page (PDP)**:
  - Galeri cover buku.
  - Informasi buku (Penulis, ISBN, Penerbit, Sinopsis).
  - Harga, diskon, stok status.
  - Call to Action: "Add to Cart", "Add to Wishlist".
- **Cart & Checkout Flow**:
  - Cart page dengan fitur ubah quantity dan hitung subtotal otomatis.
  - Checkout (Multi-step/Accordion): Alamat pengiriman, Metode pengiriman (Pickup/Ekspedisi), Pembayaran.
  - Konfirmasi pesanan sukses.
- **Customer Dashboard**:
  - Profil Pengguna & Manajemen Alamat.
  - Riwayat Pesanan (Order History).
  - Wishlist.

## 3. Non-Functional Requirements
- **State Management**: Cart & user session harus tersimpan minimal di memory (menggunakan Zustand) selama fase mock.
- **Form Handling**: Validasi form (Checkout, Login) wajib menggunakan Zod + React Hook Form.
- **Design System**: Komponen menggunakan shadcn/ui dan Tailwind CSS, disesuaikan dengan *brand guidelines* Aksara Nusa.
- **Animations**: Transisi antar halaman dan mikro-interaksi menggunakan Framer Motion atau GSAP.
