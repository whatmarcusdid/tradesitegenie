import * as admin from 'firebase-admin';
import firebaseAdminConfig from '@/lib/firebaseAdminConfig';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

export const adminDatabase = admin.database();
