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
        const currentIsSource = connection.source === nodeId;
        const anotherNode = instance.getNode(
            currentIsSource ? connection.target : connection.source,
        ) as Node<KitNodeDataWithInternal<Record<string, BaseHandleMeta>>>;
        const anotherNodeData = anotherNode?.data;
        const anotherHandle = Object.values(anotherNodeData.kit.handles).find(
            (handle) =>
                currentIsSource
                    ? connection.targetHandle ===
                      `${handle.name}@${connection.target}`
                    : connection.sourceHandle ===
                      `${handle.name}@${connection.source}`,
        );
        return anotherHandle?.dataType.name === dataType.name;
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
