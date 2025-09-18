
import { getDatabase, ref, set, push, get, query, orderByChild, equalTo } from 'firebase/database';
import { app } from '@/lib/firebaseConfig';
import { UserData, Subscription, MaintenanceTicket } from '@/lib/types';

const database = getDatabase(app);

// 1. User Functions
export const createUser = async (userId: string, email: string, name: string): Promise<{ success: boolean; error?: Error }> => {
  const userData: UserData = {
    email,
    name,
    userType: 'user',
    createdAt: new Date().toISOString(),
    subscriptionStatus: 'inactive',
  };
  try {
    await set(ref(database, `users/${userId}`), userData);
    return { success: true };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: error as Error };
  }
};

export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const snapshot = await get(ref(database, `users/${userId}`));
    if (snapshot.exists()) {
      return snapshot.val() as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

// 2. Subscription Functions
export const createSubscription = async (subscriptionData: Omit<Subscription, 'subscriptionId' | 'createdAt'>): Promise<{ success: boolean; subscriptionId?: string; error?: Error }> => {
  try {
    const newSubscriptionRef = push(ref(database, 'subscriptions'));
    const subscriptionWithDate = {
      ...subscriptionData,
      createdAt: new Date().toISOString(),
    };
    await set(newSubscriptionRef, subscriptionWithDate);
    // Also update the user's subscription status
    await set(ref(database, `users/${subscriptionData.userId}/subscriptionStatus`), subscriptionData.status);
    return { success: true, subscriptionId: newSubscriptionRef.key! };
  } catch (error) {
    console.error('Error creating subscription:', error);
    return { success: false, error: error as Error };
  }
};

export const getUserSubscription = async (userId: string): Promise<Subscription | null> => {
  try {
    const subscriptionsRef = ref(database, 'subscriptions');
    const q = query(subscriptionsRef, orderByChild('userId'), equalTo(userId));
    const snapshot = await get(q);
    if (snapshot.exists()) {
      // Assuming one active subscription per user for simplicity
      let subscription: Subscription | null = null;
      snapshot.forEach((childSnapshot) => {
        subscription = { ...childSnapshot.val(), subscriptionId: childSnapshot.key };
      });
      return subscription;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    return null;
  }
};

// 3. Maintenance Ticket Functions
export const createMaintenanceTicket = async (ticketData: Omit<MaintenanceTicket, 'ticketId' | 'createdAt' | 'status'>): Promise<{ success: boolean; ticketId?: string; error?: Error }> => {
  try {
    const newTicketRef = push(ref(database, 'maintenance_tickets'));
    const ticketWithDate = {
      ...ticketData,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    await set(newTicketRef, ticketWithDate);
    return { success: true, ticketId: newTicketRef.key! };
  } catch (error) {
    console.error('Error creating maintenance ticket:', error);
    return { success: false, error: error as Error };
  }
};

export const getUserTickets = async (userId: string): Promise<MaintenanceTicket[]> => {
  try {
    const ticketsRef = ref(database, 'maintenance_tickets');
    const q = query(ticketsRef, orderByChild('userId'), equalTo(userId));
    const snapshot = await get(q);
    const tickets: MaintenanceTicket[] = [];
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        tickets.push({ ...childSnapshot.val(), ticketId: childSnapshot.key });
      });
    }
    return tickets;
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    return [];
  }
};

// 4. Admin Check
export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    const snapshot = await get(ref(database, `admins/${userId}`));
    return snapshot.exists();
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

