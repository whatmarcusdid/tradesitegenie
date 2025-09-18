'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { app } from '../../lib/firebase';

const Header = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        const auth = getAuth(app);
        await signOut(auth);
        router.push('/signin');
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/">
                    <Image src="/images/logo.png" alt="Logo" width={100} height={50} />
                </Link>
                <ul className={styles.navList}>
                    {user ? (
                        <>
                            <li><Link href="/dashboard" className={styles.navLink}>Dashboard</Link></li>
                            <li><Link href="/reports" className={styles.navLink}>Reports</Link></li>
                            <li><Link href="/tickets/new" className={styles.navLink}>New Ticket</Link></li>
                            <li><button onClick={handleSignOut} className={styles.signOutButton}>Sign Out</button></li>
                        </>
                    ) : (
                        <li><Link href="/signin" className={styles.navLink}>Sign In</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
