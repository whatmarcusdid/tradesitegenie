'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getBrowserAuth } from '@/lib/firebaseConfig';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const auth = getBrowserAuth();
    if (!auth) {
      setError("Authentication service is not available.");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/dashboard');
    } catch (error: unknown) {
      let errorMessage = 'Failed to sign up. Please try again.';
      const firebaseError = error as { code: string };
      if (firebaseError.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use.';
      } else if (firebaseError.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak. It should be at least 6 characters long.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page-container">
      <header className="signin-header">
        <Link href="/" className="logo-text">TradeSiteGenie</Link>
      </header>
      <main className="signin-main">
        <div className="signin-title-container">
          <h1 className="signin-title">Create Your Account</h1>
        </div>
        <form onSubmit={handleSignUp} className="signin-form">
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
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Create a password (min. 6 characters)"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/" className='text-blue-500 hover:underline'>
            Sign In
          </Link>
        </p>
      </main>
    </div>
  );
};

export default SignUpPage;
