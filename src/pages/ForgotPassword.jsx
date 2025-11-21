// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';

function ForgotPassword() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await requestPasswordReset(email);
      setMessage('Check your email inbox for password reset instructions.');
    } catch (err) {
      setError('Failed to reset password. Please check if the email is correct.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h2 className="text-center mb-4 fw-bold">Reset Password</h2>
              
              {error && (
                <div className="alert alert-danger d-flex align-items-center">
                  <AlertTriangle size={18} className="me-2" /> {error}
                </div>
              )}
              
              {message && (
                <div className="alert alert-success d-flex align-items-center">
                  <CheckCircle size={18} className="me-2" /> {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your account email"
                  />
                </div>
                <div className="d-grid">
                  <button disabled={loading} className="btn btn-primary btn-lg" type="submit">
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
              
              <div className="text-center mt-3">
                <Link to="/login" className="text-decoration-none d-flex align-items-center justify-content-center">
                  <ArrowLeft size={16} className="me-1" /> Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;