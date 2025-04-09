'use client'

import { supabase } from '@/lib/supabase'
import { Category, MenuItem } from '@/types'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

interface PageParams {
  id: string
}

export default function EditMenuItem({ params }: { params: Promise<PageParams> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    is_available: true,
    image_url: ''
  })

  const fetchCategories = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Failed to load categories')
    }
  }, [])

  const fetchMenuItem = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()

      if (error) throw error

      setMenuItem(data)
      setFormData({
        name: data.name,
        description: data.description || '',
        price: data.price.toString(),
        category_id: data.category_id,
        is_available: data.is_available,
        image_url: data.image_url || ''
      })
    } catch (error) {
      console.error('Error fetching menu item:', error)
      toast.error('Failed to fetch menu item')
    } finally {
      setLoading(false)
    }
  }, [resolvedParams.id])

  useEffect(() => {
    fetchCategories()
    fetchMenuItem()
  }, [fetchCategories, fetchMenuItem])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const { error } = await supabase
        .from('menu_items')
        .update({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category_id: formData.category_id,
          is_available: formData.is_available,
          image_url: formData.image_url
        })
        .eq('id', resolvedParams.id)

      if (error) throw error

      toast.success('Menu item updated successfully')
      router.push('/admin/menu-items')
    } catch (error) {
      console.error('Error updating menu item:', error)
      toast.error('Failed to update menu item')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A6B57]"></div>
      </div>
    )
  }

  if (!menuItem) {
    return (
      <div className="text-center py-8">
        <p className="text-[#4A6B57]">Menu item not found</p>
        <Link
          href="/admin/menu-items"
          className="mt-4 inline-block text-sm font-inter text-[#4A6B57] hover:text-[#4A6B57]/80"
        >
          Back to Menu Items
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/menu-items"
          className="p-2 rounded-lg hover:bg-[#F0E6D2] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#4A6B57]" />
        </Link>
        <div>
          <h1 className="text-2xl font-playfair font-bold text-[#4A6B57]">Edit Menu Item</h1>
          <p className="mt-1 text-sm font-inter text-[#4A6B57]/70">
            Update menu item details
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8D5B5] p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-inter font-medium text-[#4A6B57]">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1 block w-full px-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57]/20"
                placeholder="Enter menu item name"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-inter font-medium text-[#4A6B57]">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full px-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57]/20"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-inter font-medium text-[#4A6B57]">
                Category
              </label>
              <select
                id="category"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                required
                className="mt-1 block w-full px-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57]/20"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="image_url" className="block text-sm font-inter font-medium text-[#4A6B57]">
                Image URL
              </label>
              <input
                type="text"
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="mt-1 block w-full px-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57]/20"
                placeholder="Enter image URL (optional)"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-inter font-medium text-[#4A6B57]">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full px-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57]/20"
              placeholder="Enter menu item description (optional)"
            />
          </div>
          <div className="flex justify-end gap-4">
            <Link
              href="/admin/menu-items"
              className="px-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg hover:bg-[#F5F5F5] transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm font-inter text-white bg-[#4A6B57] rounded-lg hover:bg-[#4A6B57]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Updating...' : 'Update Menu Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}