// src/components/AdminRoute.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    // If no user is logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    // If user is logged in but NOT an admin, redirect to home
    return <Navigate to="/" replace />;
  }

  // If user is logged in AND is an admin, render the child route
  return <Outlet />;
};

export default AdminRoute;