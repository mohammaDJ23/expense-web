import { useCallback, useEffect, useState, type ReactElement } from 'react';
import { getErrorMessage } from 'react-error-boundary';
import { useNavigate, useParams } from 'react-router';

import { useDeleteBill } from '@/api/orval/generated/endpoints/bill';
import { invalidateBillQueries } from '@/features/bill/shared/utils/invalidateBillQueries';
import Button from '@/features/shared/components/atoms/Button';
import Message from '@/features/shared/components/atoms/Message';
import Typography from '@/features/shared/components/atoms/Typography';
import Modal from '@/features/shared/components/molecules/Modal';

function DeleteBillButton(): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const params = useParams();

    const id = params.id;

    const request = useDeleteBill();
    const isPending = request.isPending;

    const onDeleteClick = useCallback(() => {
        if (id && !isPending) {
            request.reset();

            request
                .mutateAsync({ id })
                .then(() => invalidateBillQueries())
                .then(() => setIsOpen(false))
                .then(() => request.reset())
                .then(() => navigate('/bills'));
        }
    }, [request, isPending, id, navigate]);

    useEffect(() => {
        if (!isOpen && !isPending) {
            request.reset();
        }
    }, [isOpen, isPending]);

    const errorMessage = getErrorMessage(request.error);

    return (
        <>
            <Button onClick={() => !isPending && setIsOpen(true)} variant="danger">
                Delete
            </Button>
            <Modal isOpen={isOpen} onClose={() => !isPending && setIsOpen(false)}>
                <div className="flex flex-col gap-4">
                    <Typography truncate={false} variant="heading-4" className="text-center">
                        Are you sure to delete the bill?
                    </Typography>
                    <div className="flex items-center justify-center gap-4">
                        <Button
                            variant="danger"
                            className="flex-1"
                            onClick={onDeleteClick}
                            disabled={isPending}
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={() => !isPending && setIsOpen(false)}
                            variant="secondary"
                            className="flex-1"
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                    </div>
                    <Message message={errorMessage} variant="error" />
                </div>
            </Modal>
        </>
    );
}

export default DeleteBillButton;
