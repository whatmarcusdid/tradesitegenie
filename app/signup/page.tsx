'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Signup.module.css';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        // Handle sign-up logic here
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1>Sign Up</h1>
                <form onSubmit={handleSignUp}>
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
                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.signUpButton}>Sign Up</button>
                </form>
                <p className={styles.signInLink}>
                    Already have an account? <Link href="/signin">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
