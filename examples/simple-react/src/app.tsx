import { FlowKit } from '@akrc/flowkit-react';
import {
    Background,
    type Edge,
    type Node,
    type OnConnect,
    type OnEdgesChange,
    type OnNodesChange,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState } from 'react';
import flowkitProps, { kit } from './flow';

function App() {
    const [nodes, setNodes] = useState<Node[]>(flowkitProps.nodes);
    const [edges, setEdges] = useState<Edge[]>(flowkitProps.edges);

    const onNodesChange: OnNodesChange = (changes) =>
        setNodes((nds) => applyNodeChanges(changes, nds));
    const onEdgesChange: OnEdgesChange = (changes) =>
        setEdges((eds) => applyEdgeChanges(changes, eds));
    const onConnect: OnConnect = (params) =>
        setEdges((eds) => addEdge(params, eds));

    const instance = useReactFlow();
    const dnd = kit.dnd(instance);
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
            }}
        >
            <div style={{ width: '25vw', height: '100vh' }}>
                <ul className='grid grid-cols-2 gap-4 p-4'>
                    {Object.keys(kit.nodeTypes).map((label) => {
                        return (
                            <li
                                key={label}
                                className='shadow border border-zinc-200 p-2 rounded'
                                draggable
                                onDragStart={(event) => {
                                    dnd.onDragStart(event, label);
                                }}
                            >
                                {label}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div style={{ width: '75vw', height: '100vh' }}>
                <FlowKit
                    kit={kit}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={(event) => {
                        dnd.onDrop(event);
                    }}
                    onDragOver={(e) => {
                        dnd.onDragOver(e);
                    }}
                >
                    <Background />
                </FlowKit>
            </div>
        </div>
    );
}

export default App;
