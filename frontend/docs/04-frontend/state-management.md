# State Management & Frontend Architecture

## 1. App Router & Routing
Proyek ini menggunakan Next.js 15 dengan fitur App Router (`app/`).
Folder dipisahkan berdasarkan domain/fitur (Feature-Based Architecture):
- `app/(public)/`: Halaman publik seperti Landing Page, About, Services.
- `app/(store)/`: Semua halaman terkait e-commerce (Bookstore, Product Detail, Cart, Checkout).
- `app/(auth)/`: Halaman Login, Register, Forgot Password.
- `app/(dashboard)/`: Akun pengguna, riwayat pesanan, wishlist.

## 2. Server vs Client Components
- **Default**: Semua komponen di Next.js App Router adalah Server Components secara default.
- **Client Components**: Hanya gunakan direktif `"use client"` di bagian atas file jika komponen tersebut:
  - Menggunakan React hooks (`useState`, `useEffect`).
  - Berinteraksi dengan `window` atau `document` browser.
  - Membutuhkan listener interaksi pengguna (e.g., `onClick`, `onChange`).
  - Menggunakan State Management seperti Zustand.

## 3. State Management (Zustand)
Kita menggunakan Zustand untuk manajemen *state global* karena ringan, bebas *boilerplate*, dan tidak memerlukan pembungkus *Provider* berlebih.

### Aturan Zustand:
- **Lokasi File**: Simpan store di dalam direktori `stores/` (contoh: `useCartStore.ts`, `useAuthStore.ts`).
- **Persistensi**: Untuk fase pengembangan dengan *mock data*, gunakan *middleware* `persist` bawaan Zustand untuk menyimpan state Keranjang (Cart) dan Sesi Pengguna di `localStorage`, agar tidak hilang saat di-refresh.
- **Pemisahan Logika**: Jangan masukkan logika fetch data/API kompleks ke dalam komponen UI. Letakkan *action* dan manipulasi state di dalam store.

## 4. Form & Validasi (React Hook Form + Zod)
- Semua form (terutama form kompleks seperti Checkout dan Auth) wajib dibangun menggunakan `react-hook-form`.
- Skema validasi (aturan panjang karakter, tipe data, required fields) harus didefinisikan menggunakan `zod` dan dikaitkan ke form melalui `@hookform/resolvers/zod`.
- Gabungkan ini dengan `<Form>` dari `shadcn/ui` untuk konsistensi aksesibilitas error state.

## 5. Mock Data Service
Selama backend belum diintegrasikan, semua data harus berasal dari direktori `lib/mock/`.
- Buat file `.mock.ts` yang mengekspor array/objek berisi data *dummy* statis (e.g., `books.mock.ts`).
- Pastikan antarmuka tipe (TypeScript types) yang digunakan untuk mock data didefinisikan di `types/` sehingga nantinya saat beralih ke API backend, kita hanya perlu mengubah implementasi fetch-nya saja.
