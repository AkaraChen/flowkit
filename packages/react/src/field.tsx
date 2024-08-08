import type { KitDataType } from '@akrc/flowkit';
import { Handle, type HandleProps } from '@xyflow/react';
import { useId } from 'react';

export interface CommonHandleProps<T extends KitDataType<any>>
    extends HandleProps {
    dataType: T;
}

export interface HandleEmits {
    id: string;
    dataType: KitDataType<any>;
}

export function CommonHandle<T extends KitDataType<any>>(
    props: CommonHandleProps<T>,
) {
    const { dataType, ...rest } = props;
    const id = useId();
    return (
        <Handle
            {...rest}
            id={id}
            style={{
                position: 'initial',
                ...props.style,
            }}
        />
    );
}
