export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  author: string;
  price: number;
  originalPrice?: number;
  coverUrl: string;
  category: string;
  rating?: number;
  reviews?: number;
  isBestseller?: boolean;
  isNew?: boolean;
  stock: number;
}

/**
 * Full book data from API — used in admin and detail pages
 */
export interface ApiBook {
  id: number;
  title: string;
  subtitle: string | null;
  slug: string;
  isbn: string | null;
  sku: string | null;
  author: { id: number; name: string } | null;
  publisher: { id: number; name: string } | null;
  categories: { id: number; name: string; slug: string }[];
  genres: { id: number; name: string; slug: string }[];
  short_description: string | null;
  long_description: string | null;
  editor_note: string | null;
  additional_info: string | null;
  language: string;
  page_count: number | null;
  weight: number | null;
  dimensions: string | null;
  cover_type: 'softcover' | 'hardcover' | 'other';
  paper_type: string | null;
  edition: string | null;
  specifications: Record<string, string> | null;
  price: number;
  discount: number;
  promo_price: number | null;
  promo_start_at: string | null;
  promo_end_at: string | null;
  final_price: number;
  stock: number;
  cover_image: string | null;
  image_gallery: string[] | null;
  digital_file_url: string | null;
  digital_file_size: string | null;
  digital_file_format: string | null;
  book_type: 'physical' | 'digital' | 'both';
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  is_bestseller: boolean;
  is_editor_choice: boolean;
  sort_order: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
