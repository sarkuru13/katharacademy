import React from 'react';
import PlaylistCard from '../components/PlaylistCard';
import { allPlaylists } from '../data'; // Import the mock data

/**
 * FreeVideos Page
 * Displays all playlists marked as 'free'.
 */
function FreeVideos() {
  const freePlaylists = Object.entries(allPlaylists).filter(
    ([, playlist]) => playlist.category === 'free'
  );

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Free Videos</h1>
        <p className="fs-5 text-muted">
          Browse our collection of free tutorials and lessons.
        </p>
      </div>
      <div className="row">
        {freePlaylists.length > 0 ? (
          freePlaylists.map(([id, playlist]) => (
            <PlaylistCard
              key={id}
              playlistId={id}
              title={playlist.title}
              description={playlist.description}
              thumbnailUrl={playlist.thumbnailUrl}
            />
          ))
        ) : (
          <p className="text-center text-muted">No free playlists available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default FreeVideos;