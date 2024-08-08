import { Kit } from '@akrc/flowkit-react';
import { edgeTypes } from './edge';
import { nodeTypes } from './node';

export const kit = new Kit({
    nodeTypes,
    edgeTypes,
    name: 'simple-react-flowkit',
});

export default {
    nodes: [],
    edges: [],
};
