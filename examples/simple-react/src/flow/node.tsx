import { CommonHandle, defineKitNode } from '@akrc/flowkit-react';
import { dataTypes } from './data-types';
import { NodeLayout } from './layout';

const mathMin = defineKitNode({
    defaultData() {
        return {
            left: 0,
            right: 1,
        };
    },
    handles: {
        left: {
            name: 'left',
            type: 'source',
            dataType: dataTypes.number,
        },
        right: {
            name: 'right',
            type: 'source',
            dataType: dataTypes.number,
        },
    },
    fc({ data }) {
        const handles = data.kit.handles;
        return (
            <NodeLayout>
                <div>Math min</div>
                <div>
                    {data.left} &lt; {data.right}
                </div>
                <CommonHandle {...handles.left} className='size-4' />
            </NodeLayout>
        );
    },
});

const textJoin = defineKitNode({
    defaultData() {
        return {
            left: 'Hello',
            right: 'World',
        };
    },
    handles: {
        left: {
            name: 'left',
            type: 'target',
            dataType: dataTypes.string,
        },
        right: {
            name: 'right',
            type: 'target',
            dataType: dataTypes.string,
        },
    },
    fc({ data }) {
        return (
            <NodeLayout>
                <div>Text join</div>
                <div>
                    {data.left}, {data.right}
                </div>
                <CommonHandle {...data.kit.handles.left} className='size-4' />
            </NodeLayout>
        );
    },
});

export const nodeTypes = {
    'math-min': mathMin,
    'text-join': textJoin,
};
