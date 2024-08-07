import type { DataType } from "@akrc/flowkit";
import type {
    EdgeProps,
    Node as XYFlowNode,
    Edge as XYFlowEdge,
} from "@xyflow/react";
import type { NodeBase, NodeProps, XYPosition } from "@xyflow/system";
import type { ComponentProps, FC } from "react";

export interface KitCustomNode<Data extends Record<string, unknown>> {
    fc: FC<NodeProps<NodeBase<Data>>>;
    defaultData: () => Data;
}

export interface CreateFlowKitReturn<
    NodeTypes extends Record<string, KitCustomNode<any>>,
    EdgeTypes extends Record<string, FC<EdgeProps>>
> {
    nodeTypes: NodeTypes;
    edgeTypes: EdgeTypes;
    dataTypes: DataType[];
    defineNode<K extends keyof NodeTypes>(
        label: K,
        data: ReturnType<NodeTypes[K]["defaultData"]>,
        position: XYPosition
    ): XYFlowNode;
    defineEdge: (
        label: keyof EdgeTypes,
        options: Pick<EdgeProps, "source" | "target">
    ) => XYFlowEdge;
}

export type CreateFlowKitOptions<NodeTypes, EdgeTypes> = {
    nodeTypes: Readonly<NodeTypes>;
    edgeTypes: EdgeTypes;
    dataTypes: DataType[];
};
