import api from "../api";
import { ApiBook } from "@/types/book";

// Re-export ApiBook as Book for backward compatibility
export type { ApiBook as Book } from "@/types/book";

// Mapper to adapt API book structure to Frontend UI Book type (for cards/listings)
export const mapApiBookToFrontendBook = (apiBook: ApiBook): any => ({
  id: apiBook.id.toString(),
  title: apiBook.title,
  subtitle: apiBook.subtitle,
  slug: apiBook.slug,
  author: apiBook.author?.name || "Unknown Author",
  price: apiBook.final_price || apiBook.price,
  originalPrice: apiBook.discount > 0 ? apiBook.price : undefined,
  coverUrl: apiBook.cover_image,
  category: apiBook.categories?.[0]?.name || "Uncategorized",
  isBestseller: apiBook.is_bestseller,
  isNew: false,
  stock: apiBook.stock,
});

// --------------- Admin Book APIs ---------------

export const getAdminBooks = async (params?: any) => {
  return await api.get('/admin/books', { params });
};

export const getAdminBook = async (id: number) => {
  return await api.get(`/admin/books/${id}`);
};

export const createAdminBook = async (data: any) => {
  return await api.post('/admin/books', data);
};

export const updateAdminBook = async (id: number, data: any) => {
  return await api.put(`/admin/books/${id}`, data);
};

export const deleteAdminBook = async (id: number) => {
  return await api.delete(`/admin/books/${id}`);
};

export const duplicateAdminBook = async (id: number) => {
  return await api.post(`/admin/books/${id}/duplicate`);
};

export const updateAdminBookInventory = async (id: number, data: any) => {
  return await api.patch(`/admin/books/${id}/inventory`, data);
};

export const updateAdminBookIsbn = async (id: number, data: any) => {
  return await api.patch(`/admin/books/${id}/isbn`, data);
};

export const updateAdminBookDigital = async (id: number, data: any) => {
  return await api.patch(`/admin/books/${id}/digital`, data);
};

export const updateAdminBookPricing = async (id: number, data: any) => {
  return await api.patch(`/admin/books/${id}/pricing`, data);
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return await api.post('/admin/upload', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// --------------- Public Book APIs ---------------

export const getPublicBooks = async (params?: any) => {
  return await api.get('/public/books', { params });
};

export const getPublicBook = async (slug: string) => {
  return await api.get(`/public/books/${slug}`);
};

// --------------- Master Data APIs (for form dropdowns) ---------------

export interface MasterDataItem {
  id: number;
  name: string;
  slug: string;
}

export const getAdminAuthors = async (): Promise<MasterDataItem[]> => {
  const response = await api.get('/admin/authors');
  return response as any;
};

export const getAdminPublishers = async (): Promise<MasterDataItem[]> => {
  const response = await api.get('/admin/publishers');
  return response as any;
};

export const getAdminCategories = async (): Promise<MasterDataItem[]> => {
  const response = await api.get('/admin/categories');
  return response as any;
};

export const getAdminGenres = async (): Promise<MasterDataItem[]> => {
  const response = await api.get('/admin/genres');
  return response as any;
};
