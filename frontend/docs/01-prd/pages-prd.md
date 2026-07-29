# PRD - Aksara Nusa Bookstore Pages

## 1. Landing Page (Redesign)
- **Tujuan**: Halaman muka perusahaan (Aksara Nusa) dengan *point of entry* jelas menuju Bookstore.
- **Section**:
  - Global Header (Unified Navigasi).
  - Hero Section dengan CTA.
  - Tentang Kami & Nilai Jual.
  - Showcase Buku (Gallery mini yang mengarah ke Bookstore).
  - Proses Kerja Sama.
  - Global Footer.
- **Mock Data**: Testimoni, Buku Featured.
- **Interaksi**: Animasi *scroll reveal* pada tiap section, hover effect pada galeri buku.
- **Acceptance Criteria**: Navbar baru harus menggabungkan link publishing dan bookstore tanpa terlihat berantakan. Transisi warna antara section harus halus (menggunakan warna brand).

## 2. Aksara Nusa Bookstore (Catalog)
- **Tujuan**: Halaman etalase utama e-commerce untuk menemukan buku.
- **Section**:
  - Promo Hero Banner.
  - Filter Sidebar / Topbar (Kategori, Harga, Author, Urutkan).
  - Product Grid (menggunakan BookCard Grid Variant).
  - Pagination / Load More button.
- **Mock Data**: Array of Books (ID, Title, CoverURL, Author, Price, Category, Bestseller status).
- **Interaksi**: Skeleton loader saat mengganti filter, klik kategori langsung meng-*update* grid tanpa reload halaman.
- **Responsive**: Di mobile, Filter Sidebar disembunyikan di dalam *Drawer/Sheet* shadcn.

## 3. Product Detail Page (PDP)
- **Tujuan**: Menampilkan detail lengkap satu buku dan CTA untuk membeli.
- **Section**:
  - Image Gallery (Sampul buku + preview halaman jika ada).
  - Product Info (Judul, Penulis, Harga, Stok, SKU).
  - CTA (Add to Cart, Wishlist).
  - Deskripsi & Spesifikasi (ISBN, Halaman, Dimensi, Tanggal Rilis).
  - Related Products (Carousel / Grid 4 item).
- **Mock Data**: Detail Buku lengkap (termasuk deskripsi panjang HTML/Markdown), Related Books array.
- **Interaksi**: Mengklik "Add to Cart" men-trigger toast dan mengupdate *cart badge* di header.
- **Validasi**: Tidak bisa *add to cart* jika stok = 0.

## 4. Cart Page
- **Tujuan**: Halaman tinjauan keranjang belanja.
- **Section**:
  - Daftar Item (BookCard Cart Preview Variant).
  - Input Quantity (+ / -).
  - Ringkasan Pesanan (Subtotal, Diskon, Estimasi Ongkir).
  - CTA Checkout.
- **Mock Data**: State yang disimpan di Zustand (`useCartStore`).
- **Interaksi**: Merubah quantity langsung memperbarui subtotal *real-time*. Hapus item menggunakan icon tempat sampah.

## 5. Checkout Flow
- **Tujuan**: Funnel pembelian dengan multi-step form.
- **Section**:
  - **Step 1 - Shipping Address**: Form alamat lengkap / pilih alamat tersimpan.
  - **Step 2 - Shipping Method**: Opsi Kurir / Ambil di Tempat.
  - **Step 3 - Payment Method**: Pilihan bank/metode bayar.
  - **Order Summary Sidebar**: Selalu terlihat di desktop, sticky di kanan.
- **Mock Data**: Alamat dummy pengguna, array metode pengiriman & tarif, metode pembayaran.
- **Validasi (Zod)**: Form alamat wajib diisi (Nama, HP, Alamat, Kota, Kodepos). Validasi nomor HP minimum 10 digit angka.
- **Interaksi**: Akordion untuk pindah antar step.

## 6. Customer Dashboard
- **Tujuan**: Portal pengelolaan akun pengguna mandiri.
- **Section**:
  - Sidebar Navigasi (Profil, Pesanan, Wishlist, Alamat).
  - **Profile**: Form update data diri.
  - **My Orders**: Tabel/Daftar riwayat pesanan dengan status (Menunggu Pembayaran, Diproses, Dikirim, Selesai).
  - **Wishlist**: Grid buku favorit (BookCard Wishlist Variant).
- **Mock Data**: Data dummy User, riwayat Order.
- **Responsive**: Sidebar Navigasi menjadi dropdown/tab di perangkat mobile.
