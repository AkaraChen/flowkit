import { FlowKit, createKit } from '@akrc/flowkit-react';
import { Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './flow/node';

const kit = createKit({
    nodeTypes: nodeTypes,
    edgeTypes: [],
    dataTypes: [],
});

const node = kit.defineNode(
    'math-min',
    {
        left: 0,
        right: 1,
    },
    {
        x: 200,
        y: 200,
    },
);

function App() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <FlowKit nodeTypes={kit.nodeTypes} nodes={[node]}>
                <Background />
            </FlowKit>
        </div>
    );
}

export default App;
