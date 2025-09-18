'use client'

import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { auth } from '../../lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const Checkout = () => {
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()

  const handleCheckout = async () => {
    if (!user) {
      alert('You must be logged in to purchase a plan.');
      router.push('/signin');
      return;
    }

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, userId: user.uid }),
      });

      if (!res.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await res.json();

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe.js has not loaded yet.');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe redirection error:', error);
        alert(`Error: ${error.message}`);
      }
    } catch (err: any) {
      console.error('Checkout Error:', err);
      alert(`An error occurred: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-12 rounded-lg shadow-lg w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-cyan-400">Checkout</h1>
        <p className="text-lg text-gray-300 mb-8">You are about to subscribe to the Genie Maintenance Plan.</p>
        
        <div className="border-t border-b border-gray-700 py-8 my-8">
          <div className="bg-gray-700 p-8 rounded-lg w-full transform transition-transform duration-300">
            <h3 className="text-2xl font-bold text-cyan-300">Genie Maintenance Plan</h3>
            <p className="text-5xl font-bold my-4">$679<span className="text-xl font-normal">/month</span></p>
            <ul className="text-left text-base space-y-3 text-gray-300 max-w-md mx-auto">
              <li>✓ Continuous AI-powered site monitoring</li>
              <li>✓ Automated performance and SEO optimizations</li>
              <li>✓ Weekly site health and analytics reports</li>
              <li>✓ Priority access to new features</li>
              <li>✓ 24/7 priority support</li>
            </ul>
          </div>
        </div>

        <button 
          onClick={handleCheckout} 
          disabled={loading}
          className="w-full max-w-sm bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg shadow-green-500/50 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading user...' : 'Proceed to Payment'}
        </button>

        <p className="mt-8 text-xs text-gray-500">
          By proceeding, you agree to our Terms of Service and Privacy Policy. You will be redirected to Stripe to complete your purchase securely.
        </p>
      </div>
    </div>
  )
}

export default Checkout
