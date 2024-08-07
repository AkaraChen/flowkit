import type {
    EdgeProps,
    Edge as XYFlowEdge,
    Node as XYFlowNode,
    XYPosition,
} from "@xyflow/react";
import { nanoid } from "nanoid";
import type { FC } from "react";
import type {
    CreateFlowKitOptions,
    CreateFlowKitReturn,
    KitCustomNode,
} from "./types";

export function defineKitNode<Data extends Record<string, unknown>>(
    node: KitCustomNode<Data>
) {
    return node;
}

export function defineKitEdge(edge: FC<EdgeProps>) {
    return edge;
}

export const createKit = <
    NodeTypes extends Record<string, KitCustomNode<any>>,
    EdgeTypes extends Record<string, FC<EdgeProps>>
>({
    nodeTypes,
    edgeTypes,
    dataTypes,
}: CreateFlowKitOptions<NodeTypes, EdgeTypes>): CreateFlowKitReturn<
    NodeTypes,
    EdgeTypes
> => {
    function defineNode<K extends keyof NodeTypes>(
        label: K,
        data: ReturnType<NodeTypes[K]["defaultData"]>,
        position: XYPosition
    ): XYFlowNode {
        return {
            id: nanoid(),
            position,
            data: data,
            type: label as string,
        };
    }
    function defineEdge(
        label: keyof EdgeTypes,
        options: Pick<EdgeProps, "source" | "target">
    ): XYFlowEdge {
        return {
            id: nanoid(),
            type: label as string,
            ...options,
        };
    }
    return {
        nodeTypes,
        edgeTypes,
        dataTypes,
        defineNode,
        defineEdge,
    };
};

export { FlowKit, type FlowKitProps } from "./component";
export type {
    KitCustomNode,
    CreateFlowKitOptions,
    CreateFlowKitReturn,
} from "./types";
export {
    BezierEdge,
    SimpleBezierEdge,
    StraightEdge,
    SmoothStepEdge,
} from "./edge";
