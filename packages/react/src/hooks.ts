import { useNodeId, useNodesData, useReactFlow } from '@xyflow/react';
import type { Dispatch, SetStateAction } from 'react';
import type { KitNodeDataWithInternal } from './node';

export function useHandles<T extends Record<string, unknown>>() {
    const id = useNodeId()!;
    const nodeData = useNodesData(id)!.data as KitNodeDataWithInternal<any>;
    const handles = nodeData.kit?.handles as T;
    const instance = useReactFlow();
    const updateHandle: Dispatch<SetStateAction<T>> = (update) => {
        instance.updateNode(id, (node) => {
            return {
                ...node,
                data: {
                    ...node.data,
                    kit: {
                        handles:
                            typeof update === 'function'
                                ? update(handles)
                                : update,
                    },
                },
            };
        });
    };
    return [handles, updateHandle] as const;
}
