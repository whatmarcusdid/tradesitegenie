# Project Blueprint

## Overview

This project is a Next.js application integrated with Firebase, named "TradeSiteGenie." It has been migrated from a multi-tenant system to a direct user/admin system, simplifying the architecture and data model.

## Features & Design

### Implemented Features:

*   **Firebase Integration:** The project is configured to use a suite of Firebase services:
    *   Firebase Authentication
    *   Firebase Realtime Database
    *   Firebase Functions
    *   Firebase Analytics
*   **Simplified Database Structure:** The database now uses a direct user-to-data model:
    *   `/users/{userId}`
    *   `/admins/{adminId}`
    *   `/subscriptions/{subscriptionId}`
    *   `/maintenance_tickets/{ticketId}`
*   **Database Functions:** The `lib/database.ts` file contains functions for all database interactions:
    *   `createUser`, `getUserData`
    *   `createSubscription`, `getUserSubscription`
    *   `createMaintenanceTicket`, `getUserTickets`
    *   `isAdmin` for permission checking
*   **Type Safety:** A `lib/types.ts` file defines the data structures for `UserData`, `Subscription`, and `MaintenanceTicket`.

### Authentication & Onboarding Flow

The authentication and new user onboarding process is designed to be secure, intuitive, and to seamlessly guide users toward becoming subscribers.

*   **Centralized Sign-In:** The `app/signin/page.tsx` page is the single entry point for all users.
*   **Profile Completion:** Redirects to `app/auth/complete-signup/page.tsx` for users without a database record.
*   **Dedicated Sign-Up & Subscription Onboarding:** A clear path from sign-up to subscription.
*   **Password Reset:** A self-service password reset page.
*   **Checkout & Subscription Management:** Securely handles subscription payments and management using Stripe.
*   **Protected Routes:** Ensures only authenticated users can access sensitive pages.

### Client-Exclusive Dashboard

*   **Client-Only Access:** The dashboard is now exclusively for users with `userType: 'user'`. Admins attempting to access `/dashboard` are automatically redirected to `/admin`.
*   **Component-Based Architecture:** The dashboard is built with a modular and maintainable structure, using separate components for each client-focused feature:
    *   `WelcomeCard.tsx`: Displays a personalized welcome message and user details.
    *   `SubscriptionCard.tsx`: Shows current subscription plan details.
    *   `HoursCounterCard.tsx`: Displays remaining maintenance and support hours.
    *   `AnalyticsCard.tsx`: Shows site traffic analytics (or "N/A" if unavailable).
    *   `ScheduleSessionCard.tsx`: A call-to-action for scheduling a welcome session.
    *   `SupportTicketsCard.tsx`: A detailed list of the user's personal support tickets.
    *   `ReportsCard.tsx`: Provides links to download monthly reports.
    *   `BlogCard.tsx`: Displays recent blog articles to keep clients engaged.
*   **Modern Styling:** The dashboard is styled with `Dashboard.module.css` to provide a clean, professional, and mobile-friendly design, featuring a responsive grid layout and modern card-based components.

## Current Task: Build the Client-Exclusive Dashboard

**Plan:**

1.  **Create Client-Specific Components:**
    *   `HoursCounterCard.tsx`
    *   `AnalyticsCard.tsx`
    *   `ScheduleSessionCard.tsx`
    *   `SupportTicketsCard.tsx`
    *   `ReportsCard.tsx`
    *   `BlogCard.tsx`

2.  **Update Styles:**
    *   Add new styles for the components to `app/dashboard/Dashboard.module.css` to ensure a cohesive and modern design.

3.  **Refactor Dashboard Page:**
    *   Modify `app/dashboard/page.tsx` to enforce client-only access by redirecting admins.
    *   Integrate all the new client-focused components into a responsive grid layout.

4.  **Update Blueprint:**
    *   Document the new client dashboard features in `blueprint.md`.
