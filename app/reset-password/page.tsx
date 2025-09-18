'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getBrowserAuth } from '@/lib/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import styles from './ResetPassword.module.css'; // Reusing styles for consistency

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
    <div className={styles.container}>
      <h1 className={styles.title}>Reset Your Password</h1>
      {emailSent ? (
        <div>
          <p className={styles.success}>Password reset email sent! Please check your inbox.</p>
          <p className={styles.link}>
            <Link href="/signin">Back to Sign In</Link>
          </p>
        </div>
      ) : (
        <form onSubmit={handleResetPassword} className={styles.form}>
          <p>Enter your email address and we will send you a link to reset your password.</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      )}
       {!emailSent && (
         <p className={styles.link}>
            <Link href="/signin">Cancel</Link>
          </p>
       )}
    </div>
  );
};

export default ResetPasswordPage;
