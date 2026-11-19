import type { AxiosResponse } from 'axios';

export function getApiResponse<T>(response: AxiosResponse<{ data: T }>): T {
    return response.data.data;
}
