import { create } from 'zustand';
import { getCart, addToCart, updateCartQuantity, removeFromCart } from '@/lib/api/store';
import { toast } from 'sonner';

interface CartItem {
    id: number;
    book_id: number;
    title: string;
    author: string | null;
    cover_image: string | null;
    price: number;
    quantity: number;
    subtotal: number;
    stock: number;
    weight: number;
}

interface CartState {
    id: number | null;
    items: CartItem[];
    subtotal: number;
    total_weight: number;
    item_count: number;
    isLoading: boolean;
    isCartOpen: boolean;
    fetchCart: () => Promise<void>;
    addItem: (bookId: number, quantity?: number) => Promise<void>;
    updateQuantity: (itemId: number, quantity: number) => Promise<void>;
    removeItem: (itemId: number) => Promise<void>;
    toggleCart: (isOpen?: boolean) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
    id: null,
    items: [],
    subtotal: 0,
    total_weight: 0,
    item_count: 0,
    isLoading: false,
    isCartOpen: false,

    toggleCart: (isOpen) => set((state) => ({ isCartOpen: isOpen !== undefined ? isOpen : !state.isCartOpen })),

    fetchCart: async () => {
        set({ isLoading: true });
        try {
            const data = await getCart();
            set({
                id: data.id,
                items: data.items,
                subtotal: data.subtotal,
                total_weight: data.total_weight,
                item_count: data.item_count,
            });
        } catch (error: any) {
            console.error('Failed to fetch cart', error);
        } finally {
            set({ isLoading: false });
        }
    },

    addItem: async (bookId: number, quantity: number = 1) => {
        set({ isLoading: true });
        try {
            const data = await addToCart(bookId, quantity);
            set({
                id: data.data.id,
                items: data.data.items,
                subtotal: data.data.subtotal,
                total_weight: data.data.total_weight,
                item_count: data.data.item_count,
                isCartOpen: true, // open cart drawer on add
            });
            toast.success(data.message || 'Item added to cart');
        } catch (error: any) {
            const msg = error.response?.data?.message || 'Failed to add item';
            toast.error(msg);
        } finally {
            set({ isLoading: false });
        }
    },

    updateQuantity: async (itemId: number, quantity: number) => {
        set({ isLoading: true });
        try {
            const data = await updateCartQuantity(itemId, quantity);
            set({
                id: data.data.id,
                items: data.data.items,
                subtotal: data.data.subtotal,
                total_weight: data.data.total_weight,
                item_count: data.data.item_count,
            });
        } catch (error: any) {
            const msg = error.response?.data?.message || 'Failed to update quantity';
            toast.error(msg);
        } finally {
            set({ isLoading: false });
        }
    },

    removeItem: async (itemId: number) => {
        set({ isLoading: true });
        try {
            const data = await removeFromCart(itemId);
            set({
                id: data.data.id,
                items: data.data.items,
                subtotal: data.data.subtotal,
                total_weight: data.data.total_weight,
                item_count: data.data.item_count,
            });
            toast.success('Item removed from cart');
        } catch (error: any) {
            toast.error('Failed to remove item');
        } finally {
            set({ isLoading: false });
        }
    },
}));
