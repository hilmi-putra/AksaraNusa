# Frontend Architecture

## 1. Folder Structure (Next.js App Router)
Proyek ini mengadopsi gabungan *Feature-Based Architecture* dengan *Atomic Design*:
```
app/
  (public)/       # Route grup untuk Landing Page, About, dsb. (Tanpa Navbar e-commerce)
  (store)/        # Route grup untuk Bookstore, Product Detail, Cart, Checkout.
  (auth)/         # Route grup untuk Login, Register.
  (dashboard)/    # Route grup untuk Customer Dashboard.
  layout.tsx      # Root layout, providers, global styles.
components/       # Reusable UI components (Atomic Design: atoms, molecules, organisms)
features/         # Domain-specific components (e.g., features/checkout, features/cart)
layouts/          # Layout wrappers spesifik (PublicLayout, StoreLayout)
lib/              # Utils, helpers, dan mock data (`lib/mock`)
stores/           # Global state management (Zustand)
types/            # Global TypeScript definitions
styles/           # Global CSS, Tailwind config, tokens
```

## 2. Reusable Components vs Feature Components
- **Reusable Components (`components/`)**: Komponen yang "bodoh" (*dumb/presentational*). Mereka tidak tahu darimana data berasal. Hanya menerima `props` dan men-trigger event melalui callback. Contoh: `<Button>`, `<BookCard>`, `<Input>`.
- **Feature Components (`features/`)**: Komponen "pintar" (*smart*). Mereka boleh terhubung langsung ke Zustand store, context, atau API layer. Biasanya tidak dipakai lintas domain. Contoh: `<CheckoutShippingForm>`, `<CartSummary>`.

## 3. State Management (Zustand)
Gunakan Zustand untuk state klien yang harus diakses di banyak tempat secara bersamaan.
- `useCartStore`: Menyimpan keranjang belanja (Items, Quantity).
- `useAuthStore`: Menyimpan data user & status otentikasi.
- `useWishlistStore`: Menyimpan daftar buku yang disukai.
**Aturan**: Update state selalu dilakukan melalui `actions` di dalam store, bukan memanipulasi variabel langsung dari komponen UI. Gunakan middleware `persist` untuk fase pengembangan mock.

## 4. API Layer & Services (Fase Integrasi)
Meskipun fase saat ini menggunakan *mock data*, arsitektur sudah disiapkan untuk API layer.
- Pemanggilan data server: Gunakan fitur standar Next.js `fetch` di Server Components untuk optimasi SSR dan caching.
- Pemanggilan data klien (mutations): Gunakan fungsi yang dibungkus dalam custom hooks di folder `hooks/` atau `services/`.
- **API Client**: Nantinya akan ada Axios interceptor tersentralisasi di `lib/api-client.ts` untuk menyisipkan token *Bearer*.

## 5. Middleware
Next.js `middleware.ts` digunakan di akar proyek untuk:
- Melindungi rute `/(dashboard)` agar hanya bisa diakses user yang sudah *login* (mock: cek cookie auth).
- Melindungi rute `/(auth)` agar user yang sudah login di-*redirect* ke beranda.
- Mencegah akses ke `/(store)/checkout` jika keranjang kosong.
