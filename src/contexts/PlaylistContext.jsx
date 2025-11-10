// src/contexts/PlaylistContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { databases } from '../lib/appwrite'; // <-- Import Appwrite
import { Query } from 'appwrite'; // <-- Import Query for fetching

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
    // Fetch data from Appwrite when the provider mounts
    fetchData();
  }, []);

  /**
   * Fetches playlists and their corresponding videos from Appwrite
   * and combines them into the nested object structure the app expects.
   */
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch all playlist documents
      const playlistData = await databases.listDocuments(DB_ID, PLAYLISTS_COL_ID);

      // 2. Fetch all video documents (up to 100)
      const videoData = await databases.listDocuments(
        DB_ID,
        VIDEOS_COL_ID,
        [Query.limit(100)] // You can increase this limit if you have more videos
      );

      // 3. Create a map for easy playlist lookup
      const playlistsMap = {};
      for (const playlist of playlistData.documents) {
        playlistsMap[playlist.$id] = {
          ...playlist, // Spread all attributes (title, description, category, etc.)
          id: playlist.$id, // Add `id` property for compatibility
          videos: [], // Prepare to hold the nested videos
        };
      }

      // 4. Go through all videos and add them to their parent playlist
      for (const video of videoData.documents) {
        if (playlistsMap[video.playlistId]) {
          // Parse the quiz string back into an object/array
          const quiz = video.quiz ? JSON.parse(video.quiz) : [];
          
          playlistsMap[video.playlistId].videos.push({
            ...video,
            id: video.$id, // Add `id` property
            quiz: quiz,
          });
        }
      }
      
      // Bonus: Sort videos within each playlist by the 'order' attribute
      for (const playlistId in playlistsMap) {
        playlistsMap[playlistId].videos.sort((a, b) => a.order - b.order);
      }

      // 5. Set the final, combined data
      setPlaylists(playlistsMap);

    } catch (error) {
      console.error('Failed to fetch playlist data from Appwrite:', error);
    }
    setLoading(false);
  };

  // This function will be used by the admin panel later
  // For now, it just refetches all data.
  const updatePlaylists = () => {
    fetchData();
  };

  // This function is no longer needed but kept for compatibility
  // to avoid errors in ManageContent.jsx for now.
  const getPlaylistsAsJsonString = () => {
    return JSON.stringify(playlists, null, 2);
  };

  return (
    <PlaylistContext.Provider
      value={{ playlists, loading, updatePlaylists, getPlaylistsAsJsonString }}
    >
      {/* Don't render children until data is loaded */}
      {!loading && children}
    </PlaylistContext.Provider>
  );
}

// Custom hook to make using the context easier
export const usePlaylists = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylists must be used within a PlaylistProvider');
  }
  return context;
};