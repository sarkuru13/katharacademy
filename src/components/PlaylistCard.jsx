import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PlaylistCard Component
 * Displays a single playlist, linking to the PlayerPage.
 */
function PlaylistCard({ title, description, playlistId, thumbnailUrl }) {
  const imageUrl = thumbnailUrl || `https://placehold.co/600x400/EEE/333?text=${title.replace(' ', '+')}`;

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