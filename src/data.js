import React, { createContext, useState, useEffect, useContext } from 'react';

// --- Default Mock Data ---
// This is the data that will be loaded the *first time* someone visits.
// I've added a 'screenpal' example for you.
const MOCK_PLAYLIST_DATA = {
  'react-basics': {
    title: 'React Basics',
    description: 'Learn the fundamentals of React, from components to state.',
    thumbnail: 'https://placehold.co/600x400/007BFF/FFFFFF?text=React+Basics',
    videos: [
      {
        id: 1,
        type: 'youtube',
        src: 'dGcsHMXbSOA',
        title: 'What is React?',
        quiz: [/* ... quiz data ... */],
      },
      {
        id: 12,
        type: 'screenpal',
        src: 'c0V101VfG09', // This is the ID from the ScreenPal share link
        title: 'Example ScreenPal Video',
        quiz: [
          { q: 'What platform is this?', options: ['YouTube', 'ScreenPal'], answer: 1 },
        ],
      },
      {
        id: 2,
        type: 'mp4',
        src: 'https://videos.pexels.com/video-files/2053100/2053100-hd_1280_720_30fps.mp4',
        title: 'Example MP4 Video',
        quiz: [/* ... quiz data ... */],
      },
      {
        id: 3,
        type: 'vimeo',
        src: '59777392',
        title: 'Example Vimeo Video',
        quiz: [/* ... quiz data ... */],
      },
      // ... other videos
    ],
  },
  'javascript-fundamentals': {
    title: 'JavaScript Fundamentals',
    description: 'Master the core concepts of JavaScript.',
    thumbnail: 'https://placehold.co/600x400/F0DB4F/000000?text=JavaScript',
    videos: [/* ... video data ... */],
  },
  'exclusive-deep-dive': {
    title: 'Exclusive Deep Dive',
    description: 'Advanced topics and pro tips, only for members.',
    thumbnail: 'https://placehold.co/600x400/6F42C1/FFFFFF?text=Exclusive+Content',
    videos: [/* ... video data ... */],
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