// src/components/LoadingSpinner.jsx
import React from 'react';

/**
 * LoadingSpinner Component
 * Displays "Kathar Academy" with a typewriter effect and a blinking cursor.
 */
function LoadingSpinner() {
  const word1 = "Kathar";
  const word2 = "Academy";

  // Helper to render a word letter by letter
  const renderWord = (word, startIndex) => {
    return (
      <div className="loading-word">
        {word.split('').map((char, index) => (
          <span
            key={index}
            className="loading-letter"
            style={{ 
              // Stagger the animation to simulate typing speed (0.1s per letter)
              animationDelay: `${(startIndex + index) * 0.1}s` 
            }}
          >
            {char}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="loading-blur-overlay">
      <div className="loading-text-wrapper">
        {/* Render "Kathar" starting at 0s */}
        {renderWord(word1, 0)}
        
        {/* Render "Academy" starting after word1 finishes */}
        {renderWord(word2, word1.length)}
        
        {/* The Blinking Cursor */}
        <div className="blinking-cursor"></div>
      </div>

      <p className="loading-subtitle">Something amazing is coming...</p>
    </div>
  );
}

export default LoadingSpinner;