import {
    BaseEdge,
    type EdgeProps,
    getBezierPath,
    getSimpleBezierPath,
    getSmoothStepPath,
} from '@xyflow/react';

export { StraightEdge } from '@xyflow/react';

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
