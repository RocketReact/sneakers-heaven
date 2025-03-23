// React and rendering imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Global styles
import {Provider} from "react-redux"; // Redux state management
import store from './store/store.js' // Application store
import App from './App.jsx' // Root component

// Initialize React application in the DOM
createRoot(document.getElementById('root')).render(
    <StrictMode> {/* Enable additional development checks */}
        <Provider store={store}> {/* Make Redux store available throughout app */}
            <App />
        </Provider>
    </StrictMode>
)