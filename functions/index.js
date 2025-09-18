import { setGlobalOptions } from "firebase-functions/v2";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { onRequest } from "firebase-functions/v2/https";
import { defineString } from 'firebase-functions/params';
import * as admin from "firebase-admin";
import stripe from "stripe";

admin.initializeApp();
setGlobalOptions({ region: "us-central1" });

// Define secrets as per Firebase recommendations for v2
const stripeSecretKey = defineString('STRIPE_SECRET_KEY');
const stripeWebhookSecret = defineString('STRIPE_WEBHOOK_SECRET');

export const createStripeCheckout = onCall(async (request) => {
    // Initialize stripe inside the function to ensure secrets are loaded
    const stripeClient = new stripe(stripeSecretKey.value());

    if (!request.auth) {
        throw new HttpsError('unauthenticated', 'You must be logged in to make a purchase.');
    }

    const { priceId, successUrl, cancelUrl } = request.data;
    const userId = request.auth.uid;
    const user = await admin.auth().getUser(userId);

    let customerId = user.customClaims && user.customClaims.stripeCustomerId;

    if (!customerId) {
        const customer = await stripeClient.customers.create({
            email: user.email,
            metadata: { userId }
        });
        customerId = customer.id;
        await admin.auth().setCustomUserClaims(userId, { stripeCustomerId: customerId });
    }

    const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        customer: customerId,
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        expand: ['line_items'], // Ensure line_items are expanded in the webhook event
        metadata: {
            userId: userId
        },
        success_url: successUrl,
        cancel_url: cancelUrl,
    });

    return { sessionId: session.id };
});

export const stripeWebhook = onRequest(async (req, res) => {
    // Initialize stripe inside the function to ensure secrets are loaded
    const stripeClient = new stripe(stripeWebhookSecret.value());

    const signature = req.headers['stripe-signature'];

    let event;

    try {
        event = stripeClient.webhooks.constructEvent(req.rawBody, signature, stripeWebhookSecret.value());
    } catch (err) {
        console.error('Webhook signature verification failed.', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata.userId;
        const stripeSubscriptionId = session.subscription;
        const stripeCustomerId = session.customer;
        const plan = session.line_items.data[0].price.id;

        const subscriptionRef = admin.database().ref('subscriptions').push();
        const subscriptionId = subscriptionRef.key;

        await subscriptionRef.set({
            userId,
            plan,
            status: 'active',
            stripeCustomerId,
            stripeSubscriptionId,
            createdAt: admin.database.ServerValue.TIMESTAMP
        });

        await admin.database().ref(`users/${userId}/subscriptionId`).set(subscriptionId);
    }

    res.status(200).send();
});
