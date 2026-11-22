import {
    Controller,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import Typography from '@/features/shared/components/atoms/Typography';

import type { ReactElement } from 'react';

interface IProps<TData extends FieldValues> extends ControllerProps<TData, FieldPath<TData>> {}

function FormController<TData extends FieldValues>({
    control,
    name,
    render,
}: Readonly<IProps<TData>>): ReactElement {
    return (
        <Controller
            control={control}
            name={name}
            render={({ fieldState, ...props }) => (
                <div className="flex flex-col gap-1">
                    {render({ fieldState, ...props })}
                    {fieldState.error?.message && (
                        <Typography variant="caption" className="text-error">
                            {fieldState.error.message}
                        </Typography>
                    )}
                </div>
            )}
        />
    );
}

export default FormController;
