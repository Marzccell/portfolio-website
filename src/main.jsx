import React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      toastOptions={{
        style: {
          background: 'rgba(8, 17, 31, 0.92)',
          color: '#e5f7ff',
          border: '1px solid rgba(94, 231, 255, 0.22)',
          backdropFilter: 'blur(16px)',
        },
      }}
    />
  </React.StrictMode>,
);
