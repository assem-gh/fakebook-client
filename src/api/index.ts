import axios from 'axios';
import { AxiosResponse, AxiosError } from 'axios';

import { loadState, Storage } from '../utils/localStorage';

const jwtToken = loadState(Storage.Jwt);

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    authorization: `Bearer ${jwtToken}`,
  },
});

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error.response?.data);
  }
);
