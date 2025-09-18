'use client';

import { useReducer } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Signin.module.css';
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
    } catch (error: any) { // 4. Fix the error handling
      dispatch({ type: 'error', payload: error.message });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          {state.error && <p className={styles.error}>{state.error}</p>}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={state.email}
              onChange={(e) => dispatch({ type: 'field', fieldName: 'email', payload: e.target.value })}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={state.password}
              onChange={(e) => dispatch({ type: 'field', fieldName: 'password', payload: e.target.value })}
              required
            />
          </div>
          <button type="submit" className={styles.signInButton}>Sign In</button>
        </form>
        <p className={styles.signUpLink}>
          Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
