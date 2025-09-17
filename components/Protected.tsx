'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { getBrowserAuth } from '@/lib/firebaseConfig';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Protected({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = getBrowserAuth();
    if (!auth) {
      // If auth service is not available, redirect to sign-in.
      // This can happen during SSR or if initialization fails.
      router.replace('/signin');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsReady(true);
      } else {
        // No user is signed in, redirect to the sign-in page.
        router.replace('/signin');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  // While checking the auth state, show a loading indicator.
  if (!isReady) {
    return <div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>;
  }

  // If ready (and authenticated), render the children.
  return <>{children}</>;
}
