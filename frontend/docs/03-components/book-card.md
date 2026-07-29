# Component: BookCard

## 1. Objective
Komponen `BookCard` adalah elemen atomik terpenting dalam UI Aksara Nusa Bookstore. Digunakan secara luas untuk menampilkan entitas buku di berbagai halaman. Untuk menjaga reusability dan menghindari redundansi, `BookCard` harus mendukung berbagai *varian* tampilan.

## 2. Props Interface
```typescript
import { Book } from '@/types/book';

export interface BookCardProps {
  book: Book;
  variant?: 'grid' | 'list' | 'featured' | 'bestseller' | 'related' | 'wishlist' | 'cart-preview' | 'search-result' | 'recommendation' | 'author-books';
  layout?: 'vertical' | 'horizontal'; // Turunan dari variant
  onAddToCart?: (book: Book) => void;
  onRemove?: (id: string) => void; // Untuk wishlist/cart
}
```

## 3. Variants & Penggunaan
1. **grid** (Default): Tampilan vertikal standar (Cover atas, info bawah). Digunakan di halaman Katalog.
2. **list**: Tampilan horizontal (Cover kiri, info & tombol CTA di kanan). Opsi view di Katalog.
3. **featured**: Lebih besar, ada badge "New/Hot", cover sedikit asimetris. Untuk halaman Home/Hero.
4. **bestseller**: Ada elemen ranking (mis. angka 1, 2, 3 besar di pojok).
5. **related**: Vertikal, lebih ringkas/kecil, mungkin menyembunyikan deskripsi panjang. Untuk bagian bawah PDP.
6. **wishlist**: Vertikal/Horizontal, ditambah tombol Hapus/Icon Heart solid.
7. **cart-preview**: Sangat ringkas, horizontal, cover kecil (thumbnail), judul, harga, dan kontrol quantity.
8. **search-result**: Horizontal, menyorot (highlight) kata kunci di judul/penulis jika memungkinkan.
9. **recommendation**: Mirip grid tapi ada badge alasan rekomendasi (e.g. "Because you read X").
10. **author-books**: Ringkas, fokus pada cover.

## 4. Component States
- **Hover**: Cover buku akan sedikit terangkat (translate Y -4px) dan memberikan soft shadow.
- **Loading (Skeleton)**: Akan ada komponen terpisah `BookCardSkeleton` dengan dimensi setara.
- **Disabled**: Tombol "Add to Cart" di dalam card akan di-*disable* dengan label "Habis Terjual" jika `book.stock === 0`.

## 5. Responsive Behavior
- **Mobile (`sm`)**: Memaksa penggunaan ukuran font yang lebih kecil (text-sm/xs) untuk info buku. 
- Di halaman keranjang mobile, varian `cart-preview` akan menumpuk kontrol *quantity* di bawah judul buku agar muat.

## 6. Accessibility
- Tag `<img>` atau `<Image>` dari Next.js wajib menerima atribut `alt={book.title}`.
- Seluruh card dapat difokuskan via tab (`tabIndex={0}` jika berupa link `<Link>`), membungkus card ke halaman PDP.

## 7. Dependencies
- `Next/Image` untuk optimasi gambar cover.
- `shadcn/ui Button` untuk CTA.
- `lucide-react` untuk ikon (Cart, Heart, Trash).
- `next/link` untuk navigasi pembungkus.
