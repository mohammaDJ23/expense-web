import {
    getFindLocationListQueryKey,
    getFindLocationQueryKey,
    getFindTotalLocationsQueryKey,
    getSearchLocationsQueryKey,
} from '@/api/orval/generated/endpoints/location';
import { getGlobalSearchQueryKey } from '@/api/orval/generated/endpoints/search';
import { queryClient } from '@/app/providers/QueryProvider';

export function invalidateLocationQueries(id?: string) {
    return Promise.all([
        queryClient.invalidateQueries({ queryKey: getFindLocationListQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getFindTotalLocationsQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getSearchLocationsQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getGlobalSearchQueryKey() }),
        id && queryClient.invalidateQueries({ queryKey: getFindLocationQueryKey(id) }),
    ]);
}
