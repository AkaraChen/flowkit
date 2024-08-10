import { CommonHandle, defineKitNode, useHandles } from '@akrc/flowkit-react';
import { nanoid } from 'nanoid';
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
            type: 'target',
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
                <div>
                    <CommonHandle {...handles.left} className='size-4' />
                    {handles.left.type}
                </div>
                <div>
                    <CommonHandle {...handles.right} className='size-4' />
                    {handles.right.type}
                </div>
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
            type: 'source',
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
                <div>
                    <CommonHandle
                        {...data.kit.handles.left}
                        className='size-4'
                    />
                    {data.kit.handles.left.type}
                </div>
                <div>
                    <CommonHandle
                        {...data.kit.handles.right}
                        className='size-4'
                    />
                    {data.kit.handles.right.type}
                </div>
            </NodeLayout>
        );
    },
});

const inputs = defineKitNode({
    defaultData() {
        return {};
    },
    handles: 'dynamic',
    fc({ data }) {
        const [handles, updateHandles] = useHandles<typeof data.kit.handles>();
        return (
            <NodeLayout>
                <div>Input</div>
                <button
                    onClick={() => {
                        const name = nanoid();
                        updateHandles((handles) => {
                            return {
                                ...handles,
                                [name]: {
                                    name,
                                    type: 'source',
                                    dataType: dataTypes.string,
                                },
                            };
                        });
                    }}
                    type='button'
                >
                    add input
                </button>
                {Object.entries(handles).map(([name, handle]) => {
                    return (
                        <div key={name}>
                            <CommonHandle {...handle} className='size-4' />
                            source {handle.name}
                        </div>
                    );
                })}
            </NodeLayout>
        );
    },
});

export const nodeTypes = {
    'math-min': mathMin,
    'text-join': textJoin,
    inputs: inputs,
};
