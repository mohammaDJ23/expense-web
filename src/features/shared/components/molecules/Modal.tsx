import BaseModal from 'react-modal';

import Card from '@/features/shared/components/atoms/Card';

import type { ReactNode } from 'react';

interface IProps {
    isOpen: boolean;
    children: ReactNode;
    onClose(): void;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
}

function Modal({
    isOpen,
    onClose,
    children,
    closeOnOverlayClick = true,
    closeOnEscape = true,
}: Readonly<IProps>) {
    return (
        <BaseModal
            isOpen={isOpen}
            onRequestClose={onClose}
            shouldCloseOnOverlayClick={closeOnOverlayClick}
            shouldCloseOnEsc={closeOnEscape}
            overlayClassName={{
                base: `
                    fixed inset-0 z-50
                    flex items-center justify-center
                    bg-overlay p-4
                    opacity-0 transition-opacity duration-200
                `,
                afterOpen: 'opacity-100',
                beforeClose: 'opacity-0',
            }}
            className={{
                base: `
                    w-full max-w-lg
                    outline-none
                    opacity-0 scale-95
                    transition-all duration-200
                `,
                afterOpen: 'opacity-100 scale-100',
                beforeClose: 'opacity-0 scale-95',
            }}
        >
            <Card>{children}</Card>
        </BaseModal>
    );
}

export default Modal;
