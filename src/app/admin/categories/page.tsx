'use client'

import { Category, supabase } from '@/lib/supabase'
import { Edit, Folder, Plus, Search, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function CategoriesPage() {
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

      if (error) throw error

      setCategories(categories.filter((category) => category.id !== id))
      toast.success('Category deleted successfully')
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Failed to delete category')
    }
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-playfair font-bold text-[#2C3E50] mb-1">
            Categories
          </h1>
          <p className="text-[#2C3E50]/80 font-inter">
            Organize your menu items into categories
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center px-4 py-2 bg-[#F6EACB] text-[#2C3E50] rounded-lg hover:bg-[#F1D3CE] transition-colors duration-300 font-inter"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Category
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#F1D3CE]" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-[#EECAD5] text-[#2C3E50] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F1D3CE] focus:border-transparent placeholder-[#F1D3CE] font-inter"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-lg p-6 border border-[#EECAD5] group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-[#F6EACB] group-hover:bg-[#F1D3CE] transition-colors duration-300">
                <Folder className="w-6 h-6 text-[#2C3E50]" />
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  href={`/admin/categories/${category.id}/edit`}
                  className="p-2 text-[#2C3E50] hover:bg-[#F6EACB] rounded-lg transition-colors duration-300"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-[#2C3E50] hover:bg-[#F6EACB] rounded-lg transition-colors duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-playfair font-semibold text-[#2C3E50] mb-2">
              {category.name}
            </h3>
            <p className="text-sm text-[#2C3E50]/80 font-inter">
              {category.description || 'No description provided'}
            </p>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#2C3E50] font-inter">No categories found matching your search.</p>
        </div>
      )}
    </div>
  )
} 