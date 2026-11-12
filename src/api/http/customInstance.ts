import axios, { type AxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export function customInstance<T = unknown, D = unknown>(
    config: AxiosRequestConfig<D>,
): Promise<AxiosResponse<T, D>> {
    return axiosInstance.request<T, AxiosResponse<T, D>, D>(config);
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export type ErrorType<T> = AxiosError<T>;
