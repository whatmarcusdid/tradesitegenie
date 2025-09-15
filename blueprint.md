# Project Blueprint

## Overview

This project is a Next.js application with Firebase integration for authentication. It provides a sign-in page with options for email/password, Google, and Apple sign-in.

## Styling and Design

- The application uses a global stylesheet (`styles/globals.css`) for consistent styling.
- The sign-in page has a clean and modern design with a centered layout.
- The color scheme is based on a gradient background and a mix of dark and light elements.
- The buttons have hover effects for better user experience.
- The "Sign in with Google" button has been styled to match the official Google branding, with the logo on the left and the text centered.

## Features

- **Email/Password Authentication:** Users can sign in with their email and password.
- **Password Reset:** Users can request a password reset email.
- **Google Sign-In:** Users can sign in with their Google account.
- **Apple Sign-In:** Users can sign in with their Apple account.
- **Responsive Design:** The application is designed to be responsive and work on different screen sizes.

## File Structure

- `app/layout.tsx`: The root layout of the application.
- `app/page.tsx`: The landing page of the application.
- `app/signin/page.tsx`: The sign-in page with the authentication logic.
- `lib/firebaseConfig.ts`: The Firebase configuration file.
- `styles/globals.css`: The global stylesheet for the application.
