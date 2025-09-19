'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { getBrowserAuth } from '@/lib/firebaseConfig';

const Header = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const auth = getBrowserAuth();

    useEffect(() => {
        if (auth) {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setUser(user);
            });

            return () => unsubscribe();
        }
    }, [auth]);

    const handleSignOut = async () => {
        if (auth) {
            await signOut(auth);
            router.push('/login');
        }
    };

    return (
        <header className="bg-gray-900 text-white py-4 px-6 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    TradeSiteGenie
                </Link>
                <nav className="hidden md:flex gap-6">
                    {user ? (
                        <>
                            <Link href="/dashboard" className="text-lg font-medium text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                            <Link href="/reports" className="text-lg font-medium text-gray-300 hover:text-white transition-colors">Reports</Link>
                            <Link href="/tickets/new" className="text-lg font-medium text-gray-300 hover:text-white transition-colors">New Ticket</Link>
                            <button
                                onClick={handleSignOut}
                                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="text-lg font-medium text-gray-300 hover:text-white transition-colors">Login</Link>
                    )}
                </nav>
                <button className="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;
