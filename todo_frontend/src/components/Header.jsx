import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Header component for the Todo app.
 * Displays app title and a subtle ocean gradient accent.
 */
function Header() {
  return (
    <header className="header">
      <div className="container" style={{padding: 0}}>
        <div
          aria-hidden="true"
          style={{
            position: 'relative',
            height: 10,
            marginBottom: 16,
            borderRadius: 999,
            background:
              'linear-gradient(90deg, rgba(59,130,246,0.25) 0%, rgba(6,182,212,0.20) 50%, rgba(100,116,139,0.18) 100%)',
            filter: 'blur(0.2px)',
            boxShadow: 'inset 0 0 0 1px rgba(59,130,246,0.25)'
          }}
        />
        <h1 className="title">Ocean Tasks</h1>
        <p className="subtitle">A clean, modern list to stay on course.</p>
      </div>
    </header>
  );
}

export default Header;
