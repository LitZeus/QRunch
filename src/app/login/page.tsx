'use client'

import { supabase } from '@/lib/supabase'
import { Coffee } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.replace('/admin')
      }
    }
    checkSession()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      const redirectTo = searchParams.get('redirectTo') || '/admin'
      router.replace(redirectTo)
      toast.success('Logged in successfully!')
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Error logging in')
        console.error('Error:', error.message)
      } else {
        toast.error('Error logging in')
        console.error('Error:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#D1E9F6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <Coffee className="w-12 h-12 text-[#F1D3CE]" />
            <span className="ml-3 text-2xl font-playfair font-bold text-[#2C3E50]">
              Admin Login
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-inter text-[#2C3E50] mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-[#EECAD5] focus:outline-none focus:ring-2 focus:ring-[#F1D3CE] font-inter text-sm text-[#2C3E50]"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-inter text-[#2C3E50] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-[#EECAD5] focus:outline-none focus:ring-2 focus:ring-[#F1D3CE] font-inter text-sm text-[#2C3E50]"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F1D3CE] text-[#2C3E50] py-2 rounded-lg font-inter font-medium hover:bg-[#F6EACB] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#D1E9F6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F1D3CE]"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
} 