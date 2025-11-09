// src/contexts/PlaylistContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// --- Default Mock Data ---
const MOCK_PLAYLIST_DATA = {
  'react-basics': {
    title: 'React Basics',
    description: 'Learn the fundamentals of React, from components to state.',
    thumbnail: 'https://placehold.co/600x400/007BFF/FFFFFF?text=React+Basics',
    category: 'free', // Used by FreeVideos page
    videos: [
      {
        id: 1,
        type: 'appwrite', // <-- UPDATED type
        src: 'https://sfo.cloud.appwrite.io/v1/storage/buckets/69108b6a000d501d0c47/files/691095df0034d70d1dee/view?project=69108b4e0031a7a0f2db&mode=admin', // <-- UPDATED src
        title: 'What is React?',
        quiz: [{ q: 'What is React?', options: ['A library', 'A framework'], answer: 0 }],
      },
      // --- All other videos in this playlist removed as requested ---
    ],
  },
  'javascript-fundamentals': {
    title: 'JavaScript Fundamentals',
    description: 'Master the core concepts of JavaScript.',
    thumbnail: 'https://placehold.co/600x400/F0DB4F/000000?text=JavaScript',
    category: 'free', // Used by FreeVideos page
    videos: [
      {
        id: 4,
        type: 'youtube',
        src: 'W6NZfCO5eDE',
        title: 'JS Variables',
        quiz: [],
      },
    ],
  },
  'exclusive-deep-dive': {
    title: 'Exclusive Deep Dive',
    description: 'Advanced topics and pro tips, only for members.',
    thumbnail: 'https://placehold.co/600x400/6F42C1/FFFFFF?text=Exclusive+Content',
    category: 'exclusive', // Used by Exclusive page
    videos: [
      {
        id: 5,
        type: 'youtube',
        src: 'SqcY0GlETPk',
        title: 'Advanced Hooks',
        quiz: [],
      },
    ],
  },
};
// --- End Mock Data ---

// Create the context
export const PlaylistContext = createContext(null);

// Create the Provider component
export function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState(() => {
    // 1. Try to get data from localStorage
    try {
      const storedData = localStorage.getItem('academyPlaylists');
      if (storedData) {
        return JSON.parse(storedData);
      }
    } catch (error) {
      console.error('Could not parse localStorage data:', error);
    }
    // 2. If nothing in localStorage, use the default mock data
    return MOCK_PLAYLIST_DATA;
  });

  // Function to update playlists and save to localStorage
  const updatePlaylists = (newPlaylists) => {
    try {
      const jsonString = JSON.stringify(newPlaylists);
      setPlaylists(newPlaylists);
      localStorage.setItem('academyPlaylists', jsonString);
      return { success: true };
    } catch (error) {
      console.error('Failed to save playlists to localStorage:', error);
      return { success: false, error: 'Data must be valid JSON.' };
    }
  };

  // Function to get the current data as a formatted string (for the admin page)
  const getPlaylistsAsJsonString = () => {
    return JSON.stringify(playlists, null, 2); // Pretty-print the JSON
  };

  return (
    <PlaylistContext.Provider
      value={{ playlists, updatePlaylists, getPlaylistsAsJsonString }}
    >
      {children}
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