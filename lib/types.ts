export interface UserData {
  email: string;
  name: string;
  userType: 'user' | 'admin';
  createdAt: string;
  subscriptionStatus?: 'active' | 'inactive' | 'cancelled';
}

export interface Subscription {
  subscriptionId: string;
  userId: string;
  plan: string;
  status: 'active' | 'inactive' | 'cancelled';
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  amount: number;
  currency: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
}

export interface MaintenanceTicket {
  ticketId: string;
  userId: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  createdAt: string;
}
