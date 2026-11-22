import {
    getFindBillListQueryKey,
    getFindBillsPeriodQueryKey,
    getFindBillsTimelineQueryKey,
    getFindBillsTotalAmountQueryKey,
    getFindMostUsedConsumersQueryKey,
    getFindMostUsedLocationsQueryKey,
    getFindMostUsedReceiversQueryKey,
    getFindTotalBillsQueryKey,
} from '@/api/orval/generated/endpoints/bill';
import { getGlobalSearchQueryKey } from '@/api/orval/generated/endpoints/search';
import { queryClient } from '@/app/providers/QueryProvider';

export function invalidateBillQueries() {
    return Promise.all([
        queryClient.invalidateQueries({ queryKey: getFindBillListQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getFindTotalBillsQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getGlobalSearchQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getFindBillsPeriodQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getFindBillsTimelineQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getFindBillsTotalAmountQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getFindMostUsedConsumersQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getFindMostUsedLocationsQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getFindMostUsedReceiversQueryKey() }),
    ]);
}
