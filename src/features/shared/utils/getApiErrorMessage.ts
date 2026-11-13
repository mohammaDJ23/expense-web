import type { AxiosError } from 'axios';

export function getApiErrorMessage<T>(error: AxiosError<T> | null | undefined): string | undefined {
    if (!error) {
        return undefined;
    }

    const responseData = error.response?.data;

    if (typeof responseData === 'string') {
        return responseData;
    }

    if (responseData && typeof responseData === 'object') {
        if (
            'data' in responseData &&
            responseData.data &&
            typeof responseData.data === 'object' &&
            'message' in responseData.data &&
            typeof responseData.data.message === 'string'
        ) {
            return responseData.data.message;
        }

        if ('message' in responseData && typeof responseData.message === 'string') {
            return responseData.message;
        }
    }

    return error.message;
}
