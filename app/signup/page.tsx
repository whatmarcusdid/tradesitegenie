'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, database } from '../../lib/firebase'
import { ref, set } from 'firebase/database'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Now, write user data to the Realtime Database
      await set(ref(database, 'users/' + user.uid), {
        name: name,
        email: email,
        createdAt: new Date().toISOString()
      });

      // Redirect to the checkout page after successful sign-up and data write
      router.push('/checkout');

    } catch (error: any) {
      console.error("Error signing up:", error)
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">Create Your Account</h2>
        {error && <p className="bg-red-500 text-white p-3 rounded mb-4">{error}</p>}
        <form onSubmit={handleSignUp}>
        <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/50"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          Already have an account? 
          <a href="/signin" className="text-cyan-400 hover:underline ml-1">Sign In</a>
        </p>
      </div>
    </div>
  )
}

export default SignUp
