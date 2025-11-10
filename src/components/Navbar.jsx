// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink, useNavigate }from "react-router-dom";
import { useAuth } from '../contexts/AuthContext'; // <-- 1. Import useAuth

/**
 * Navbar Component
 * Clean, responsive navigation bar.
 */
function Navbar() {
  // <-- 2. Get auth state and functions
  const { user, isAdmin, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to homepage after logout
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <span className="text-primary">Kathar</span>Academy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link" end to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/free-videos">
                Free Videos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/exclusive">
                Exclusive
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>

            {/* --- 3. Conditional Auth Links --- */}

            {/* Show Admin link if user is admin */}
            {user && isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link fw-bold text-danger" to="/admin/manage">
                  Admin
                </NavLink>
              </li>
            )}

            {/* Show links based on loading and user state */}
            {!loading && (
              user ? (
                // User is LOGGED IN
                <li className="nav-item ms-lg-2">
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                // User is LOGGED OUT
                <>
                  <li className="nav-item ms-lg-2">
                    <NavLink className="btn btn-outline-primary btn-sm" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item ms-2">
                    <NavLink className="btn btn-primary btn-sm" to="/register">
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )
            )}
            {/* --- End Conditional Links --- */}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;