// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { account } from '../lib/appwrite'; //
import { ID } from 'appwrite';
import LoadingSpinner from '../components/LoadingSpinner'; 

// 1. Create the context
export const AuthContext = createContext(null);

// 2. Create the provider component
// --- CHANGED --- (Removed 'export' from this line)
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setLoading(true);
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await checkSession(); 
    } catch (error) {
      console.error("Failed to login:", error);
      throw error; 
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const register = async (email, password, name) => {
    try {
      await account.create(ID.unique(), email, password, name);
      await login(email, password);
    } catch (error) {
      console.error("Failed to register:", error);
      throw error; 
    }
  };
  
  const loginWithGoogle = () => {
    try {
      account.createOAuth2Session(
        'google', 
        window.location.origin + '/', 
        window.location.origin + '/login' 
      );
    } catch (error) {
      console.error("Failed to start Google login:", error);
    }
  };

  const isAdmin = user ? user.labels.includes('admin') : false;
  
  const value = {
    user,
    loading,
    isAdmin,
    login,
    logout,
    register,
    loginWithGoogle,
  };

  if (loading) {
    return <LoadingSpinner isFullScreen={true} />;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
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

// --- ADDED THIS LINE ---
export default AuthProvider; // Make the component the default export