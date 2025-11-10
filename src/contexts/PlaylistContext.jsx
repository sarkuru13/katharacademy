// src/contexts/PlaylistContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { databases } from '../lib/appwrite'; //
import { Query } from 'appwrite';
import LoadingSpinner from '../components/LoadingSpinner'; // <-- 1. Import

// --- Get Appwrite IDs from .env ---
const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PLAYLISTS_COL_ID = import.meta.env.VITE_APPWRITE_PLAYLISTS_COL_ID;
const VIDEOS_COL_ID = import.meta.env.VITE_APPWRITE_VIDEOS_COL_ID;
// --- End Appwrite Config ---

// Create the context
export const PlaylistContext = createContext(null);

// Create the Provider component
export function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // ... (This function is unchanged)
    setLoading(true);
    try {
      const playlistData = await databases.listDocuments(DB_ID, PLAYLISTS_COL_ID);
      const videoData = await databases.listDocuments(
        DB_ID,
        VIDEOS_COL_ID,
        [Query.limit(100)] 
      );

      const playlistsMap = {};
      for (const playlist of playlistData.documents) {
        playlistsMap[playlist.$id] = {
          ...playlist,
          id: playlist.$id,
          videos: [],
        };
      }

      for (const video of videoData.documents) {
        if (playlistsMap[video.playlistId]) {
          const quiz = video.quiz ? JSON.parse(video.quiz) : [];
          
          playlistsMap[video.playlistId].videos.push({
            ...video,
            id: video.$id,
            quiz: quiz,
          });
        }
      }
      
      for (const playlistId in playlistsMap) {
        playlistsMap[playlistId].videos.sort((a, b) => a.order - b.order);
      }

      setPlaylists(playlistsMap);

    } catch (error) {
      console.error('Failed to fetch playlist data from Appwrite:', error);
    }
    setLoading(false);
  };

  // ... (updatePlaylists and getPlaylistsAsJsonString are unchanged)
  const updatePlaylists = () => {
    fetchData();
  };
  const getPlaylistsAsJsonString = () => {
    return JSON.stringify(playlists, null, 2);
  };

  // --- THIS IS THE CHANGE ---
  return (
    <PlaylistContext.Provider
      value={{ playlists, loading, updatePlaylists, getPlaylistsAsJsonString }}
    >
      {/* If loading, show spinner. If not, show the app. */}
      {loading ? <LoadingSpinner isFullScreen={true} /> : children}
    </PlaylistContext.Provider>
  );
  // --- END CHANGE ---
}

// Custom hook
export const usePlaylists = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylists must be used within a PlaylistProvider');
  }
  return context;
};