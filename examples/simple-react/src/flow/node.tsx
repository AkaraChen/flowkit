import { CommonHandle, defineKitNode } from '@akrc/flowkit-react';
import { Position } from '@xyflow/react';
import { dataTypes } from './data-types';
import { NodeLayout } from './layout';

const mathMin = defineKitNode<{
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
                <CommonHandle
                    type='source'
                    dataType={dataTypes.number}
                    className='size-4'
                />
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
                <CommonHandle
                    type='target'
                    dataType={dataTypes.string}
                    className='size-4'
                />
            </NodeLayout>
        );
    },
});

export const nodeTypes = {
    'math-min': mathMin,
    'text-join': textJoin,
};
