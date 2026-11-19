import { useCallback, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
    getExportBillsExcelQueryKey,
    useExportBillsExcel,
} from '@/api/orval/generated/endpoints/bill';
import Button from '@/features/shared/components/atoms/Button';
import Card from '@/features/shared/components/atoms/Card';
import Message from '@/features/shared/components/atoms/Message';
import Typography from '@/features/shared/components/atoms/Typography';
import { downloadBlob } from '@/features/shared/utils/downloadBlob';
import { getApiErrorMessage } from '@/features/shared/utils/getApiErrorMessage';

function ExportBills(): ReactNode {
    const queryClient = useQueryClient();

    const request = useExportBillsExcel({
        query: {
            enabled: false,
            select: (response) => response.data,
        },
    });

    const onButtonClick = useCallback(() => {
        queryClient
            .resetQueries({
                queryKey: getExportBillsExcelQueryKey(),
            })
            .then(() => {
                request
                    .refetch()
                    .then((response) => (response.data instanceof Blob ? response.data : undefined))
                    .then(
                        (data) =>
                            data && downloadBlob(data, `bills_${new Date().toISOString()}.xlsx`),
                    );
            });
    }, [request, queryClient]);

    const errorMessage = getApiErrorMessage(request.error);

    return (
        <Card className="flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-6 justify-between">
                <Typography>Download your bills as an excel file</Typography>
                <Button onClick={onButtonClick}>Download</Button>
            </div>
            <Message message={errorMessage} variant="error" />
        </Card>
    );
}

export default ExportBills;
