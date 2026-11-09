import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export function customInstance<T = unknown, D = unknown>(
    config: AxiosRequestConfig<D>,
): Promise<AxiosResponse<T, D>> {
    return axiosInstance.request<T, AxiosResponse<T, D>, D>(config);
}
