'use client'

import { supabase } from '@/lib/supabase'
import { Category, MenuItem } from '@/types'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
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
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: ''
  })

  useEffect(() => {
    fetchMenuItem()
    fetchCategories()
  }, [resolvedParams.id])

  const fetchMenuItem = async () => {
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
        description: data.description,
        price: data.price.toString(),
        category_id: data.category_id
      })
    } catch (error) {
      console.error('Error fetching menu item:', error)
      toast.error('Failed to fetch menu item')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Failed to fetch categories')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('menu_items')
        .update({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category_id: formData.category_id
        })
        .eq('id', resolvedParams.id)

      if (error) throw error

      toast.success('Menu item updated successfully')
      router.push('/admin/menu-items')
    } catch (error) {
      console.error('Error updating menu item:', error)
      toast.error('Failed to update menu item')
    } finally {
      setLoading(false)
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
              placeholder="Enter item name"
            />
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
              placeholder="Enter item description"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-inter font-medium text-[#4A6B57]">
              Price
            </label>
            <div className="mt-1 relative rounded-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-[#4A6B57]/70">₹</span>
              </div>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                min="0"
                step="0.01"
                className="block w-full pl-7 pr-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57]/20"
                placeholder="0.00"
              />
            </div>
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

          <div className="flex justify-end gap-4">
            <Link
              href="/admin/menu-items"
              className="px-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg hover:bg-[#F5F5F5] transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-inter text-white bg-[#4A6B57] rounded-lg hover:bg-[#4A6B57]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Menu Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 