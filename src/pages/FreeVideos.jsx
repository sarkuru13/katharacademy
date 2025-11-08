// src/pages/FreeVideos.jsx
import React from 'react';
import PlaylistCard from '../components/PlaylistCard';
import { usePlaylists } from '../contexts/PlaylistContext.jsx'; // <-- CHANGED

function FreeVideos() {
  const { playlists } = usePlaylists(); // <-- USE THE HOOK

  // This filter will now work
  const freePlaylists = Object.entries(playlists).filter(
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
              thumbnailUrl={playlist.thumbnail} // <-- FIXED property name
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