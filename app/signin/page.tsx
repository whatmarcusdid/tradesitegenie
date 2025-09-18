'use client';

import { useReducer } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../lib/firebaseConfig'; // Corrected import path

// 1. Interface for the reducer state
interface State {
  email: string;
  password: string;
  error: string | null;
}

// 2. Type for reducer actions
type Action = 
  | { type: 'field'; fieldName: 'email' | 'password'; payload: string }
  | { type: 'signIn' }
  | { type: 'error'; payload: string };

const initialState: State = {
  email: '',
  password: '',
  error: null,
};

// 3. Update the reducer function signature
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'field':
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    case 'signIn':
      return {
        ...state,
        error: null,
      };
    case 'error':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

const SignInPage = () => {
  // 5. useReducer call is updated by inference
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'signIn' });

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, state.email, state.password);
      router.push('/dashboard');
    } catch (error: unknown) { // 4. Fix the error handling
        let message = 'An unknown error occurred.';
        if (error instanceof Error) {
            message = error.message;
        }
      dispatch({ type: 'error', payload: message });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Sign In</h1>
        <form onSubmit={handleSignIn} className="space-y-6">
          {state.error && <p className="text-sm text-red-600">{state.error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={state.email}
              onChange={(e) => dispatch({ type: 'field', fieldName: 'email', payload: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={state.password}
              onChange={(e) => dispatch({ type: 'field', fieldName: 'password', payload: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign In</button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account? <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
