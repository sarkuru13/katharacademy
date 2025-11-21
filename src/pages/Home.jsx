// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PlaylistCard from '../components/PlaylistCard';
import AdBanner from '../components/AdBanner';
import { usePlaylists } from '../contexts/PlaylistContext.jsx';
import HomeTour from '../components/HomeTour'; // <-- 1. Import the tour

function Home() {
  const { playlists } = usePlaylists();
  const featuredPlaylists = Object.entries(playlists).slice(0, 3);

  return (
    <>
      {/* 2. Add the Tour component at the top */}
      <HomeTour />

      {/* Hero Section */}
      <div className="container my-5">
        {/* 3. Add ID for Tour Step 1 */}
        <div id="tour-welcome" className="p-5 text-center bg-light rounded-3 shadow-sm">
          <h1 className="display-4 fw-bold">Welcome to KatharAcademy</h1>
          <p className="fs-4 text-muted">
            Learn, explore, and grow with our exclusive and free educational
            content!
          </p>
          
          {/* 4. Add IDs for Tour Steps 2 & 3 */}
          <Link 
            id="tour-free-videos" 
            className="btn btn-primary btn-lg mt-3" 
            to="/free-videos"
          >
            Browse Free Videos
          </Link>
          <Link 
            id="tour-exclusive" 
            className="btn btn-outline-secondary btn-lg mt-3 ms-2" 
            to="/exclusive"
          >
            See Exclusive Content
          </Link>
        </div>
      </div>

      {/* Featured Playlists Section */}
      {/* 5. Add ID for Tour Step 4 */}
      <div id="tour-featured" className="container my-5">
        <h2 className="text-center mb-4">Featured Playlists</h2>
        <div className="row">
          {featuredPlaylists.map(([id, playlist]) => (
            <PlaylistCard
              key={id}
              playlistId={id}
              title={playlist.title}
              description={playlist.description}
              thumbnailUrl={playlist.thumbnail}
            />
          ))}
        </div>
      </div>
      
      <AdBanner />
    </>
  );
}

export default Home;