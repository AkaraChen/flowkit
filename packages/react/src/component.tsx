import { ReactFlow, type ReactFlowProps } from '@xyflow/react';
import { type FC, type ReactNode, createContext, useContext } from 'react';
import type { Kit } from './kit';

export type FlowKitProps = Omit<ReactFlowProps, 'nodeTypes' | 'edgeTypes'> & {
    kit: InstanceType<typeof Kit>;
};

const KitContext = createContext<InstanceType<typeof Kit>>(null as any);
export const useKit = () => {
    const context = useContext(KitContext);
    if (!context) {
        throw new Error('useKit must be used within a FlowKit component');
    }
    return context;
};

export function FlowKit(props: FlowKitProps): ReactNode {
    const { children, kit, ...rest } = props;
    const { nodeTypes, edgeTypes } = kit;
    return (
        <ReactFlow
            {...rest}
            nodeTypes={Object.entries(nodeTypes).reduce(
                (acc, [label, nodeType]) => {
                    acc[label] = nodeType.fc;
                    return acc;
                },
                {} as Record<string, FC<any>>,
            )}
            edgeTypes={Object.entries(edgeTypes).reduce(
                (acc, [label, edgeType]) => {
                    acc[label] = edgeType.fc;
                    return acc;
                },
                {} as Record<string, FC<any>>,
            )}
        >
            <KitContext.Provider value={kit}>{children}</KitContext.Provider>
        </ReactFlow>
    );
}
