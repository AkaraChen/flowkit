import { type EdgeProps, ReactFlow, type ReactFlowProps } from '@xyflow/react';
import type { FC, ReactNode } from 'react';
import type { KitCustomNode } from './types';

export type FlowKitProps<
    NodeType extends KitCustomNode<any> = KitCustomNode<any>,
> = Omit<ReactFlowProps, 'nodeTypes'> & {
    nodeTypes: Record<string, NodeType>;
};

export function FlowKit<NodeType extends KitCustomNode<any>>(
    props: FlowKitProps<NodeType>,
): ReactNode {
    const { children, nodeTypes, ...rest } = props;
    return (
        <ReactFlow
            {...rest}
            nodeTypes={Object.entries(nodeTypes).reduce(
                (acc, [label, nodeType]) => {
                    acc[label] = nodeType.fc;
                    return acc;
                },
                {} as Record<string, FC<any>>,
            )}
            edgeTypes={props.edgeTypes}
        >
            {children}
        </ReactFlow>
    );
}
