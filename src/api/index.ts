import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { loadState, Storage } from '../utils/localStorage';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const jwtToken = loadState(Storage.Jwt);
    if (!config.headers) {
      config.headers = {};
    }
    config.headers['authorization'] = `Bearer ${jwtToken}`;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error.response?.data);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error.response?.data);
  }
);
