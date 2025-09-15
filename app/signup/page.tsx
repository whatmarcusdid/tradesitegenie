'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // On successful sign-up, you can redirect the user or show a success message.
      // For this example, we'll redirect to the dashboard.
      router.replace('/dashboard');
    } catch (error: unknown) {
      // Handle specific error codes
      let errorMessage = 'Failed to sign up. Please try again.';
      const firebaseError = error as { code: string };
      if (firebaseError.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use.';
      } else if (firebaseError.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak.';
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
            <h1 className="text-3xl font-bold">Create Your Account</h1>
          </div>
          <form onSubmit={handleSignUp} className="space-y-4">
          <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Enter your name"
                required
              />
            </div>
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
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Create a password"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#C4F03F] text-black font-semibold py-3 px-4 rounded-md hover:bg-lime-400 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </main>
      <footer className="text-center py-6">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/signin">
            <span className="font-semibold text-gray-800 hover:underline cursor-pointer">Sign In</span>
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default SignUpPage;
