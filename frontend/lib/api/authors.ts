import api from "../api";

export interface ApiAuthor {
  id: number;
  name: string;
  slug: string;
  bio?: string;
  photo?: string;
  website?: string;
  email?: string;
  created_at?: string;
}

export const getAdminAuthorsList = async (params = {}) => {
  return await api.get(`/admin/authors`, { params });
};

export const getAdminAuthor = async (id: string | number) => {
  return await api.get(`/admin/authors/${id}`);
};

export const createAdminAuthor = async (data: any) => {
  return await api.post(`/admin/authors`, data);
};

export const updateAdminAuthor = async (id: string | number, data: any) => {
  return await api.put(`/admin/authors/${id}`, data);
};

export const deleteAdminAuthor = async (id: string | number) => {
  return await api.delete(`/admin/authors/${id}`);
};
