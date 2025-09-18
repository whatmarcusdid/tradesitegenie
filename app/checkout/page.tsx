'use client'

import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { auth } from '../../lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const Checkout = () => {
  const [user, loading] = useAuthState(auth)
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
    } catch (err: unknown) {
        let message = 'An unknown error occurred.';
        if (err instanceof Error) {
            message = err.message;
        }
      console.error('Checkout Error:', err);
      alert(`An error occurred: ${message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="text-base text-gray-600 mt-2 mb-6">You are about to subscribe to the Genie Maintenance Plan.</p>
        
        <div className="border border-gray-200 rounded-lg p-6 my-6">
            <h3 className="text-xl font-semibold text-gray-800">Genie Maintenance Plan</h3>
            <p className="text-4xl font-bold my-4 text-indigo-600">$679<span className="text-lg font-medium text-gray-500">/month</span></p>
            <ul className="text-left text-sm space-y-3 text-gray-600 max-w-sm mx-auto">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Continuous AI-powered site monitoring
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Automated performance and SEO optimizations
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Weekly site health and analytics reports
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Priority access to new features
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                24/7 priority support
              </li>
            </ul>
        </div>

        <button 
          onClick={handleCheckout} 
          disabled={loading}
          className="w-full max-w-xs mx-auto px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : 'Proceed to Payment'}
        </button>

        <p className="mt-6 text-xs text-gray-500">
          By proceeding, you agree to our Terms of Service. You will be redirected to Stripe to complete your purchase securely.
        </p>
      </div>
    </div>
  )
}

export default Checkout
