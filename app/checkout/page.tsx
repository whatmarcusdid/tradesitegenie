"use client";
import React, { useState } from 'react';
import styles from './CheckoutPage.module.css';
import { getBrowserAuth, getFunctionsInstance } from '@/lib/firebaseConfig';
import { useRouter } from 'next/navigation';
import { httpsCallable } from 'firebase/functions';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = async () => {
    setLoading(true);
    const auth = getBrowserAuth();
    const user = auth?.currentUser;

    if (!user) {
      router.push('/?error=You must be signed in to complete this purchase.');
      return;
    }

    try {
      const functions = getFunctionsInstance();
      const createStripeCheckoutSession = httpsCallable(functions, 'createStripeCheckoutSession');
      const result = await createStripeCheckoutSession({
        planId: 'price_1PQR7oRxT4hVIMpFvA55B2oP', // Replace with your actual Price ID from Stripe
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/cancel`,
      });

      const { id: sessionId } = result.data as { id: string };

      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Stripe redirect error:", error);
          router.push('/?error=Failed to redirect to Stripe. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error creating Stripe checkout session:', error);
      router.push('/?error=There was an error creating your checkout session.');
    }

    setLoading(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.checkoutWrapper}>
        <div className={styles.leftColumn}>
          <header className={styles.header}>
            <button className={styles.goBackButton} onClick={() => router.back()}>
              &larr; Back
            </button>
            <h1 className={styles.title}>Checkout</h1>
            <div className={styles.progressBar}>
              <div style={{ width: '90%' }}></div>
            </div>
          </header>

          <section className={styles.planSection}>
            <div className={styles.planCard}>
              <div>
                <h3 className={styles.planName}>TradeSiteGenie Pro</h3>
                <p className={styles.planPrice}>$99/month</p>
              </div>
              <button className={styles.removeButton}>Remove</button>
            </div>
          </section>

          <section className={styles.billingSection}>
            <h2>Billing Information</h2>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="name">Full Name</label>
                <input className={styles.input} type="text" id="name" placeholder="John Doe" required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="email">Email Address</label>
                <input className={styles.input} type="email" id="email" placeholder="you@example.com" required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="address">Address</label>
                <input className={styles.input} type="text" id="address" placeholder="123 Main St" required />
              </div>
              <div className={styles.addressRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="city">City</label>
                  <input className={styles.input} type="text" id="city" placeholder="Anytown" required />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="state">State / Province</label>
                  <input className={styles.input} type="text" id="state" placeholder="CA" required />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="zip">ZIP / Postal Code</label>
                  <input className={styles.input} type="text" id="zip" placeholder="12345" required />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="country">Country</label>
                <select className={styles.select} id="country" required>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>
          </section>

          <section className={styles.paymentSection}>
            <h2>Payment Method</h2>
            <div className={styles.paymentOptions}>
              <div className={`${styles.paymentCard} ${styles.cardOption} ${styles.active}`}>
                <svg className={styles.paymentIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M6 14h2m3 0h5M3 6h18v12H3z" /></svg>
                <span>Card</span>
              </div>
              <div className={`${styles.paymentCard} ${styles.googlePayOption}`}>
                <svg className={styles.paymentIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.333 0-2.667.4-4 1.2V12c0 3.314 2.686 6 6 6s6-2.686 6-6V9.2c-1.333-.8-2.667-1.2-4-1.2zM12 8V6m0 2c-3.314 0-6-2.686-6-6h12c0 3.314-2.686 6-6 6z" /></svg>
                <span>Google Pay</span>
              </div>
            </div>
            <div className={styles.cardForm}>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="cardNumber">Card Number</label>
                <input className={styles.input} type="text" id="cardNumber" placeholder="0000 0000 0000 0000" required />
              </div>
              <div className={styles.addressRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="expiryDate">Expiry Date</label>
                  <input className={styles.input} type="text" id="expiryDate" placeholder="MM/YY" required />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="securityCode">Security Code</label>
                  <input className={styles.input} type="text" id="securityCode" placeholder="CVV" required />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.orderSummary}>
            <h2 className={styles.summaryHeader}>Order Summary</h2>
            <div className={styles.summaryItem}>
              <span>TradeSiteGenie Pro</span>
              <span>$99.00</span>
            </div>
            <div className={styles.includedFeature}>
              <svg className={styles.checkmark} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span>Unlimited Website Builds</span>
            </div>
            <div className={styles.includedFeature}>
              <svg className={styles.checkmark} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span>Premium Support</span>
            </div>
            <div className={styles.deliverables}>
              <p>Deliverables sent to your email</p>
            </div>
            <div className={styles.pricingRow}>
              <span className={styles.subtotal}>Subtotal</span>
              <span>$99.00</span>
            </div>
            <div className={styles.pricingRow}>
              <span className={styles.taxes}>Taxes</span>
              <span>$8.17</span>
            </div>
            <div className={styles.promoCode}>
              <input type="text" placeholder="Promo Code" />
              <button className={styles.secondaryButton}>Apply</button>
            </div>
            <div className={`${styles.pricingRow} ${styles.total}`}>
              <span>Total</span>
              <span>$107.17</span>
            </div>
            <button className={`${styles.primaryButton} ${styles.placeOrderButton}`} onClick={handlePlaceOrder} disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
