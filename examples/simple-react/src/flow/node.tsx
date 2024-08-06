import { defineKitNode } from '@akrc/flowkit-react';

const mathMinNode = defineKitNode<{
    left: number;
    right: number;
}>({
    label: 'math-min',
    defaultData() {
        return {
            left: 0,
            right: 0,
        };
    },
    fc({ data }) {
        return (
            <div>
                <div>Math min</div>
                <div>
                    {data.left} &lt; {data.right}
                </div>
            </div>
        );
    },
});

const textJoin = defineKitNode<{
    left: string;
    right: string;
}>({
    label: 'text-join',
    defaultData() {
        return {
            left: '',
            right: '',
        };
    },
    fc({ data }) {
        return (
            <div>
                <div>Text join</div>
                <div>
                    {data.left} &lt; {data.right}
                </div>
            </div>
        );
    },
});

export const nodeTypes = [mathMinNode, textJoin] as const;
