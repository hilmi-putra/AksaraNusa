import api from '../api';

export const getCart = async () => {
    const response = await api.get('/store/cart');
    return response.data;
};

export const addToCart = async (bookId: number, quantity: number = 1) => {
    const response = await api.post('/store/cart', { book_id: bookId, quantity });
    return response.data;
};

export const updateCartQuantity = async (itemId: number, quantity: number) => {
    const response = await api.patch(`/store/cart/${itemId}`, { quantity });
    return response.data;
};

export const removeFromCart = async (itemId: number) => {
    const response = await api.delete(`/store/cart/${itemId}`);
    return response.data;
};

export const clearCart = async () => {
    const response = await api.delete('/store/cart');
    return response.data;
};

export const getWishlist = async () => {
    const response = await api.get('/store/wishlist');
    return response.data;
};

export const toggleWishlist = async (bookId: number) => {
    const response = await api.post('/store/wishlist/toggle', { book_id: bookId });
    return response.data;
};

export const checkWishlist = async (bookId: number) => {
    const response = await api.get(`/store/wishlist/check/${bookId}`);
    return response.is_wishlisted;
};

export const getCheckoutSummary = async (data: { address_id: number, shipping_zone_id?: number, use_insurance?: boolean }) => {
    const response = await api.post('/store/checkout/summary', data);
    return response.data;
};

export const processCheckout = async (data: { 
    address_id: number; 
    shipping_cost: number;
    shipping_courier: string;
    shipping_service: string;
    shipping_etd?: string;
    use_insurance?: boolean 
}) => {
    const response = await api.post('/store/checkout/process', data);
    return response.data;
};

export const getShippingRates = async (province_id: string, city_id: string) => {
    const response = await api.post('/store/checkout/shipping-rates', { province_id, city_id });
    return response.data;
};
