'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getDatabase, type Database } from 'firebase/database';
import { getFunctions, connectFunctionsEmulator, Functions } from 'firebase/functions';
import { getAnalytics, Analytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};


// Initialize Firebase
function initializeFirebase() {
    if (!getApps().length) {
        return initializeApp(firebaseConfig);
    }
    return getApp();
}

export const app = initializeFirebase();

// Auth
export function getBrowserAuth(): Auth | null {
  if (typeof window === 'undefined') return null;
  return getAuth(app);
}

// Database
export function getBrowserDatabase(): Database | null {
  if (typeof window === 'undefined') return null;
  return getDatabase(app);
}

// Functions
let functionsInstance: Functions | null = null;
export function getFunctionsInstance(): Functions {
    if (!functionsInstance) {
        functionsInstance = getFunctions(app);
        if (process.env.NODE_ENV === 'development') {
            connectFunctionsEmulator(functionsInstance, 'localhost', 5001);
        }
    }
    return functionsInstance;
}

// Analytics
export function getAnalyticsInstance(): Analytics | null {
    if (typeof window === 'undefined') return null;
    if (!app) return null;
    return getAnalytics(app);
}
