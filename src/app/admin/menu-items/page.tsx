'use client'

import { supabase } from '@/lib/supabase'
import { Category, MenuItem } from '@/types'
import { ChevronRight, Edit, Home, Plus, Search, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function MenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState('')

  useEffect(() => {
    fetchCategories()
    fetchMenuItems()
  }, [])

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

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*, categories(name)')
        .order('name')

      if (error) throw error
      setMenuItems(data || [])
    } catch (error) {
      console.error('Error fetching menu items:', error)
      toast.error('Failed to fetch menu items')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return

    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMenuItems(prev => prev.filter(item => item.id !== id))
      toast.success('Menu item deleted successfully')
    } catch (error) {
      console.error('Error deleting menu item:', error)
      toast.error('Failed to delete menu item')
    }
  }

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categories?.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = !selectedCategory || item.category_id === selectedCategory
    
    const matchesPrice = !priceRange || (
      priceRange === 'low' && item.price < 200 ||
      priceRange === 'medium' && item.price >= 200 && item.price < 500 ||
      priceRange === 'high' && item.price >= 500
    )

    return matchesSearch && matchesCategory && matchesPrice
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A6B57]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm font-inter text-[#4A6B57]">
        <Link href="/admin" className="flex items-center gap-1 hover:text-[#4A6B57]/80">
          <Home className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#4A6B57]/70">Menu Items</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-playfair font-bold text-[#4A6B57]">Menu Items</h1>
          <p className="mt-1 text-sm font-inter text-[#4A6B57]/70">
            Manage your restaurant's menu items
          </p>
        </div>
        <Link
          href="/admin/menu-items/new"
          className="flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-inter text-white bg-[#4A6B57] rounded-lg hover:bg-[#4A6B57]/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add New Item</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8D5B5] p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4A6B57]/50" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57]/20"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57]/20"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57]/20"
            >
              <option value="">All Prices</option>
              <option value="low">Under ₹200</option>
              <option value="medium">₹200 - ₹500</option>
              <option value="high">Over ₹500</option>
            </select>
          </div>
        </div>
      </div>

      {/* Menu Items List */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8D5B5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F5F5F5]">
                <th className="px-3 sm:px-4 py-2 text-left text-xs font-inter font-medium text-[#4A6B57] uppercase tracking-wider">
                  Name
                </th>
                <th className="px-3 sm:px-4 py-2 text-left text-xs font-inter font-medium text-[#4A6B57] uppercase tracking-wider">
                  Category
                </th>
                <th className="px-3 sm:px-4 py-2 text-left text-xs font-inter font-medium text-[#4A6B57] uppercase tracking-wider">
                  Price
                </th>
                <th className="px-3 sm:px-4 py-2 text-right text-xs font-inter font-medium text-[#4A6B57] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8D5B5]">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#F5F5F5]">
                  <td className="px-3 sm:px-4 py-2">
                    <div className="text-sm font-medium text-[#4A6B57]">{item.name}</div>
                    {item.description && (
                      <div className="text-xs text-[#4A6B57]/70 line-clamp-1">{item.description}</div>
                    )}
                  </td>
                  <td className="px-3 sm:px-4 py-2">
                    <div className="text-sm text-[#4A6B57]">
                      {item.categories?.name || 'Uncategorized'}
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-2">
                    <div className="text-sm text-[#4A6B57]">₹{item.price}</div>
                  </td>
                  <td className="px-3 sm:px-4 py-2 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/menu-items/${item.id}/edit`}
                        className="p-1.5 rounded-lg hover:bg-[#F0E6D2] transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-[#4A6B57]" />
                      </Link>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 rounded-lg hover:bg-[#F0E6D2] transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-[#4A6B57]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 