import type { KitDataType } from '@akrc/flowkit';
import {
    BaseEdge,
    type EdgeProps,
    getBezierPath,
    getSimpleBezierPath,
    getSmoothStepPath,
} from '@xyflow/react';
import type { FC } from 'react';

export interface KitCustomEdge<Data extends Record<string, unknown>> {
    fc: FC<EdgeProps>;
    defaultData: () => Data;
}

export interface KitHandle<TypeData extends Record<string, unknown>> {
    originalId: string;
    type: KitDataType<TypeData>;
}

export function BezierEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
}: EdgeProps) {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });
    return <BaseEdge id={id} path={edgePath} />;
}

export function SmoothStepEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
}: EdgeProps) {
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });
    return <BaseEdge id={id} path={edgePath} />;
}

export function SimpleBezierEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
}: EdgeProps) {
    const [edgePath] = getSimpleBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });
    return <BaseEdge id={id} path={edgePath} />;
}

export function defineKitEdge<Data extends Record<string, unknown>>(
    edge: KitCustomEdge<Data>,
) {
    return edge;
}
