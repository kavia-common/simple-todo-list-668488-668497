import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

/**
 * PUBLIC_INTERFACE
 * Optional entrypoint if using React 18 root API directly (kept for compatibility).
 * CRA uses index.js, but this file allows alternate mounting.
 */
export function mountApp(el) {
  const root = ReactDOM.createRoot(el);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
