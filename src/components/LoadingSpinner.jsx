// src/components/LoadingSpinner.jsx
import React from 'react';

/**
 * A simple loading spinner.
 * if isFullScreen is true, it will take up the whole page.
 */
function LoadingSpinner({ isFullScreen = false }) {
  const spinner = (
    <div className="d-flex justify-content-center align-items-center p-5">
      <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (isFullScreen) {
    return (
      <div 
        className="d-flex justify-content-center align-items-center" 
        style={{ minHeight: '100vh' }}
      >
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default LoadingSpinner;