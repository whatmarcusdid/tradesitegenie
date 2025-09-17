'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { getBrowserAuth } from '@/lib/firebaseConfig'; // Corrected import

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getBrowserAuth(); // Correctly get auth instance
    if (!auth) {
        router.replace('/signin');
        return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.replace('/signin');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    const auth = getBrowserAuth(); // Correctly get auth instance
    if (!auth) {
        console.error('Firebase auth is not initialized.');
        return;
    }
    try {
      await signOut(auth);
      router.replace('/signin');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F7F7] min-h-screen flex flex-col">
      <header className="py-4 px-6 flex justify-between items-center bg-white shadow-md">
        <h1 className="text-2xl font-bold tracking-tight">TradeSiteGenie Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
      </header>
      <main className="flex-grow p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h2>
          {user && <p className="text-lg">You are signed in as {user.email}</p>}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
