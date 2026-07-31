import api from "../api";

export interface SearchResultItem {
  id: number;
  type: 'book' | 'article';
  title: string;
  slug: string;
  thumbnail: string | null;
  author: string;
  category: string;
  price?: number;
  publish_date?: string;
}

export interface SearchResponse {
  success: boolean;
  data: {
    books: SearchResultItem[];
    articles: SearchResultItem[];
  };
}

export const getGlobalSearch = async (query: string): Promise<SearchResponse> => {
  const response = await api.get('/public/search', { params: { q: query } });
  return response as unknown as SearchResponse;
};
