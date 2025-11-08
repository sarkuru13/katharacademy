// src/pages/Exclusive.jsx
import React from 'react';
import PlaylistCard from '../components/PlaylistCard';
import { usePlaylists } from '../contexts/PlaylistContext.jsx'; // <-- CHANGED

function Exclusive() {
  const { playlists } = usePlaylists(); // <-- USE THE HOOK

  // This filter will now work
  const exclusivePlaylists = Object.entries(playlists).filter(
    ([, playlist]) => playlist.category === 'exclusive'
  );

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Exclusive Videos</h1>
        <p className="fs-5 text-muted">
          These special videos are unlisted and available only here!
        </p>
      </div>
      <div className="row">
        {exclusivePlaylists.length > 0 ? (
          exclusivePlaylists.map(([id, playlist]) => (
            <PlaylistCard
              key={id}
              playlistId={id}
              title={playlist.title}
              description={playlist.description}
              thumbnailUrl={playlist.thumbnail} // <-- FIXED property name
            />
          ))
        ) : (
          <p className="text-center text-muted">No exclusive playlists available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default Exclusive;