import type { KitDataType } from '@akrc/flowkit';
import {
    Handle,
    type HandleProps,
    type IsValidConnection,
    type Node,
    Position,
    useNodeId,
    useReactFlow,
} from '@xyflow/react';
import type { BaseHandleMeta, KitNodeDataWithInternal } from './node';

export interface CommonHandleProps<T extends KitDataType<any>>
    extends Omit<HandleProps, 'position'> {
    dataType: T;
    name: string;
}

export function CommonHandle<T extends KitDataType<any>>(
    props: CommonHandleProps<T>,
) {
    const { dataType, name, ...rest } = props;
    const nodeId = useNodeId();
    const id = `${name}@${nodeId}`;
    const instance = useReactFlow();
    const isValidConnection: IsValidConnection = (connection) => {
        const isCurrentNodeSource = connection.source === nodeId;
        const connectedNode = instance.getNode(
            isCurrentNodeSource ? connection.target : connection.source,
        ) as Node<KitNodeDataWithInternal<Record<string, BaseHandleMeta>>>;
        const connectedNodeData = connectedNode?.data;
        const connectedHandle = Object.values(
            connectedNodeData.kit.handles,
        ).find((handle) => {
            if (isCurrentNodeSource) {
                return (
                    connection.targetHandle ===
                    `${handle.name}@${connection.target}`
                );
            }
            return (
                connection.sourceHandle ===
                `${handle.name}@${connection.source}`
            );
        });
        return connectedHandle?.dataType.name === dataType.name;
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
