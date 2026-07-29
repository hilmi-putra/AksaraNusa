import api from "../api";

// Types
export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  color?: string;
  icon?: string;
  description?: string;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogAuthor {
  id: number;
  name: string;
  slug: string;
  avatar?: string;
  bio?: string;
  social_media?: any;
}

export interface BlogCTA {
  id: number;
  name: string;
  title: string;
  description?: string;
  button_text: string;
  button_link: string;
  image?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  thumbnail?: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  is_featured: boolean;
  publish_date?: string;
  reading_time: number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical_url?: string;
  og_image?: string;
  view_count: number;
  blog_category_id?: number;
  blog_author_id?: number;
  blog_cta_id?: number;
  category?: BlogCategory;
  author?: BlogAuthor;
  cta?: BlogCTA;
  tags?: BlogTag[];
  created_at: string;
}

// ---------------- Admin API ----------------

// Categories
export const getAdminBlogCategories = async (params = {}) => {
  return await api.get(`/admin/blog-categories`, { params });
};
export const getAdminBlogCategory = async (id: string | number) => {
  return await api.get(`/admin/blog-categories/${id}`);
};
export const createAdminBlogCategory = async (data: any) => {
  return await api.post(`/admin/blog-categories`, data);
};
export const updateAdminBlogCategory = async (id: string | number, data: any) => {
  return await api.put(`/admin/blog-categories/${id}`, data);
};
export const deleteAdminBlogCategory = async (id: string | number) => {
  return await api.delete(`/admin/blog-categories/${id}`);
};

// Tags
export const getAdminBlogTags = async (params = {}) => {
  return await api.get(`/admin/blog-tags`, { params });
};
export const getAdminBlogTag = async (id: string | number) => {
  return await api.get(`/admin/blog-tags/${id}`);
};
export const createAdminBlogTag = async (data: any) => {
  return await api.post(`/admin/blog-tags`, data);
};
export const updateAdminBlogTag = async (id: string | number, data: any) => {
  return await api.put(`/admin/blog-tags/${id}`, data);
};
export const deleteAdminBlogTag = async (id: string | number) => {
  return await api.delete(`/admin/blog-tags/${id}`);
};

// Authors
export const getAdminBlogAuthors = async (params = {}) => {
  return await api.get(`/admin/blog-authors`, { params });
};
export const getAdminBlogAuthor = async (id: string | number) => {
  return await api.get(`/admin/blog-authors/${id}`);
};
export const createAdminBlogAuthor = async (data: any) => {
  return await api.post(`/admin/blog-authors`, data);
};
export const updateAdminBlogAuthor = async (id: string | number, data: any) => {
  return await api.put(`/admin/blog-authors/${id}`, data);
};
export const deleteAdminBlogAuthor = async (id: string | number) => {
  return await api.delete(`/admin/blog-authors/${id}`);
};

// CTAs
export const getAdminBlogCTAs = async (params = {}) => {
  return await api.get(`/admin/blog-ctas`, { params });
};
export const getAdminBlogCTA = async (id: string | number) => {
  return await api.get(`/admin/blog-ctas/${id}`);
};
export const createAdminBlogCTA = async (data: any) => {
  return await api.post(`/admin/blog-ctas`, data);
};
export const updateAdminBlogCTA = async (id: string | number, data: any) => {
  return await api.put(`/admin/blog-ctas/${id}`, data);
};
export const deleteAdminBlogCTA = async (id: string | number) => {
  return await api.delete(`/admin/blog-ctas/${id}`);
};

// Posts
export const getAdminBlogPosts = async (params = {}) => {
  return await api.get(`/admin/blog-posts`, { params });
};
export const getAdminBlogPost = async (id: string | number) => {
  return await api.get(`/admin/blog-posts/${id}`);
};
export const createAdminBlogPost = async (data: any) => {
  return await api.post(`/admin/blog-posts`, data);
};
export const updateAdminBlogPost = async (id: string | number, data: any) => {
  return await api.put(`/admin/blog-posts/${id}`, data);
};
export const deleteAdminBlogPost = async (id: string | number) => {
  return await api.delete(`/admin/blog-posts/${id}`);
};
export const duplicateAdminBlogPost = async (id: string | number) => {
  return await api.post(`/admin/blog-posts/${id}/duplicate`);
};

// ---------------- Public API ----------------

export const getPublicBlogPosts = async (params = {}) => {
  return await api.get(`/public/blog/posts`, { params });
};
export const getPublicBlogPost = async (slug: string) => {
  return await api.get(`/public/blog/posts/${slug}`);
};
export const getPublicBlogCategories = async () => {
  return await api.get(`/public/blog/categories`);
};
export const getPublicBlogFeatured = async () => {
  return await api.get(`/public/blog/featured`);
};
export const getPublicBlogPopular = async () => {
  return await api.get(`/public/blog/popular`);
};
