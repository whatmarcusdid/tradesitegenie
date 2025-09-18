const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

admin.initializeApp();

// Create a new user in Firestore when a user signs up
exports.createFirebaseUser = functions.auth.user().onCreate(async (user) => {
  const { uid, email } = user;
  await admin.firestore().collection("users").doc(uid).set({
    email: email,
  });
  return;
});

exports.notionBlogWebhook = functions.https.onRequest(async (req, res) => {
  const blogData = req.body;
  await admin.firestore().collection("blogPosts").add(blogData);
  res.status(200).send("Blog post received!");
});

exports.createStripeCheckoutSession = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in to create a checkout session."
    );
  }

  const { planId, successUrl, cancelUrl } = data;
  const uid = context.auth.uid;

  try {
    const userDoc = await admin.firestore().collection("users").doc(uid).get();
    let customerId = userDoc.data()?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: context.auth.token.email,
        metadata: {
          firebaseUID: uid,
        },
      });
      customerId = customer.id;
      await admin.firestore().collection("users").doc(uid).update({
        stripeCustomerId: customerId,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer: customerId,
      line_items: [
        {
          price: planId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return { id: session.id };
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred while creating the checkout session."
    );
  }
});

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const signature = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, signature, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const customerId = session.customer;
      const subscriptionId = session.subscription;
      const firebaseUID = (await stripe.customers.retrieve(customerId)).metadata.firebaseUID;

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      await admin.firestore().collection('users').doc(firebaseUID).collection('subscriptions').doc(subscriptionId).set({
        plan: subscription.items.data[0].plan.id,
        status: subscription.status,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
      });

      await admin.firestore().collection('users').doc(firebaseUID).update({
        stripeCustomerId: customerId,
      });

      console.log(`Successfully synced subscription ${subscriptionId} for user ${firebaseUID}`);
      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      const subId = invoice.subscription;
      const sub = await stripe.subscriptions.retrieve(subId);
      const fbUID = (await stripe.customers.retrieve(sub.customer)).metadata.firebaseUID;

      await admin.firestore()
        .collection('users')
        .doc(fbUID)
        .collection('subscriptions')
        .doc(subId)
        .update({
          status: sub.status,
          current_period_start: sub.current_period_start,
          current_period_end: sub.current_period_end,
          cancel_at_period_end: sub.cancel_at_period_end,
        });
      console.log(`Updated subscription ${subId} for user ${fbUID}`);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send();
});
