import { adminDatabase } from '@/lib/database.admin';
import { UserData } from '@/lib/types';

export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const snapshot = await adminDatabase.ref(`users/${userId}`).once('value');
    if (snapshot.exists()) {
      return snapshot.val() as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};
