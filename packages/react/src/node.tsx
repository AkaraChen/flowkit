import type { KitDataType } from '@akrc/flowkit';
import type { HandleType, NodeBase, NodeProps } from '@xyflow/system';
import type { FC } from 'react';
import { NodeContextProvider } from './node-context';

export interface RawBaseHandleMeta {
    type: HandleType;
    dataType: KitDataType<any>;
}

export interface BaseHandleMeta extends RawBaseHandleMeta {
    name: string;
}

export type KitNodeInternal<T extends Record<string, RawBaseHandleMeta>> = {
    handles: T;
};

export type KitNodeDataWithInternal<
    T extends Record<string, RawBaseHandleMeta>,
> = {
    kit: KitNodeInternal<T>;
};

export interface KitCustomNode<
    Data extends Record<string, unknown>,
    Handles extends Record<string, RawBaseHandleMeta>,
> {
    fc: FC<NodeProps<NodeBase<Data & KitNodeDataWithInternal<Handles>>>>;
    defaultData(): Data;
    handles?: Handles;
}

export function defineKitNode<
    Data extends Record<string, unknown>,
    Handles extends Record<string, BaseHandleMeta>,
>(node: KitCustomNode<Data, Handles>) {
    const handles = Object.entries(node.handles ?? {})
        .map(([name, handle]) => ({
            ...handle,
            name,
        }))
        .reduce(
            (acc, handle) => {
                acc[handle.name] = handle;
                return acc;
            },
            {} as Record<string, BaseHandleMeta>,
        );

    const defaultData = (): Data & KitNodeDataWithInternal<Handles> => {
        const data = node.defaultData();
        return {
            ...data,
            kit: {
                handles: handles as Handles,
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
                <FC {...props} />
            </NodeContextProvider>
        );
    };
    return {
        ...node,
        fc,
        defaultData,
    };
}
