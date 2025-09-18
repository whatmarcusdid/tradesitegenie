# TradeSiteGenie Blueprint

## Overview

TradeSiteGenie is an AI-powered website builder tailored for tradespeople. It simplifies the process of creating a professional online presence, allowing users to generate a website, manage content, and interact with clients through a user-friendly interface.

## Implemented Features

### Styling and Layout

- **Global Styles:** A baseline for the application's look and feel is established in `styles/globals.css`.
- **Header:** A responsive header with navigation links to the Dashboard, Reports, and New Ticket pages. The header is dynamic and shows a "Sign Out" button when the user is logged in, and a "Sign In" button otherwise.
- **Footer:** A simple footer with copyright information.
- **Main Content Area:** A padded main content area for comfortable viewing.

### Authentication

- **Firebase Integration:** The application is connected to a Firebase project for user authentication.
- **Sign-In Page:** A functional sign-in page that authenticates users with Firebase.
- **Sign-Up Page:** A functional sign-up page that creates new users in Firebase.
- **Sign-Out Functionality:** A "Sign Out" button in the header that signs the user out of Firebase and redirects them to the sign-in page.

### Core Application Pages

- **Dashboard:** A placeholder page for the user's main dashboard.
- **Reports:** A placeholder page for displaying user reports.
- **New Ticket:** A placeholder page for creating a new support ticket.

## Current Plan: Protect Application Routes

1.  **Protect Routes:**
    *   Create a custom hook or higher-order component to check the user's authentication state.
    *   Redirect unauthenticated users from protected pages (Dashboard, Reports, New Ticket) to the sign-in page.
2.  **Dashboard Functionality:**
    *   Flesh out the dashboard page with actual content and functionality. This could include displaying a list of websites, a summary of recent activity, or other relevant information.
3.  **Reports Functionality:**
    *   Implement the reports page, allowing users to view analytics and other data related to their websites.
4.  **New Ticket Functionality:**
    *   Implement the new ticket page, allowing users to create and submit support tickets.
