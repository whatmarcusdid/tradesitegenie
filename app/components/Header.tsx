'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/">
                    <Image src="/images/logo.png" alt="Logo" width={100} height={50} />
                </Link>
                <ul className={styles.navList}>
                    <li><Link href="/dashboard" className={styles.navLink}>Dashboard</Link></li>
                    <li><Link href="/reports" className={styles.navLink}>Reports</Link></li>
                    <li><Link href="/tickets/new" className={styles.navLink}>New Ticket</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
