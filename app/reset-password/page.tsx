'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { getBrowserAuth } from '@/lib/firebaseConfig'; // Corrected import

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const auth = getBrowserAuth(); // Correctly get auth instance
    if (!auth) {
      setError("Authentication service is not available.");
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (error: unknown) {
      let errorMessage = 'Failed to send password reset email. Please try again.';
      const firebaseError = error as { code: string };
      if (firebaseError.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email address.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page-container">
      <header className="signin-header">
        <Link href="/" className="logo-text">
          TradeSiteGenie
        </Link>
      </header>
      <main className="signin-main">
        <div className="signin-title-container">
          <h1 className="signin-title">Reset Your Password</h1>
        </div>
        {emailSent ? (
          <p className="success-message">
            A password reset link has been sent to your email address. Please check your inbox.
          </p>
        ) : (
          <form onSubmit={handleResetPassword} className="signin-form">
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Password Reset Email'}
            </button>
          </form>
        )}
        <div className="signin-footer">
          <Link href="/" className="back-to-signin-link">
            Back to Sign In
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ResetPasswordPage;
