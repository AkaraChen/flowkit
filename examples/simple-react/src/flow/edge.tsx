import { BezierEdge, defineKitEdge } from '@akrc/flowkit-react';

const bazier = defineKitEdge({
    defaultData() {
        return {};
    },
    fc: BezierEdge,
});

export const edgeTypes = {
    bazier: bazier,
};
