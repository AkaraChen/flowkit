import { BezierEdge, defineKitEdge } from '@akrc/flowkit-react';

export enum EdgeLabel {
    Bazier = 'bazier',
}

const bazier = defineKitEdge(BezierEdge);

export const edgeTypes = {
    [EdgeLabel.Bazier]: bazier,
};
