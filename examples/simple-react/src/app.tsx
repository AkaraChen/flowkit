import { FlowKit } from '@akrc/flowkit-react';
import { Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import flowkitProps from './flow';

function App() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <FlowKit {...flowkitProps}>
                <Background />
            </FlowKit>
        </div>
    );
}

export default App;
