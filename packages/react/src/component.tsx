import { ReactFlow, type ReactFlowProps } from '@xyflow/react';
import type { FC, ReactNode } from 'react';
import type { KitCustomNode } from './types';

export type FlowKitProps<
    NodeType extends KitCustomNode<any> = KitCustomNode<any>,
> = Omit<ReactFlowProps, 'nodeTypes' | 'edgeTypes'> & {
    nodeTypes: NodeType[];
};

export function FlowKit<NodeType extends KitCustomNode<any>>(
    props: FlowKitProps<NodeType>,
): ReactNode {
    const { children, nodeTypes, ...rest } = props;
    return (
        <ReactFlow
            {...rest}
            nodeTypes={nodeTypes.reduce(
                (acc, node) => {
                    acc[node.label] = node.fc;
                    return acc;
                },
                {} as Record<string, FC<any>>,
            )}
        >
            {children}
        </ReactFlow>
    );
}
