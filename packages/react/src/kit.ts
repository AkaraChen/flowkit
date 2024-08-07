import type {
    EdgeProps,
    Edge as XYFlowEdge,
    Node as XYFlowNode,
} from '@xyflow/react';
import type { XYPosition } from '@xyflow/system';
import { nanoid } from 'nanoid';
import type { KitCustomEdge } from './edge';
import type { KitCustomNode } from './node';

export interface CreateFlowKitReturn<
    NodeTypes extends Record<string, KitCustomNode<any>>,
    EdgeTypes extends Record<string, KitCustomEdge<any>>,
> {
    nodeTypes: NodeTypes;
    edgeTypes: EdgeTypes;
    defineNode<K extends keyof NodeTypes>(
        label: K,
        data: ReturnType<NodeTypes[K]['defaultData']>,
        position: XYPosition,
    ): XYFlowNode;
    defineEdge<K extends keyof EdgeTypes>(
        label: K,
        data: ReturnType<EdgeTypes[K]['defaultData']>,
        options: Pick<EdgeProps, 'source' | 'target'>,
    ): XYFlowEdge;
}

export type CreateFlowKitOptions<NodeTypes, EdgeTypes> = {
    nodeTypes: Readonly<NodeTypes>;
    edgeTypes: EdgeTypes;
};

export const createKit = <
    NodeTypes extends Record<string, KitCustomNode<any>>,
    EdgeTypes extends Record<string, KitCustomEdge<any>>,
>({
    nodeTypes,
    edgeTypes,
}: CreateFlowKitOptions<NodeTypes, EdgeTypes>): CreateFlowKitReturn<
    NodeTypes,
    EdgeTypes
> => {
    function defineNode<K extends keyof NodeTypes>(
        label: K,
        data: ReturnType<NodeTypes[K]['defaultData']>,
        position: XYPosition,
    ): XYFlowNode {
        return {
            id: nanoid(),
            position,
            data: data,
            type: label as string,
        };
    }
    function defineEdge<K extends keyof EdgeTypes>(
        label: K,
        data: ReturnType<EdgeTypes[K]['defaultData']>,
        options: Pick<EdgeProps, 'source' | 'target'>,
    ): XYFlowEdge {
        return {
            id: nanoid(),
            type: label as string,
            data,
            source: options.source,
            target: options.target,
        };
    }
    return {
        nodeTypes,
        edgeTypes,
        defineNode,
        defineEdge,
    };
};
