'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error: unknown) {
      let errorMessage = 'Failed to send password reset email.';
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
    <div className="bg-[#F7F7F7] min-h-screen flex flex-col">
      <header className="py-4 px-6">
        <Link href="/" passHref>
          <span className="text-2xl font-bold tracking-tight cursor-pointer">TradeSiteGenie</span>
        </Link>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md mx-auto p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Reset Your Password</h1>
          </div>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Enter your email"
                required
              />
            </div>
            {message && <p className="text-green-600 text-sm text-center">{message}</p>}
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#C4F03F] text-black font-semibold py-3 px-4 rounded-md hover:bg-lime-400 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Password Reset Email'}
            </button>
          </form>
        </div>
      </main>
      <footer className="text-center py-6">
        <p className="text-sm text-gray-600">
          Remembered your password?{' '}
          <Link href="/signin">
            <span className="font-semibold text-gray-800 hover:underline cursor-pointer">Sign In</span>
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default ResetPasswordPage;
