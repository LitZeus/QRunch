'use client'

import { supabase } from '@/lib/supabase'
import { Category, MenuItem } from '@/types'
import { ChevronUp, Search, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const itemsPerPage = 12
  const { ref, inView } = useInView()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Sort categories by predefined order
  const categoryOrder = [
    'Snacks',
    'Beverages',
    'Starters',
    'Main Course',
    'Sabji',
    'Desserts',
    'Others'
  ]

  const sortedCategories = [...categories].sort((a, b) => {
    const orderA = categoryOrder.indexOf(a.name)
    const orderB = categoryOrder.indexOf(b.name)
    if (orderA === -1) return 1
    if (orderB === -1) return -1
    return orderA - orderB
  })

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name')

        if (error) throw error
        setCategories(data || [])
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching categories:', error.message)
        } else {
          console.error('Error fetching categories:', error)
        }
      }
    }

    fetchCategories()
  }, [])

  // Fetch menu items with pagination
  const fetchMenuItems = useCallback(async (pageNum: number) => {
    try {
      setLoadingMore(true)
      const start = (pageNum - 1) * itemsPerPage
      const end = start + itemsPerPage - 1

      let query = supabase
        .from('menu_items')
        .select('*, categories(name)')
        .order('name')
        .range(start, end)

      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory)
      }

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`)
      }

      const { data, error } = await query

      if (error) throw error

      if (data) {
        if (pageNum === 1) {
          setMenuItems(data)
        } else {
          setMenuItems(prev => [...prev, ...data])
        }
        setHasMore(data.length === itemsPerPage)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching menu items:', error.message)
      } else {
        console.error('Error fetching menu items:', error)
      }
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [selectedCategory, searchQuery])

  // Initial load
  useEffect(() => {
    setPage(1)
    fetchMenuItems(1)
  }, [selectedCategory, searchQuery, fetchMenuItems])

  // Load more when scrolling
  useEffect(() => {
    if (inView && hasMore && !loadingMore) {
      setPage(prev => prev + 1)
      fetchMenuItems(page + 1)
    }
  }, [inView, hasMore, loadingMore, page, fetchMenuItems])

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setShowBackToTop(scrollRef.current.scrollTop > 300)
      }
    }

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
      return () => scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Back to top function
  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Handle drawer open/close
  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedItem(null)
  }

  return (
    <div className="min-h-screen bg-[#D1E9F6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#F6EACB] via-[#EECAD5] to-[#F1D3CE]">
        <div className="max-w-7xl mx-auto px-3 py-4 sm:py-12 sm:px-6 lg:px-8">
          <h1 className="text-center font-playfair text-xl sm:text-4xl font-bold text-[#2C3E50] mb-2">
            Our Menu
          </h1>
          <p className="text-center font-inter text-[#2C3E50]/90 text-xs sm:text-lg max-w-2xl mx-auto">
            Discover our selection of fresh, homemade dishes and specialty coffee drinks
          </p>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="max-w-7xl mx-auto px-3 py-3 sm:py-6 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#2C3E50]/40" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-lg border border-[#EECAD5] focus:outline-none focus:ring-2 focus:ring-[#F1D3CE] font-inter text-sm text-[#2C3E50] placeholder-[#2C3E50]/40 bg-white/80 backdrop-blur-sm shadow-sm"
          />
        </div>

        {/* Categories Ribbon */}
        <div className="overflow-x-auto pb-1 -mx-3 px-3 sm:mx-0 sm:px-0">
          <div className="flex gap-1.5 min-w-max">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-inter whitespace-nowrap transition-colors ${
                !selectedCategory
                  ? 'bg-[#F1D3CE] text-[#2C3E50]'
                  : 'bg-white text-[#2C3E50]/80 hover:bg-[#F6EACB]'
              }`}
            >
              All
            </button>
            {sortedCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-inter whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#F1D3CE] text-[#2C3E50]'
                    : 'bg-white text-[#2C3E50]/80 hover:bg-[#F6EACB]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div 
        ref={scrollRef}
        className="max-w-7xl mx-auto px-3 pb-12 sm:px-6 lg:px-8 h-[calc(100vh-16rem)] overflow-y-auto"
      >
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#F1D3CE]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                {/* Desktop View */}
                <div className="hidden sm:block">
                  <div className="relative h-48">
                    <Image
                      src={item.image_url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-playfair text-xl font-semibold text-[#2C3E50] mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[#2C3E50]/80 font-inter mb-3">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-inter font-semibold text-[#2C3E50]">
                        ₹{item.price.toFixed(2)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-inter ${
                        item.is_available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.is_available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile List View */}
                <div 
                  className="sm:hidden p-2.5 flex items-center justify-between cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex-1 min-w-0 mr-2">
                    <h3 className="font-playfair text-sm font-semibold text-[#2C3E50] truncate">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-[#2C3E50]/80 font-inter line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-inter font-semibold text-[#2C3E50] text-xs">
                      ₹{item.price.toFixed(2)}
                    </span>
                    <span className={`px-1 py-0.5 rounded-full text-[10px] font-inter ${
                      item.is_available
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.is_available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading More Indicator */}
        {loadingMore && (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#F1D3CE]"></div>
          </div>
        )}

        {/* Load More Trigger */}
        <div ref={ref} className="h-8" />

        {/* No Results Message */}
        {!loading && menuItems.length === 0 && (
          <div className="text-center py-8">
            <p className="font-inter text-[#2C3E50]/80 text-xs">
              No menu items found matching your search criteria.
            </p>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && selectedItem && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 transition-opacity duration-300"
            onClick={handleCloseDrawer}
          />
          
          {/* Drawer */}
          <div 
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-out"
            style={{ transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)' }}
          >
            <div className="relative h-40">
              <Image
                src={selectedItem.image_url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'}
                alt={selectedItem.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 384px"
                loading="lazy"
              />
              <button
                onClick={handleCloseDrawer}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-[#2C3E50] hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3">
              <h2 className="font-playfair text-lg font-semibold text-[#2C3E50] mb-1.5">
                {selectedItem.name}
              </h2>
              <p className="text-xs text-[#2C3E50]/80 font-inter mb-2">
                {selectedItem.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="font-inter font-semibold text-[#2C3E50] text-sm">
                  ₹{selectedItem.price.toFixed(2)}
                </span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-inter ${
                  selectedItem.is_available
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedItem.is_available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-[#F6EACB] text-[#2C3E50] p-2 rounded-full shadow-lg hover:bg-[#F1D3CE] transition-colors duration-300 z-50"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
} 