import {
    getFindReceiverListQueryKey,
    getFindTotalReceiversQueryKey,
    getSearchReceiversQueryKey,
} from '@/api/orval/generated/endpoints/receiver';
import { getGlobalSearchQueryKey } from '@/api/orval/generated/endpoints/search';
import { queryClient } from '@/app/providers/QueryProvider';

export function invalidateReceiverQueries() {
    return Promise.all([
        queryClient.invalidateQueries({ queryKey: getFindReceiverListQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getFindTotalReceiversQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getSearchReceiversQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getGlobalSearchQueryKey() }),
    ]);
}
