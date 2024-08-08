import type { NodeBase, NodeProps } from '@xyflow/system';
import type { FC } from 'react';
import type { CommonHandleProps } from './field';
import { NodeContextProvider } from './node-context';

export type KitInternalNodeData = {
    handles: CommonHandleProps<any>[];
};

export type KitNodeDataInternal = {
    kit: KitInternalNodeData;
};

export interface KitCustomNode<Data extends Record<string, unknown>> {
    fc: FC<NodeProps<NodeBase<KitNodeDataInternal & Data>>>;
    defaultData: () => Data;
}

export function defineKitNode<Data extends Record<string, unknown>>(
    node: KitCustomNode<Data>,
) {
    const defaultData = (): Data & KitNodeDataInternal => {
        const data = node.defaultData();
        return {
            ...data,
            kit: {
                handles: [],
            } as KitInternalNodeData,
        };
    };
    const fc: typeof node.fc = (props) => {
        const FC = node.fc;
        return (
            <NodeContextProvider
                value={{
                    id: props.id,
                }}
            >
                <FC {...props} />
            </NodeContextProvider>
        );
    };
    return {
        ...node,
        fc,
        defaultData,
    };
}
