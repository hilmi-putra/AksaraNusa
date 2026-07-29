import api from '../api';

export const getDashboardSummary = async () => {
    const response = await api.get('/user/dashboard');
    return response;
};

export const getAddresses = async () => {
    const response = await api.get('/user/addresses');
    return response.data;
};

export const createAddress = async (data: any) => {
    const response = await api.post('/user/addresses', data);
    return response.data;
};

export const updateAddress = async (id: number, data: any) => {
    const response = await api.put(`/user/addresses/${id}`, data);
    return response.data;
};

export const deleteAddress = async (id: number) => {
    const response = await api.delete(`/user/addresses/${id}`);
    return response.data;
};

export const updateProfile = async (data: any) => {
    const response = await api.put('/user/profile', data);
    return response.data;
};

export const updatePassword = async (data: any) => {
    const response = await api.put('/user/password', data);
    return response.data;
};

export const getOrders = async () => {
    const response = await api.get('/store/orders');
    return response.data;
};

export const getOrder = async (id: number) => {
    const response = await api.get(`/store/orders/${id}`);
    return response.data;
};

export const getReviews = async () => {
    const response = await api.get('/store/reviews');
    return response.data;
};

export const submitReview = async (data: any) => {
    const response = await api.post('/store/reviews', data);
    return response.data;
};

export const syncPaymentStatus = async (transactionNumber: string) => {
    const response = await api.post(`/store/payment/sync/${transactionNumber}`);
    return response;
};

export const requestRefund = async (orderId: number, data: FormData) => {
    const response = await api.post(`/user/orders/${orderId}/refund`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
