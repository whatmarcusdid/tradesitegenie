# Project Blueprint

## Overview

This project is a Next.js application with Firebase integration for authentication, a Notion-powered blog, and a robust Stripe-powered subscription system. It provides a sign-in page, a blog that pulls content from Notion, and a complete payment and subscription management solution.

## Styling and Design

- **CSS Modules:** The sign-in page and blog components use CSS Modules for styling, improving modularity and preventing style conflicts.
- **Modern UI:** The application features a modern, clean, and user-friendly interface.
- **Responsive Design:** The application is designed to be responsive and work on different screen sizes.

## Features

- **Email/Password Authentication:** Users can sign in with their email and password.
- **Google Sign-In:** Users can sign in with their Google account.
- **Apple Sign-In:** Users can sign in with their Apple account.
- **Password Reset:** A link is provided for users to reset their password.
- **Sign-Up Link:** A link to the sign-up page has been added for new users.
- **Footer:** A professional footer with copyright information has been added.
- **Notion-Powered Blog:** The application features a blog that dynamically fetches and displays content from a Notion database.
    - **Blog Listing Page:** Displays a list of all blog posts with their titles, summaries, and cover images.
    - **Individual Blog Post Pages:** Dynamically generates pages for each blog post, displaying the full content, including text, headings, and images.
- **Stripe Subscription Integration:** A complete subscription and payment system powered by Stripe.
    - **Checkout Page:** A dedicated checkout page where users can review their order and enter their payment information.
    - **Stripe Checkout Redirect:** The application redirects users to a secure, Stripe-hosted checkout page to complete their purchase.
    - **Cloud Functions for Stripe:**
        - **`createStripeCheckoutSession`:** A secure Cloud Function that creates a Stripe Checkout Session. It also creates a Stripe Customer for new users and links it to their Firebase account.
        - **`stripeWebhook`:** A Cloud Function that handles webhooks from Stripe to keep the Firestore database in sync with Stripe. It listens for events like `checkout.session.completed` and `invoice.payment_succeeded` to manage subscription statuses.
        - **`createFirebaseUser`:** A Cloud Function that automatically creates a user document in Firestore when a new Firebase user is created.
- **Cloud Functions:**
    - **Notion Webhook (`notionBlogWebhook`):** A Cloud Function that serves as a webhook to receive updates from a Notion database. When the Notion database is updated, this function is triggered, and the new blog data is added to a "blogPosts" collection in Firestore. This allows for automatic content updates on the blog.

## File Structure

- `app/layout.tsx`: The root layout of the application.
- `app/page.tsx`: The landing/sign-in page of the application.
- `app/SignInPage.module.css`: The CSS module for the sign-in page.
- `app/blog/page.tsx`: The main blog page that lists all blog posts.
- `app/blog/blog.module.css`: The CSS module for the blog page.
- `app/blog/[id]/page.tsx`: The dynamic page for individual blog posts.
- `app/blog/[id]/post.module.css`: The CSS module for individual blog post pages.
- `app/checkout/page.tsx`: The checkout page.
- `app/checkout/CheckoutPage.module.css`: The CSS module for the checkout page.
- `lib/firebaseConfig.ts`: The Firebase configuration file, including Functions SDK.
- `lib/notion.ts`: A module to handle all communication with the Notion API.
- `styles/globals.css`: The global stylesheet for the application.
- `.env.local`: A file to store environment variables, including Notion API secret and Stripe keys.
- `apphosting.yaml`: The configuration file for Firebase App Hosting, including environment variables for deployment.
- `functions/index.js`: The main file for Cloud Functions, containing the `notionBlogWebhook`, `createStripeCheckoutSession`, `stripeWebhook`, and `createFirebaseUser` functions.
- `functions/package.json`: The package.json file for the Cloud Functions, defining dependencies (including Stripe) and the Node.js runtime.
