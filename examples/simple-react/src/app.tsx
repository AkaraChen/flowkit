import { FlowKit } from '@akrc/flowkit-react';
import {
    Background,
    type OnConnect,
    type OnEdgesChange,
    type OnNodesChange,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import flowkitProps from './flow';

function App() {
    const [nodes, setNodes] = useState(flowkitProps.nodes);
    const [edges, setEdges] = useState(flowkitProps.edges);
    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );
    const onConnect: OnConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <FlowKit
                nodeTypes={flowkitProps.nodeTypes}
                edgeTypes={flowkitProps.edgeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Background />
            </FlowKit>
        </div>
    );
}

export default App;
