"use client";
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/dashboard');
    } catch (error: any) {
      setError(error.message ?? "Sign in failed");
    }
  };

  return (
    <div className="bg-[#F7F7F7] min-h-screen flex flex-col">
      <header className="py-4 px-6">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          TradeSiteGenie
        </Link>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md mx-auto p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Sign In to TradeSiteGenie</h1>
          </div>
          <form onSubmit={handleSignIn} className="space-y-4">
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
              <label htmlFor="password"  className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#C4F03F] text-black font-semibold py-3 px-4 rounded-md hover:bg-lime-400 transition-colors"
            >
              Sign In
            </button>
          </form>
          <div className="text-center mt-4">
            <Link href="/reset" className="text-sm text-gray-600 hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
      </main>
      <footer className="text-center py-6">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="font-semibold text-gray-800 hover:underline">
            Sign Up
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default SignInPage;
