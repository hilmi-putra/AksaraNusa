import api from '../api';

export const getProvinces = async () => {
    const response = await api.get('/public/shipping/provinces');
    return response.data;
};

export const getCities = async (provinceId: string) => {
    const response = await api.get(`/public/shipping/cities/${provinceId}`);
    return response.data;
};

export const getDistricts = async (cityId: string) => {
    const response = await api.get(`/public/shipping/districts/${cityId}`);
    return response.data;
};

export const getSubdistricts = async (districtId: string) => {
    const response = await api.get(`/public/shipping/subdistricts/${districtId}`);
    return response.data;
};

export const getShippingCost = async (destinationInfo: any, weight: number, courier?: string) => {
    const payload: any = { destination: destinationInfo, weight };
    if (courier) {
        payload.courier = courier;
    }
    const response = await api.post('/store/shipping/cost', payload);
    return response.data.data || response.data;
};

export const getPaymentConfig = async () => {
    const response = await api.get('/public/payment/config');
    return response;
};
