import { type FlowKitProps, createKit } from "@akrc/flowkit-react";
import { edgeTypes } from "./edge";
import { nodeTypes } from "./node";

const kit = createKit({
    nodeTypes,
    edgeTypes,
    dataTypes: [],
});

const node1 = kit.defineNode(
    "math-min",
    {
        left: 1,
        right: 1,
    },
    {
        x: 200,
        y: 200,
    }
);

const node2 = kit.defineNode(
    "text-join",
    {
        left: "Hello",
        right: "World",
    },
    {
        x: 200,
        y: 400,
    }
);

const edge = kit.defineEdge("bazier", {
    source: node1.id,
    target: node2.id,
});

export default {
    nodes: [node1, node2],
    edges: [edge],
    edgeTypes,
    nodeTypes,
} satisfies FlowKitProps;
