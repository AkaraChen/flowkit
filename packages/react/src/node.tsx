import type { KitDataType } from '@akrc/flowkit';
import type { HandleType, NodeBase, NodeProps } from '@xyflow/system';
import type { FC } from 'react';
import { NodeContextProvider } from './node-context';

export interface BaseHandleMeta {
    type: HandleType;
    dataType: KitDataType<any>;
    name: string;
}

export type KitNodeInternal<T extends Record<string, BaseHandleMeta>> = {
    handles: T;
};

export type KitNodeDataWithInternal<T extends Record<string, BaseHandleMeta>> =
    {
        kit: KitNodeInternal<T>;
    };

export interface KitCustomNode<
    Data extends Record<string, unknown>,
    Handles extends Record<string, BaseHandleMeta>,
> {
    fc: FC<NodeProps<NodeBase<Data & KitNodeDataWithInternal<Handles>>>>;
    defaultData: () => Data;
    handles?: Handles;
}

export function defineKitNode<
    Data extends Record<string, unknown>,
    Handles extends Record<string, BaseHandleMeta>,
>(node: KitCustomNode<Data, Handles>) {
    const defaultData = (): Data & KitNodeDataWithInternal<Handles> => {
        const data = node.defaultData();
        return {
            ...data,
            kit: {
                handles: node.handles!,
            },
        };
    };
    const fc: typeof node.fc = (props) => {
        const FC = node.fc;
        return (
            <NodeContextProvider
                value={{
                    id: props.id,
                }}
            >
                <FC
                    {...props}
                    data={{
                        ...props.data,
                        kit: {
                            ...props.data.kit,
                            handles: props.data.kit?.handles ?? [], // Ensure handles is always defined
                        },
                    }}
                />
            </NodeContextProvider>
        );
    };
    return {
        ...node,
        fc,
        defaultData,
    };
}
