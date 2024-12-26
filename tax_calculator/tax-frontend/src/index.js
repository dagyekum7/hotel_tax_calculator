
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Import the App component from App.js
import './index.css';  // Import your global CSS styles

const root = ReactDOM.createRoot(document.getElementById('root'));  // Find the root div in index.html
root.render(
  <React.StrictMode>
    <App />  {/* This will render your tax calculator app */}
  </React.StrictMode>
);
