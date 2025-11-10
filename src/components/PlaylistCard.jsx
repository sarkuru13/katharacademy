// src/components/PlaylistCard.jsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { storage } from '../lib/appwrite'; // <-- 1. Import storage

// 2. Get the Bucket ID from .env
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

/**
 * PlaylistCard Component
 * Displays a single playlist, linking to the PlayerPage.
 */
function PlaylistCard({ title, description, playlistId, thumbnailUrl }) {
  
  // 3. Convert the File ID (thumbnailUrl) into a real URL
  const imageUrl = useMemo(() => {
    if (thumbnailUrl && BUCKET_ID) {
      try {
        // This generates the public URL for the image file
        return storage.getFilePreview(BUCKET_ID, thumbnailUrl).href;
      } catch (error) {
        console.error("Failed to get thumbnail preview:", error);
        return `https://placehold.co/600x400?text=Image+Error`;
      }
    }
    // Fallback placeholder
    return `https://placehold.co/600x400/EEE/333?text=${title.replace(' ', '+')}`;
  }, [thumbnailUrl, title]);

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <img src={imageUrl} className="card-img-top" alt={title} style={{ height: '200px', objectFit: 'cover' }} />
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