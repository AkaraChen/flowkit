import type { DataType } from '@akrc/flowkit';
import type { Node as XYFlowNode } from '@xyflow/react';
import type { NodeBase, NodeProps, XYPosition } from '@xyflow/system';
import type { ComponentProps, FC } from 'react';

export interface KitCustomNode<Data extends Record<string, unknown>> {
    fc: FC<NodeProps<NodeBase<Data>>>;
    defaultData: () => Data;
    label: string;
}

export interface CreateFlowKitReturn<
    NodeTypes extends KitCustomNode<any>[],
    EdgeTypes extends any[],
> {
    nodeTypes: NodeTypes;
    edgeTypes: EdgeTypes;
    dataTypes: DataType[];
    defineNode: (
        label: NodeTypes[number]['label'],
        data: ComponentProps<NodeTypes[number]['fc']>['data'],
        position: XYPosition,
    ) => XYFlowNode;
}

export type CreateFlowKitOptions<NodeTypes, EdgeTypes> = {
    nodeTypes: Readonly<NodeTypes>;
    edgeTypes: EdgeTypes;
    dataTypes: DataType[];
};
