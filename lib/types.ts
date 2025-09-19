export interface UserData {
  name: string;
  email: string;
  subscriptionStatus: string;
  userType: string;
  createdAt: string;
}

export interface Subscription {
  userId: string;
  plan: string;
  status: string;
  amount: string;
  currency: string;
}

export interface MaintenanceTicket {
  ticketId: string;
  subject: string;
  status: string;
  lastUpdated: string;
}
