import { create } from 'zustand';
import { Book } from '@/types/book';
import { getCart, addToCart, updateCartQuantity, removeFromCart } from '@/lib/api/store';
import { toast } from 'sonner';

export interface CartItemType {
  id: string; // we'll use API's cart_item_id as string or stringified number
  book: Book;
  quantity: number;
}

interface CartStore {
  isOpen: boolean;
  items: CartItemType[];
  subtotal: number;
  total_weight: number;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  fetchCart: () => Promise<void>;
  addItem: (book: Book, quantity?: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
}

const mapApiToCartItem = (apiItem: any): CartItemType => ({
  id: apiItem.id.toString(),
  book: {
    id: apiItem.book_id.toString(),
    title: apiItem.title,
    author: apiItem.author || '',
    category: '', // API doesn't return this yet, could be joined in backend
    price: apiItem.price,
    coverUrl: apiItem.cover_image || '',
    slug: '',
    stock: apiItem.stock,
    isNew: false,
    isBestseller: false,
  },
  quantity: apiItem.quantity,
});

export const useCartStore = create<CartStore>((set, get) => ({
  isOpen: false,
  items: [],
  subtotal: 0,
  total_weight: 0,
  isLoading: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const data = await getCart();
      if (data) {
        set({
          items: data.items.map(mapApiToCartItem),
          subtotal: data.subtotal,
          total_weight: data.total_weight,
        });
      }
    } catch (error) {
      console.error('Failed to fetch cart', error);
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (book: Book, quantity = 1) => {
    set({ isLoading: true });
    try {
      // Optimistic update
      const existing = get().items.find(i => i.book.id === book.id);
      if (!existing) {
        set(state => ({ items: [...state.items, { id: 'temp-' + book.id, book, quantity }] }));
      }

      const response = await addToCart(Number(book.id), quantity);

      if (response) {
        set({
          items: response.items.map(mapApiToCartItem),
          subtotal: response.subtotal,
          total_weight: response.total_weight,
          isOpen: true
        });
        toast.success('Item added to cart');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add item');
      // Revert could be implemented here
      get().fetchCart();
    } finally {
      set({ isLoading: false });
    }
  },

  removeItem: async (id: string) => {
    set({ isLoading: true });
    try {
      // Optimistic
      set(state => ({ items: state.items.filter(i => i.id !== id) }));

      const response = await removeFromCart(Number(id));
      if (response) {
        set({
          items: response.items.map(mapApiToCartItem),
          subtotal: response.subtotal,
          total_weight: response.total_weight,
        });
        toast.success('Item removed');
      }
    } catch (error) {
      toast.error('Failed to remove item');
      get().fetchCart();
    } finally {
      set({ isLoading: false });
    }
  },

  updateQuantity: async (id: string, quantity: number) => {
    if (quantity < 1) return;

    // Optimistic update
    set((state) => {
      const newItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      // Optional: recalculate subtotal optimistically if you want it to be perfectly smooth
      const newSubtotal = newItems.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
      return { items: newItems, subtotal: newSubtotal, isLoading: true };
    });

    try {
      const response = await updateCartQuantity(Number(id), quantity);
      if (response) {
        set({
          items: response.items.map(mapApiToCartItem),
          subtotal: response.subtotal,
          total_weight: response.total_weight,
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update quantity');
      // Revert on error
      get().fetchCart();
    } finally {
      set({ isLoading: false });
    }
  },
}));
