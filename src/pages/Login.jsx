// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

function Login() {
  const { user, login, loginWithGoogle } = useAuth(); // <-- Get `loginWithGoogle`
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      // On successful login, navigate to the homepage
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  // If user is already logged in, redirect to homepage
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h1 className="h2 fw-bold">Login or Register</h1>
                <p className="text-muted">
                  You need an account to access exclusive content.
                </p>{' '}
                {/* <-- THIS IS THE CORRECTED LINE */}
              </div>

              {error && (
                <div className="alert alert-danger d-flex align-items-center">
                  <AlertTriangle size={20} className="me-2" />
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordInput" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordInput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

<div className="mb-3 text-end">
  <Link to="/forgot-password" className="text-decoration-none small">
    Forgot Password?
  </Link>
</div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Login
                  </button>
                </div>
              </form>

              {/* --- ADDED THIS BUTTON --- */}
              <div className="d-grid mt-3">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-lg"
                  onClick={loginWithGoogle}
                >
                  {/* You could add a Google icon here later */}
                  Login with Google
                </button>
              </div>
              {/* --- END BUTTON --- */}

              <hr className="my-4" />
              <div className="text-center">
                <p className="text-muted mb-2">Don't have an account?</p>
                <Link to="/register" className="btn btn-outline-success btn-lg w-100">
                  Create a New Account
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;