import axios from 'axios';

const WILAYAH_API_URL = '/api/wilayah';

export interface WilayahRegion {
  code: string;
  name: string;
}

export const getProvinces = async (): Promise<WilayahRegion[]> => {
  const response = await axios.get(`${WILAYAH_API_URL}/provinces.json`);
  return response.data.data;
};

export const getRegencies = async (provinceCode: string): Promise<WilayahRegion[]> => {
  const response = await axios.get(`${WILAYAH_API_URL}/regencies/${provinceCode}.json`);
  return response.data.data;
};

export const getDistricts = async (regencyCode: string): Promise<WilayahRegion[]> => {
  const response = await axios.get(`${WILAYAH_API_URL}/districts/${regencyCode}.json`);
  return response.data.data;
};

export const getVillages = async (districtCode: string): Promise<WilayahRegion[]> => {
  const response = await axios.get(`${WILAYAH_API_URL}/villages/${districtCode}.json`);
  return response.data.data;
};
