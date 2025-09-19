'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getBrowserAuth } from '@/lib/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = getBrowserAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmailSent(false);
    setLoading(true);

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
      if (error instanceof Error && 'code' in error) {
        const firebaseError = error as { code: string };
        if (firebaseError.code === 'auth/user-not-found') {
          errorMessage = 'No user found with this email address.';
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Reset Your Password</h1>
        {emailSent ? (
          <div>
            <p className="text-green-600">Password reset email sent! Please check your inbox.</p>
            <p className="mt-4">
              <Link href="/signin" className="text-indigo-600 hover:text-indigo-500">Back to Sign In</Link>
            </p>
          </div>
        ) : (
          <form onSubmit={handleResetPassword}>
            <p className="text-gray-600 mb-6">Enter your email address and we will send you a link to reset your password.</p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <button type="submit" className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Email'}
            </button>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          </form>
        )}
         {!emailSent && (
           <p className="mt-4">
              <Link href="/signin" className="text-indigo-600 hover:text-indigo-500">Cancel</Link>
            </p>
         )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
