'use client';

import { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { loadStripe } from '@stripe/stripe-js';
import Protected from '@/components/Protected';
import { getFunctionsInstance } from '@/lib/firebaseConfig';
import styles from '../../SignInPage.module.css'; // Reusing styles

// Make sure to replace with your actual publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setLoading(true);
    setError(null);

    try {
      const functions = getFunctionsInstance();
      const createStripeCheckout = httpsCallable(functions, 'createStripeCheckout');

      const successUrl = `${window.location.origin}/dashboard`;
      const cancelUrl = window.location.origin + '/checkout';

      const { data }: any = await createStripeCheckout({ 
        priceId,
        successUrl,
        cancelUrl
       });

      const { sessionId } = data;

      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          setError(error.message);
        }
      }
    } catch (err: any) {
        console.error("Error creating Stripe checkout session:", err);
        setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Protected>
      <div className={styles.container}>
        <h1 className={styles.title}>Choose Your Plan</h1>
        <div className={styles.planContainer}>
            <div className={styles.plan}>
                <h2>Standard Plan</h2>
                <p className={styles.price}>$10/month</p>
                <p>Access to all standard features.</p>
                <button 
                    className={styles.button}
                    onClick={() => handleCheckout('price_1PgQh9HqI4Bq2yVvI5NnDE5M')} // Replace with your actual Price ID
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Subscribe'}
                </button>
            </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </Protected>
  );
};

export default CheckoutPage;
