import type { KitDataType } from '@akrc/flowkit';
import {
    Handle,
    type HandleProps,
    type IsValidConnection,
    type Node,
    Position,
    useReactFlow,
} from '@xyflow/react';
import type { BaseHandleMeta, KitNodeDataWithInternal } from './node';
import { useNodeContext } from './node-context';

export interface CommonHandleProps<T extends KitDataType<any>>
    extends Omit<HandleProps, 'position'> {
    dataType: T;
    name: string;
}

export function CommonHandle<T extends KitDataType<any>>(
    props: CommonHandleProps<T>,
) {
    const { dataType, name, ...rest } = props;
    const { id: nodeId } = useNodeContext();
    const id = `${name}@${nodeId}`;
    const instance = useReactFlow();
    const isValidConnection: IsValidConnection = (connection) => {
        const targetNode = instance.getNode(connection.target) as Node<
            KitNodeDataWithInternal<Record<string, BaseHandleMeta>>
        >;
        const targetNodeData = targetNode?.data;
        if (!targetNodeData) return false;
        const targetHandle = Object.values(targetNodeData.kit.handles).find(
            (handle) =>
                connection.targetHandle ===
                `${handle.name}@${connection.target}`,
        );
        return targetHandle?.dataType === dataType;
    };
    return (
        <Handle
            {...rest}
            position={Position.Bottom}
            id={id}
            style={{
                position: 'initial',
                ...props.style,
            }}
            isValidConnection={isValidConnection}
        />
    );
}
