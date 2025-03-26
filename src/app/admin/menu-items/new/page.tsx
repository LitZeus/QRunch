'use client'

import { supabase } from '@/lib/supabase'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function NewMenuItemPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image_url: '',
    is_available: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('menu_items')
        .insert([{
          ...formData,
          price: parseFloat(formData.price),
        }])

      if (error) throw error

      toast.success('Menu item added successfully!')
      router.push('/admin/menu-items')
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Error adding menu item')
        console.error('Error:', error.message)
      } else {
        toast.error('Error adding menu item')
        console.error('Error:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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
            Add New Menu Item
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
                placeholder="Enter item name"
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
                required
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-[#EECAD5] focus:outline-none focus:ring-2 focus:ring-[#F1D3CE] font-inter text-sm text-[#2C3E50]"
                placeholder="Enter item description"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-inter text-[#2C3E50] mb-2">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 rounded-lg border border-[#EECAD5] focus:outline-none focus:ring-2 focus:ring-[#F1D3CE] font-inter text-sm text-[#2C3E50]"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label htmlFor="category_id" className="block text-sm font-inter text-[#2C3E50] mb-2">
                Category
              </label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-[#EECAD5] focus:outline-none focus:ring-2 focus:ring-[#F1D3CE] font-inter text-sm text-[#2C3E50]"
              >
                <option value="">Select a category</option>
                <option value="1">Appetizers</option>
                <option value="2">Main Courses</option>
                <option value="3">Desserts</option>
                <option value="4">Beverages</option>
              </select>
            </div>

            <div>
              <label htmlFor="image_url" className="block text-sm font-inter text-[#2C3E50] mb-2">
                Image URL
              </label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-[#EECAD5] focus:outline-none focus:ring-2 focus:ring-[#F1D3CE] font-inter text-sm text-[#2C3E50]"
                placeholder="Enter image URL"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_available"
                name="is_available"
                checked={formData.is_available}
                onChange={handleChange}
                className="h-4 w-4 text-[#F1D3CE] border-[#EECAD5] rounded focus:ring-[#F1D3CE]"
              />
              <label htmlFor="is_available" className="ml-2 text-sm font-inter text-[#2C3E50]">
                Available
              </label>
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
                {loading ? 'Adding...' : 'Add Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 