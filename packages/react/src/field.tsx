import type { KitDataType } from "@akrc/flowkit";
import {
    Handle,
    type HandleProps,
    type IsValidConnection,
    type Node,
    useReactFlow,
} from "@xyflow/react";
import { useEffect, useId } from "react";
import type { KitNodeDataInternal } from "./node";
import { useNodeContext } from "./node-context";

export interface CommonHandleProps<T extends KitDataType<any>>
    extends HandleProps {
    dataType: T;
}

export function CommonHandle<T extends KitDataType<any>>(
    props: CommonHandleProps<T>
) {
    const { dataType, ...rest } = props;
    const id = useId();
    const instance = useReactFlow();
    const { id: nodeId } = useNodeContext();
    const node = instance.getNode(nodeId);
    useEffect(() => {
        const nodeData = node?.data as KitNodeDataInternal;
        const hasCurrentHandle = nodeData.kit.handles.some(
            (handle) => handle.id === id
        );
        if (!hasCurrentHandle) {
            instance.updateNode(nodeId, (node) => {
                const data = node.data as KitNodeDataInternal;
                data.kit.handles.push({
                    id,
                    ...props,
                });
                return node;
            });
        }
        return () => {
            instance.updateNode(nodeId, (node) => {
                const data = node.data as KitNodeDataInternal;
                data.kit.handles = data.kit.handles.filter(
                    (handle) => handle.id !== id
                );
                return node;
            });
        };
    }, []);
    const isValidConnection: IsValidConnection = (connection) => {
        const targetNode = instance.getNode(
            connection.target
        ) as Node<KitNodeDataInternal>;
        const targetNodeData = targetNode?.data;
        if (!targetNodeData) return false;
        const targetHandle = targetNodeData.kit.handles.find(
            (handle) => handle.id === connection.targetHandle
        );
        return targetHandle?.dataType === dataType;
    };
    return (
        <Handle
            {...rest}
            id={id}
            style={{
                position: "initial",
                ...props.style,
            }}
            isValidConnection={isValidConnection}
        />
    );
}
