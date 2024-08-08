import type { KitDataType } from '@akrc/flowkit';
import type {
    EdgeProps,
    ReactFlowInstance,
    Edge as XYFlowEdge,
    Node as XYFlowNode,
} from '@xyflow/react';
import type { XYPosition } from '@xyflow/system';
import { nanoid } from 'nanoid';
import { type DragEvent, type DragEventHandler, useId } from 'react';
import type { KitCustomEdge } from './edge';
import type { KitCustomNode, KitInternalNodeData } from './node';

export class Kit<
    NodeTypes extends Record<string, KitCustomNode<any>>,
    EdgeTypes extends Record<string, KitCustomEdge<any>>,
> {
    readonly name: string;
    readonly nodeTypes: NodeTypes;
    readonly edgeTypes: EdgeTypes;

    constructor(opts: {
        name?: string;
        nodeTypes: NodeTypes;
        edgeTypes: EdgeTypes;
    }) {
        const { name = 'flowkit-app', nodeTypes, edgeTypes } = opts;
        this.name = name;
        this.nodeTypes = nodeTypes;
        this.edgeTypes = edgeTypes;
    }

    defineNode<K extends keyof NodeTypes>(
        label: K,
        data: Partial<Omit<ReturnType<NodeTypes[K]['defaultData']>, 'kit'>>,
        position: XYPosition,
    ): XYFlowNode {
        const nodeType = this.nodeTypes[label];
        const dataWithInternal = {
            ...nodeType?.defaultData(),
            ...data,
            kit: {
                handles: [],
            } as KitInternalNodeData,
        };
        return {
            id: nanoid(),
            position,
            data: dataWithInternal,
            type: label as string,
        };
    }

    defineEdge<K extends keyof EdgeTypes>(
        label: K,
        data: ReturnType<EdgeTypes[K]['defaultData']>,
        options: Pick<EdgeProps, 'source' | 'target'>,
    ): XYFlowEdge {
        return {
            id: nanoid(),
            type: label as string,
            data,
            source: options.source,
            target: options.target,
        };
    }

    dnd(instance: ReactFlowInstance) {
        const { screenToFlowPosition, setNodes } = instance;
        const format = `application/${this.name}`;
        const onDragOver: DragEventHandler = (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        };
        const onDrop: DragEventHandler = (event) => {
            if (event.dataTransfer.types.includes(format)) {
                const json = event.dataTransfer.getData(format);
                if (!json) return;
                const { type, data } = JSON.parse(json);
                const node = this.defineNode(
                    type,
                    data,
                    screenToFlowPosition({
                        x: event.clientX,
                        y: event.clientY,
                    }),
                );
                setNodes((nds) => [...nds, node]);
            }
        };
        const onDragStart = (
            event: DragEvent<Element>,
            label: string | keyof NodeTypes,
        ) => {
            event.dataTransfer.setData(
                format,
                JSON.stringify({
                    type: label,
                    data: this.nodeTypes[label]!.defaultData(),
                }),
            );
        };
        return {
            onDragOver,
            onDrop,
            onDragStart,
        };
    }
}
