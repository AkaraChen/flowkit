import type { KitDataType } from '@akrc/flowkit';
import {
    CommonHandle,
    type CommonHandleProps,
    defineKitNode,
    useHandles,
} from '@akrc/flowkit-react';
import { nanoid } from 'nanoid';
import { twJoin } from 'tailwind-merge';
import { dataTypes } from './data-types';
import { NodeLayout } from './layout';

function getHandleColor(dataType: keyof typeof dataTypes) {
    switch (dataType) {
        case 'number':
            return 'bg-blue-300';
        case 'string':
            return 'bg-yellow-300';
        default:
            return 'bg-gray-300';
    }
}

function Handle<T extends KitDataType<any>>(props: CommonHandleProps<T>) {
    const { type, dataType, name } = props;
    return (
        <div
            className={twJoin(
                'flex items-baseline gap-2',
                type === 'source' && 'flex-row-reverse',
            )}
        >
            <CommonHandle
                {...props}
                className={twJoin(
                    getHandleColor(dataType.name as any),
                    'size-4',
                )}
            />
            <span>{name}</span>
        </div>
    );
}

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
                <Handle {...handles.left} />
                <Handle {...handles.right} />
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
                <Handle {...data.kit.handles.left} />
                <Handle {...data.kit.handles.right} />
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
                    return <Handle key={name} {...handle} />;
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
