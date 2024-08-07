import { ReactFlow, type ReactFlowProps } from "@xyflow/react";
import type { FC, ReactNode } from "react";
import type { KitCustomEdge, KitCustomNode } from "./types";

export type FlowKitProps<
    NodeType extends KitCustomNode<any> = KitCustomNode<any>,
    EdgeType extends KitCustomEdge<any> = KitCustomEdge<any>
> = Omit<ReactFlowProps, "nodeTypes" | "edgeTypes"> & {
    nodeTypes: Record<string, NodeType>;
    edgeTypes: Record<string, EdgeType>;
};

export function FlowKit<NodeType extends KitCustomNode<any>>(
    props: FlowKitProps<NodeType>
): ReactNode {
    const { children, nodeTypes, edgeTypes, ...rest } = props;
    return (
        <ReactFlow
            {...rest}
            nodeTypes={Object.entries(nodeTypes).reduce(
                (acc, [label, nodeType]) => {
                    acc[label] = nodeType.fc;
                    return acc;
                },
                {} as Record<string, FC<any>>
            )}
            edgeTypes={Object.entries(edgeTypes).reduce(
                (acc, [label, edgeType]) => {
                    acc[label] = edgeType.fc;
                    return acc;
                },
                {} as Record<string, FC<any>>
            )}
        >
            {children}
        </ReactFlow>
    );
}
