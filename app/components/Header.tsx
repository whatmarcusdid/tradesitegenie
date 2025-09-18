'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image src="/images/logo.png" alt="Logo" width={120} height={40} />
                        </Link>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8">
                        {user ? (
                            <>
                                <Link href="/dashboard" className="text-base font-medium text-gray-500 hover:text-gray-900">Dashboard</Link>
                                <Link href="/reports" className="text-base font-medium text-gray-500 hover:text-gray-900">Reports</Link>
                                <Link href="/tickets/new" className="text-base font-medium text-gray-500 hover:text-gray-900">New Ticket</Link>
                                <button 
                                    onClick={handleSignOut} 
                                    className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <Link href="/signin" className="text-base font-medium text-gray-500 hover:text-gray-900">Sign In</Link>
                        )}
                    </nav>
                    {/* Mobile Menu Button can be added here if needed */}
                </div>
            </div>
        </header>
    );
};

export default Header;
