import type { AxiosError } from 'axios';

export function getApiErrorMessage<T = unknown>(
    error: AxiosError<T> | null | undefined,
): string | undefined {
    if (!error) {
        return undefined;
    }

    const responseData: unknown = error.response?.data;

    if (typeof responseData === 'string') {
        return responseData;
    }

    if (
        responseData &&
        typeof responseData === 'object' &&
        'message' in responseData &&
        typeof responseData.message === 'string'
    ) {
        return responseData.message;
    }

    return error.message;
}
