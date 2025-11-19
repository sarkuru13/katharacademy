// src/components/PlaylistCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PlaylistCard Component
 * Displays a single playlist.
 * Now renders a frontend-generated thumbnail using text stored in the 'thumbnail' field.
 */
function PlaylistCard({ title, description, playlistId, thumbnailUrl }) {
  
  // Render the custom text thumbnail based on the "thumbnail" field string
  // Expected format: "MainText,Subtitle" (e.g., "ReactJS,KatharAcademy")
  const renderThumbnail = () => {
    const rawText = thumbnailUrl || title || "Course";
    // Split by comma to separate main title from subtitle
    const parts = rawText.split(',');
    const mainText = parts[0].trim();
    const subText = parts[1] ? parts[1].trim() : null;

    // Inline styles for the generated thumbnail wrapper
    const thumbnailStyle = {
      height: '200px',
      // Nice gradient background (Bootstrap Primary Blue -> Purple)
      background: 'linear-gradient(135deg, #0d6efd 0%, #6f42c1 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
      textShadow: '0 2px 10px rgba(0,0,0,0.2)', // Subtle shadow for depth
      userSelect: 'none',
      padding: '15px',
      position: 'relative',
      overflow: 'hidden'
    };

    return (
      <div className="card-img-top" style={thumbnailStyle}>
        {/* Main Text with Large Font */}
        <h1 className="fw-bold m-0" style={{ fontSize: '3rem', lineHeight: '1.1', wordBreak: 'break-word' }}>
          {mainText}
        </h1>
        
        {/* Subtitle (Styled as a modern glass pill) */}
        {subText && (
          <span 
            style={{ 
              marginTop: '12px',
              fontSize: '0.85rem', 
              fontWeight: '600',
              letterSpacing: '1.5px',       // Spaced out letters for a pro look
              textTransform: 'uppercase',   // Make it all caps
              color: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white text
              background: 'rgba(255, 255, 255, 0.15)', // Glassy background
              padding: '6px 16px',
              borderRadius: '50px',         // Fully rounded pill shape
              border: '1px solid rgba(255, 255, 255, 0.3)', // Subtle border ring
              backdropFilter: 'blur(4px)'   // Blur effect behind the pill
            }}
          >
            {subText}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border-0">
        {/* Render our custom text thumbnail */}
        {renderThumbnail()}
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-muted small flex-grow-1">{description}</p>
          <Link 
            to={`/player/${playlistId}`} 
            className="btn btn-primary mt-auto"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlaylistCard;