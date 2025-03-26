'use client'

import { supabase } from '@/lib/supabase'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function NewCategoryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('categories')
        .insert([formData])

      if (error) throw error

      toast.success('Category added successfully!')
      router.push('/admin/categories')
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Error adding category')
        console.error('Error:', error.message)
      } else {
        toast.error('Error adding category')
        console.error('Error:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-[#D1E9F6] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#2C3E50] hover:text-[#F1D3CE] transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-playfair font-bold text-[#2C3E50] mb-6">
            Add New Category
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-inter text-[#2C3E50] mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-[#EECAD5] focus:outline-none focus:ring-2 focus:ring-[#F1D3CE] font-inter text-sm text-[#2C3E50]"
                placeholder="Enter category name"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-inter text-[#2C3E50] mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-[#EECAD5] focus:outline-none focus:ring-2 focus:ring-[#F1D3CE] font-inter text-sm text-[#2C3E50]"
                placeholder="Enter category description (optional)"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 rounded-lg border border-[#EECAD5] text-[#2C3E50] font-inter font-medium hover:bg-[#F6EACB] transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 rounded-lg bg-[#F1D3CE] text-[#2C3E50] font-inter font-medium hover:bg-[#F6EACB] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Add Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 