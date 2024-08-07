import { defineKitNode } from '@akrc/flowkit-react';
import { Handle, Position } from '@xyflow/react';
import { NodeLayout } from './layout';

const mathMinNode = defineKitNode<{
    left: number;
    right: number;
}>({
    defaultData() {
        return {
            left: 0,
            right: 1,
        };
    },
    fc({ data }) {
        return (
            <NodeLayout>
                <div>Math min</div>
                <div>
                    {data.left} &lt; {data.right}
                </div>
                <Handle type='source' position={Position.Bottom} />
            </NodeLayout>
        );
    },
});

const textJoin = defineKitNode<{
    left: string;
    right: string;
}>({
    defaultData() {
        return {
            left: 'Hello',
            right: 'World',
        };
    },
    fc({ data }) {
        return (
            <NodeLayout>
                <div>Text join</div>
                <div>
                    {data.left}, {data.right}
                </div>
                <Handle type='target' position={Position.Top} />
            </NodeLayout>
        );
    },
});

export const nodeTypes = {
    'math-min': mathMinNode,
    'text-join': textJoin,
};
