import type { NodeBase, NodeProps } from '@xyflow/system';
import type { FC } from 'react';

export interface KitCustomNode<Data extends Record<string, unknown>> {
    fc: FC<NodeProps<NodeBase<Data>>>;
    defaultData: () => Data;
}

export function defineKitNode<Data extends Record<string, unknown>>(
    node: KitCustomNode<Data>,
) {
    return node;
}
