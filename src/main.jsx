// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App.jsx';
import { PlaylistProvider } from './contexts/PlaylistContext.jsx';
// --- CHANGED --- (Removed curly braces)
import AuthProvider from './contexts/AuthContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* This import will now work */}
      <PlaylistProvider>
        <App />
      </PlaylistProvider>
    </AuthProvider>
  </React.StrictMode>
);