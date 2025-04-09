'use client'

import { supabase } from '@/lib/supabase'
import { Category } from '@/types'
import { ChevronRight, Edit, Home, Plus, Search, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchCategories()
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
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

      if (error) throw error

      setCategories(prev => prev.filter(category => category.id !== id))
      toast.success('Category deleted successfully')
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Failed to delete category')
    }
  }

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
        <span className="text-[#4A6B57]/70">Categories</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-playfair font-bold text-[#4A6B57]">Categories</h1>
          <p className="mt-1 text-sm font-inter text-[#4A6B57]/70">
            Manage your menu categories
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-inter text-white bg-[#4A6B57] rounded-lg hover:bg-[#4A6B57]/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add New Category</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8D5B5] p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4A6B57]/50" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57]/20"
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8D5B5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F5F5F5]">
                <th className="px-3 sm:px-4 py-2 text-left text-xs font-inter font-medium text-[#4A6B57] uppercase tracking-wider">
                  Name
                </th>
                <th className="px-3 sm:px-4 py-2 text-right text-xs font-inter font-medium text-[#4A6B57] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8D5B5]">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-[#F5F5F5]">
                  <td className="px-3 sm:px-4 py-2">
                    <div className="text-sm font-medium text-[#4A6B57]">{category.name}</div>
                  </td>
                  <td className="px-3 sm:px-4 py-2 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="p-1.5 rounded-lg hover:bg-[#F0E6D2] transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-[#4A6B57]" />
                      </Link>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
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