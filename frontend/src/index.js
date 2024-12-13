// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM from the new root API (for React 18+)
import './index.css'; // Import custom styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import App from './App'; // Import the App component
import reportWebVitals from './reportWebVitals'; // Optional for measuring performance

// Create the root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // Temporarily remove StrictMode
    <App />
);

// Optional: Report web vitals for performance tracking
reportWebVitals();
