// src/components/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    // If no user is logged in, redirect to the /login page
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, render the child route (e.g., <Exclusive />)
  return <Outlet />;
};

export default ProtectedRoute;