import React from 'react';
import Home from './components/Home';
import ContextState from './context/ContextState';

function App() {
    return (
        <ContextState>
            <div className="App">
                <Home />
            </div>
        </ContextState>
    );
}

export default App;
