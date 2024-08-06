import type { Node as XYFlowNode, XYPosition } from '@xyflow/react';
import { nanoid } from 'nanoid';
import type {
    CreateFlowKitOptions,
    CreateFlowKitReturn,
    KitCustomNode,
} from './types';

export function defineKitNode<Data extends Record<string, unknown>>(
    node: KitCustomNode<Data>,
) {
    return node;
}

export const createKit = <
    NodeTypes extends KitCustomNode<any>[],
    EdgeTypes extends any[],
>({
    nodeTypes,
    edgeTypes,
    dataTypes,
}: CreateFlowKitOptions<NodeTypes, EdgeTypes>): CreateFlowKitReturn<
    NodeTypes,
    EdgeTypes
    > => {
    function defineNode<Node extends NodeTypes[number]>(
        label: Node['label'],
        data: ReturnType<Node['defaultData']>,
        position: XYPosition,
    ): XYFlowNode {
        return {
            id: nanoid(),
            position,
            data: data,
            type: label,
        };
    }
    return {
        nodeTypes,
        edgeTypes,
        dataTypes,
        defineNode,
    };
};

export { FlowKit, type FlowKitProps } from './component';
export type {
    KitCustomNode,
    CreateFlowKitOptions,
    CreateFlowKitReturn,
} from './types';
