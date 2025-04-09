'use client'

import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast.success('Logged in successfully')
      router.push('/admin')
    } catch (error) {
      console.error('Error logging in:', error)
      toast.error('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-playfair font-bold text-[#4A6B57]">Verandah</h1>
          <p className="mt-2 text-sm font-inter text-[#4A6B57]/70">
            Admin Panel Login
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#E8D5B5] p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-inter font-medium text-[#4A6B57]">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57]/20"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-inter font-medium text-[#4A6B57]">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57]/20"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-inter text-white bg-[#4A6B57] rounded-lg hover:bg-[#4A6B57]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 