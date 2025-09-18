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

// Types for Notion API Response
interface NotionText {
  type: 'text';
  text: {
    content: string;
    link: null | { url: string };
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: null | string;
}

interface NotionTitle {
  id: string;
  type: 'title';
  title: NotionText[];
}

interface NotionRichText {
  id: string;
  type: 'rich_text';
  rich_text: NotionText[];
}

interface NotionCover {
  type: 'external' | 'file';
  external?: {
    url: string;
  };
  file?: {
    url: string;
    expiry_time: string;
  };
}

interface NotionProperties {
  Name: NotionTitle;
  Summary: NotionRichText;
  // Add other properties from your Notion database here
}

export interface Post {
  object: 'page';
  id: string;
  created_time: string;
  last_edited_time: string;
  cover: NotionCover | null;
  properties: NotionProperties;
  url: string;
}

