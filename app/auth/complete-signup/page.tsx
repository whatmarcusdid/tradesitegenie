'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserAuth } from '@/lib/firebaseConfig';
import { User } from 'firebase/auth';
import { createUser, getUserData } from '@/lib/database';

const CompleteSignUpPage = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getBrowserAuth();

  useEffect(() => {
    if (!auth) {
      router.push('/signin');
      return;
    }
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Check if user already has a DB record
        const existingUserData = await getUserData(user.uid);
        if (existingUserData) {
          router.push('/dashboard'); // Already set up, no need to be here
        } else {
          setUser(user);
          setName(user.displayName || '');
          setLoading(false);
        }
      } else {
        router.push('/signin');
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handleCompleteSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user || !user.email) {
      setError('No authenticated user found. Please sign in again.');
      return;
    }

    if (!name.trim()) {
        setError('Please enter your name.');
        return;
    }

    try {
      const dbResult = await createUser(user.uid, user.email, name);

      if (dbResult.success) {
        router.push('/dashboard');
      } else {
        setError(dbResult.error?.toString() || 'An unexpected error occurred.');
      }
    } catch (error: unknown) {
       if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  if (loading) {
      return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Profile</h1>
        <p className="text-gray-600 mb-6">Welcome! Please enter your name to finish setting up your account.</p>
        <form onSubmit={handleCompleteSignUp}>
        <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <button type="submit" className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save and Continue</button>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CompleteSignUpPage;
