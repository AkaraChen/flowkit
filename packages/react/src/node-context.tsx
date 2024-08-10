import { createContext, useContext } from 'react';

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type NodeContext = {
    // TODO: Add node context
};

const NodeContext = createContext<NodeContext>(null as unknown as NodeContext);
export const NodeContextProvider = NodeContext.Provider;
export const useNodeContext = () => {
    const context = useContext(NodeContext);
    if (!context) {
        throw new Error(
            'useNodeContext must be used within a NodeContextProvider',
        );
    }
    return context;
};
