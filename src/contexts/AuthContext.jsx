// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { account } from '../lib/appwrite'; // Import your initialized Appwrite account service
import { ID } from 'appwrite';

// 1. Create the context
export const AuthContext = createContext(null);

// 2. Create the provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On app load, check if a user is already logged in
    checkSession();
  }, []);

  /**
   * Checks for an active user session.
   */
  const checkSession = async () => {
    setLoading(true);
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      // No session found
      setUser(null);
    }
    setLoading(false);
  };

  /**
   * Logs a user in with email and password.
   */
  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await checkSession(); // Update the user state
    } catch (error) {
      console.error("Failed to login:", error);
      throw error; // Re-throw error to be handled by the Login page
    }
  };

  /**
   * Logs the current user out.
   */
  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  /**
   * Registers a new user and logs them in.
   */
  const register = async (email, password, name) => {
    try {
      await account.create(ID.unique(), email, password, name);
      // After successful registration, log them in
      await login(email, password);
    } catch (error) {
      console.error("Failed to register:", error);
      throw error; // Re-throw error to be handled by the Register page
    }
  };

  /**
   * Checks if the current user has the 'admin' label.
   * You must add this label to your user in the Appwrite Console.
   */
  const isAdmin = user ? user.labels.includes('admin') : false;

  // 3. Define the context value
  const value = {
    user,       // The user object (or null)
    loading,    // True while checking the initial session
    isAdmin,    // True if the user is an admin
    login,
    logout,
    register,
  };

  // 4. Return the provider
  return (
    <AuthContext.Provider value={value}>
      {/* Don't render the rest of the app until we've finished
        checking for a session. This prevents flickers.
      */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 5. Create a custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};