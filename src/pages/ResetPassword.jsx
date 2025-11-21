// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

function ResetPassword() {
  const { completePasswordReset } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Appwrite automatically adds these to the URL
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    setError('');
    setLoading(true);

    try {
      await completePasswordReset(userId, secret, password);
      // Redirect to login with a success indicator (optional) or just go to login
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Failed to reset password. The link may be expired.');
    }
    setLoading(false);
  };

  if (!userId || !secret) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-danger">
          Invalid password reset link. Please try requesting a new one.
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h2 className="text-center mb-4 fw-bold">New Password</h2>
              
              {error && (
                <div className="alert alert-danger d-flex align-items-center">
                  <AlertTriangle size={18} className="me-2" /> {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    minLength="8"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    minLength="8"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid">
                  <button disabled={loading} className="btn btn-primary btn-lg" type="submit">
                    {loading ? 'Resetting...' : 'Set New Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;