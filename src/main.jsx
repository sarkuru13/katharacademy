// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App.jsx';
import { PlaylistProvider } from './contexts/PlaylistContext.jsx'; // <-- IMPORT

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlaylistProvider> {/* <-- WRAP HERE */}
      <App />
    </PlaylistProvider> {/* <-- AND HERE */}
  </React.StrictMode>
);