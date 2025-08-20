'use client'

import { Category, MenuItem } from '@/types'
import { Edit, FolderPlus, Plus, Trash2, Utensils } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function AdminDashboard() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [menuItemsRes, categoriesRes] = await Promise.all([
        fetch('/api/admin/menu-items'),
        fetch('/api/admin/categories')
      ])

      if (!menuItemsRes.ok) throw new Error('Failed to fetch menu items')
      if (!categoriesRes.ok) throw new Error('Failed to fetch categories')

      const [menuItemsData, categoriesData] = await Promise.all([
        menuItemsRes.json(),
        categoriesRes.json()
      ])

      setMenuItems(menuItemsData || [])
      setCategories(categoriesData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to fetch data. Please try again.')
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

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-[#E8D5B5] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-playfair font-bold text-[#4A6B57]">Menu Items</h3>
              <p className="mt-1 text-3xl font-bold text-[#4A6B57]">{menuItems.length}</p>
            </div>
            <div className="p-3 bg-[#F0E6D2] rounded-lg">
              <Utensils className="w-6 h-6 text-[#4A6B57]" />
            </div>
          </div>
          <Link
            href="/admin/menu-items"
            className="mt-4 inline-flex items-center gap-2 text-sm font-inter text-[#4A6B57] hover:text-[#4A6B57]/80"
          >
            <Plus className="w-4 h-4" />
            Add New Item
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#E8D5B5] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-playfair font-bold text-[#4A6B57]">Categories</h3>
              <p className="mt-1 text-3xl font-bold text-[#4A6B57]">{categories.length}</p>
            </div>
            <div className="p-3 bg-[#F0E6D2] rounded-lg">
              <FolderPlus className="w-6 h-6 text-[#4A6B57]" />
            </div>
          </div>
          <Link
            href="/admin/categories"
            className="mt-4 inline-flex items-center gap-2 text-sm font-inter text-[#4A6B57] hover:text-[#4A6B57]/80"
          >
            <Plus className="w-4 h-4" />
            Add New Category
          </Link>
        </div>
      </div>

      {/* Recent Menu Items */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8D5B5]">
        <div className="p-6 border-b border-[#E8D5B5]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-playfair font-bold text-[#4A6B57]">Recent Menu Items</h2>
            <Link
              href="/admin/menu-items"
              className="text-sm font-inter text-[#4A6B57] hover:text-[#4A6B57]/80"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="divide-y divide-[#E8D5B5]">
          {menuItems.slice(0, 5).map((item) => (
            <div key={item.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-inter font-medium text-[#4A6B57]">{item.name}</h3>
                  <p className="mt-1 text-sm text-[#4A6B57]/70">{item.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/menu-items/${item.id}/edit`}
                    className="p-2 text-[#4A6B57] hover:bg-[#F0E6D2] rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={async () => {
                      if (confirm('Are you sure you want to delete this item?')) {
                        try {
                          const response = await fetch(`/api/admin/menu-items/${item.id}`, {
                            method: 'DELETE'
                          })

                          if (!response.ok) throw new Error('Failed to delete menu item')

                          toast.success('Menu item deleted')
                          fetchData()
                        } catch (error) {
                          console.error('Error deleting menu item:', error)
                          toast.error('Failed to delete menu item')
                        }
                      }
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8D5B5]">
        <div className="p-6 border-b border-[#E8D5B5]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-playfair font-bold text-[#4A6B57]">Categories</h2>
            <Link
              href="/admin/categories"
              className="text-sm font-inter text-[#4A6B57] hover:text-[#4A6B57]/80"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="divide-y divide-[#E8D5B5]">
          {categories.map((category) => (
            <div key={category.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-inter font-medium text-[#4A6B57]">{category.name}</h3>
                  <p className="mt-1 text-sm text-[#4A6B57]/70">{category.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/categories/${category.id}/edit`}
                    className="p-2 text-[#4A6B57] hover:bg-[#F0E6D2] rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={async () => {
                      if (confirm('Are you sure you want to delete this category?')) {
                        try {
                          const response = await fetch(`/api/admin/categories/${category.id}`, {
                            method: 'DELETE'
                          })

                          if (!response.ok) {
                            const error = await response.json()
                            throw new Error(error.message || 'Failed to delete category')
                          }

                          toast.success('Category deleted')
                          fetchData()
                        } catch (error: any) {
                          console.error('Error deleting category:', error)
                          toast.error(error.message || 'Failed to delete category. Make sure no menu items are using it.')
                        }
                      }
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 