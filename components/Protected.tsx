'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserAuth } from '@/lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { isAdmin } from '@/lib/database-client';

interface ProtectedProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const Protected = ({ children, adminOnly = false }: ProtectedProps) => {
  const router = useRouter();
  const auth = getBrowserAuth();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!auth) {
      router.push('/signin');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (adminOnly) {
          const userIsAdmin = await isAdmin(user.uid);
          if (userIsAdmin) {
            setAuthorized(true);
          } else {
            router.push('/dashboard'); // Or a dedicated 'unauthorized' page
          }
        } else {
          setAuthorized(true);
        }
      } else {
        router.push('/signin');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router, adminOnly]);

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!authorized) {
    return null; // Or a redirect component
  }

  return <>{children}</>;
};

export default Protected;
