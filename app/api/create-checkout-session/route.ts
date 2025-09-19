import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
// Make sure your service account key is set in your environment variables
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: `https://{process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
  });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export async function POST(req: NextRequest) {
  const { email, userId, priceId } = await req.json(); // Added priceId

  if (!userId) {
    return new NextResponse("User ID not found.", { status: 400 });
  }

  try {
    const user = await admin.auth().getUser(userId);
    let customerId = user.customClaims && user.customClaims.stripeCustomerId;

    // Create a new Stripe customer if one doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.displayName,
        metadata: { userId },
      });
      customerId = customer.id;
      // Save the new customer ID to the user's custom claims in Firebase
      await admin.auth().setCustomUserClaims(userId, { ...user.customClaims, stripeCustomerId: customerId });
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer: customerId,
      line_items: [
        {
          price: priceId, // Use the priceId from the request
          quantity: 1,
        },
      ],
      // Use metadata to pass the userId to the webhook
      metadata: {
        userId: userId,
      },
      success_url: `${req.nextUrl.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/checkout`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error instanceof Error) {
        console.error('Stripe Error:', error.message);
        message = error.message;
    }
    return new NextResponse(message, { status: 500 });
  }
}
