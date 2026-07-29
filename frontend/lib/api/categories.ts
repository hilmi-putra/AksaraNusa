import api from "../api";

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  created_at?: string;
}

export interface ApiGenre {
  id: number;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
}

// Categories
export const getAdminCategoriesList = async (params = {}) => {
  return await api.get(`/admin/categories`, { params });
};

export const getAdminCategory = async (id: string | number) => {
  return await api.get(`/admin/categories/${id}`);
};

export const createAdminCategory = async (data: any) => {
  return await api.post(`/admin/categories`, data);
};

export const updateAdminCategory = async (id: string | number, data: any) => {
  return await api.put(`/admin/categories/${id}`, data);
};

export const deleteAdminCategory = async (id: string | number) => {
  return await api.delete(`/admin/categories/${id}`);
};

// Genres
export const getAdminGenresList = async (params = {}) => {
  return await api.get(`/admin/genres`, { params });
};

export const getAdminGenre = async (id: string | number) => {
  return await api.get(`/admin/genres/${id}`);
};

export const createAdminGenre = async (data: any) => {
  return await api.post(`/admin/genres`, data);
};

export const updateAdminGenre = async (id: string | number, data: any) => {
  return await api.put(`/admin/genres/${id}`, data);
};

export const deleteAdminGenre = async (id: string | number) => {
  return await api.delete(`/admin/genres/${id}`);
};
