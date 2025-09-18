'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Signin.module.css';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle sign-in logic here
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1>Sign In</h1>
                <form onSubmit={handleSignIn}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
