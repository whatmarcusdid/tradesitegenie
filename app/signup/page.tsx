'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getBrowserAuth } from '@/lib/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { createUser } from '@/lib/database';
import styles from '../../../SignInPage.module.css';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const auth = getBrowserAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!auth) {
      setError('Firebase Auth is not available.');
      return;
    }

    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's profile with their name
      await updateProfile(user, { displayName: name });

      // 2. Create user record in Realtime Database
      const dbResult = await createUser(user.uid, email, name);

      if (dbResult.success) {
        // 3. Redirect to checkout for subscription setup
        router.push('/checkout');
      } else {
        setError(dbResult.error?.toString() || 'Failed to create user database record.');
      }
    } catch (error: any) {
      // Handle errors from Firebase Auth or database creation
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create an Account</h1>
      <form onSubmit={handleSignUp} className={styles.form}>
      <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password (min. 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>Sign Up & Proceed to Checkout</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <p className={styles.link}>
        Already have an account? <Link href="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
