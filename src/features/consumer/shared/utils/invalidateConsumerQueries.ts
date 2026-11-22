import {
    getFindConsumerListQueryKey,
    getFindTotalConsumersQueryKey,
    getSearchConsumersQueryKey,
} from '@/api/orval/generated/endpoints/consumer';
import { getGlobalSearchQueryKey } from '@/api/orval/generated/endpoints/search';
import { queryClient } from '@/app/providers/QueryProvider';

export function invalidateConsumerQueries() {
    return Promise.all([
        queryClient.invalidateQueries({ queryKey: getFindConsumerListQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getFindTotalConsumersQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getSearchConsumersQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getGlobalSearchQueryKey() }),
    ]);
}
