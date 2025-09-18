'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserAuth } from '@/lib/firebaseConfig';
import { User } from 'firebase/auth';
import { createUser, getUserData } from '@/lib/database';
import styles from './CompleteSignup.module.css';

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
    <div className={styles.container}>
      <h1 className={styles.title}>Complete Your Profile</h1>
      <p>Welcome! Please enter your name to finish setting up your account.</p>
      <form onSubmit={handleCompleteSignUp} className={styles.form}>
      <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>Save and Continue</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default CompleteSignUpPage;
