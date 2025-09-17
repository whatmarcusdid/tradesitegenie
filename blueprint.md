# Project Blueprint

## Overview

This project is a Next.js application with Firebase integration for authentication. It provides a sign-in page with options for email/password, Google, and Apple sign-in.

## Styling and Design

- **CSS Modules:** The sign-in page has been refactored to use CSS Modules for styling (`app/SignInPage.module.css`), improving modularity and preventing style conflicts.
- **Two-Column Layout:** The sign-in page now features a modern, two-column layout.
    - The left column displays a welcoming message and branding.
    - The right column contains the sign-in form and authentication options.
- **Enhanced UI:** The form elements, buttons, and links have been restyled for a more polished and user-friendly experience.
- **Responsive Design:** The application is designed to be responsive and work on different screen sizes.

## Features

- **Email/Password Authentication:** Users can sign in with their email and password.
- **Google Sign-In:** Users can sign in with their Google account.
- **Apple Sign-In:** Users can sign in with their Apple account.
- **Password Reset:** A link is provided for users to reset their password.
- **Sign-Up Link:** A link to the sign-up page has been added for new users.
- **Footer:** A professional footer with copyright information has been added.

## File Structure

- `app/layout.tsx`: The root layout of the application.
- `app/page.tsx`: The landing/sign-in page of the application.
- `app/SignInPage.module.css`: The CSS module for the sign-in page.
- `lib/firebaseConfig.ts`: The Firebase configuration file.
- `styles/globals.css`: The global stylesheet for the application.
