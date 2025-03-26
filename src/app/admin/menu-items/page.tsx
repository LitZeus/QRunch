'use client'

import { MenuItem, supabase } from '@/lib/supabase'
import { Edit, Filter, Image as ImageIcon, Plus, Search, Star, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*, category:categories(*)')
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMenuItems(menuItems.filter((item) => item.id !== id))
      toast.success('Menu item deleted successfully')
    } catch (error) {
      console.error('Error deleting menu item:', error)
      toast.error('Failed to delete menu item')
    }
  }

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || item.category_id === selectedCategory
    return matchesSearch && matchesCategory
  })

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
            Menu Items
          </h1>
          <p className="text-[#2C3E50]/80 font-inter">
            Manage your cafe&apos;s menu items and their details
          </p>
        </div>
        <Link
          href="/admin/menu-items/new"
          className="inline-flex items-center px-4 py-2 bg-[#F6EACB] text-[#2C3E50] rounded-lg hover:bg-[#F1D3CE] transition-colors duration-300 font-inter"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Item
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#F1D3CE]" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-[#EECAD5] text-[#2C3E50] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F1D3CE] focus:border-transparent placeholder-[#F1D3CE] font-inter"
          />
        </div>
        <button
          onClick={() => setSelectedCategory(null)}
          className={`inline-flex items-center px-4 py-2.5 text-sm rounded-lg font-inter ${
            !selectedCategory
              ? 'bg-[#F6EACB] text-[#2C3E50]'
              : 'bg-white border border-[#EECAD5] text-[#2C3E50] hover:bg-[#F6EACB]/50'
          }`}
        >
          <Filter className="w-4 h-4 mr-2" />
          All Categories
        </button>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#EECAD5] group"
          >
            {item.image_url ? (
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  width={400}
                  height={225}
                  className="rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="aspect-w-16 aspect-h-9 bg-[#F6EACB] flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-[#2C3E50]/40" />
              </div>
            )}
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-playfair font-semibold text-[#2C3E50]">
                  {item.name}
                </h3>
                <p className="text-lg font-playfair font-bold text-[#F1D3CE]">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <p className="text-sm text-[#2C3E50]/80 line-clamp-2 mb-4 font-inter">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-[#F1D3CE] font-inter">
                  <Star className="w-3 h-3 mr-1" />
                  <span>{item.category?.name || 'Uncategorized'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/admin/menu-items/${item.id}/edit`}
                    className="p-2 text-[#2C3E50] hover:bg-[#F6EACB] rounded-lg transition-colors duration-300"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-[#2C3E50] hover:bg-[#F6EACB] rounded-lg transition-colors duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#2C3E50] font-inter">No menu items found matching your search.</p>
        </div>
      )}
    </div>
  )
} 