'use client'

import { supabase } from '@/lib/supabase'
import { Category, MenuItem } from '@/types'
import { ArrowLeft, ArrowUpDown, ChevronDown, ChevronUp, Filter, Heart, Share2, Trash2, ChevronUp as UpIcon, Utensils } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [wishlist, setWishlist] = useState<MenuItem[]>([])
  const [showWishlist, setShowWishlist] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showFilters, setShowFilters] = useState(false)
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

  // Fetch categories and menu items
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name')

        if (categoriesError) throw categoriesError
        setCategories(categoriesData || [])

        // Fetch menu items
        const { data: menuItemsData, error: menuItemsError } = await supabase
          .from('menu_items')
          .select('*, categories(name)')
          .order('name')

        if (menuItemsError) throw menuItemsError
        setMenuItems(menuItemsData || [])
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching data:', error.message)
        } else {
          console.error('Error fetching data:', error)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    document.title = 'Menu - Verandah'
  }, [])

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  // Filter and sort menu items
  const filteredMenuItems = menuItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category_id)
      const matchesPrice = item.price >= priceRange.min && item.price <= priceRange.max
      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      } else {
        return sortOrder === 'asc'
          ? a.price - b.price
          : b.price - a.price
      }
    })

  // Toggle category with simple animation
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }))
  }

  // Toggle wishlist with simple animation
  const toggleWishlist = (item: MenuItem) => {
    setWishlist(prev => {
      const isInWishlist = prev.some(i => i.id === item.id)
      return isInWishlist
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    })
  }

  // Clear wishlist
  const clearWishlist = () => {
    setWishlist([])
  }

  // Share wishlist
  const shareWishlist = async () => {
    const wishlistText = wishlist.map(item => `${item.name} - ₹${item.price}`).join('\n')
    const shareData = {
      title: 'My Verandah Wishlist',
      text: wishlistText,
    }

    try {
      // Try Web Share API first
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(shareData)
      } else if (typeof navigator !== &apos;undefined&apos; && navigator.clipboard) {
        // Fallback to clipboard API
        await navigator.clipboard.writeText(wishlistText)
        alert(&apos;Wishlist copied to clipboard!&apos;)
      } else {
        // Manual copy fallback
        const textArea = document.createElement(&apos;textarea&apos;)
        textArea.value = wishlistText
        document.body.appendChild(textArea)
        textArea.select()
        try {
          document.execCommand(&apos;copy&apos;)
          alert(&apos;Wishlist copied to clipboard!&apos;)
        } catch (error) {
          alert(`My Verandah Wishlist:\n\n${wishlistText}\n\nYou can copy this text manually.`)
        }
        document.body.removeChild(textArea)
      }
    } catch (error) {
      console.error('Error sharing:', error)
      // If all methods fail, show the text in an alert
      alert(`My Verandah Wishlist:\n\n${wishlistText}\n\nYou can copy this text manually.`)
    }
  }

  // Handle scroll to top
  const handleScrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setShowBackToTop(scrollRef.current.scrollTop > 300)
      }
    }

    const currentRef = scrollRef.current
    currentRef?.addEventListener('scroll', handleScroll)
    return () => currentRef?.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A6B57]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-[#4A6B57] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/90 backdrop-blur-sm mb-4">
              <Utensils className="w-7 h-7 sm:w-10 sm:h-10 text-[#4A6B57]" />
            </div>
            <Link href="/" className="text-2xl sm:text-3xl font-playfair font-bold text-white text-center hover:text-white/90 transition-colors">
              Verandah
            </Link>
            <button
              onClick={() => setShowWishlist(!showWishlist)}
              className="mt-4 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm text-[#4A6B57] hover:bg-white transition-colors text-sm sm:text-base"
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : 'text-[#4A6B57]'}`} />
              <span>Wishlist ({wishlist.length})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {showWishlist ? (
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-playfair font-semibold text-[#4A6B57]">Your Wishlist</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={shareWishlist}
                  className="p-2 rounded-lg bg-[#F0E6D2] text-[#4A6B57] hover:bg-[#E8D9B5] transition-colors"
                  title="Share Wishlist"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={clearWishlist}
                  className="p-2 rounded-lg bg-[#F0E6D2] text-[#4A6B57] hover:bg-[#E8D9B5] transition-colors"
                  title="Clear Wishlist"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setShowWishlist(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F0E6D2] text-[#4A6B57] hover:bg-[#E8D9B5] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back</span>
                </button>
              </div>
            </div>
            {wishlist.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#4A6B57]/30 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-[#4A6B57]/70">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {wishlist.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-[#F0E6D2] transition-colors hover:bg-[#E8D9B5]"
                  >
                    <div>
                      <h3 className="text-sm sm:text-base font-medium text-[#4A6B57]">{item.name}</h3>
                      <p className="text-xs sm:text-sm text-[#4A6B57]/70">{item.categories?.name}</p>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="text-sm sm:text-base text-[#4A6B57] font-medium">₹{item.price}</span>
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="p-1 rounded-full hover:bg-[#E8D9B5]"
                      >
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 fill-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 rounded-lg border border-[#E8D5B5] focus:outline-none focus:ring-2 focus:ring-[#4A6B57] focus:border-transparent text-sm sm:text-base text-[#4A6B57] placeholder-[#4A6B57]/50 bg-white"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-[#4A6B57]/50"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F0E6D2] text-[#4A6B57] hover:bg-[#E8D9B5] transition-colors w-full sm:w-auto"
                    >
                      <Filter className="w-4 h-4" />
                      <span className="text-sm">Filters</span>
                    </button>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
                        className="w-full sm:w-auto px-3 py-2 rounded-lg border border-[#E8D5B5] focus:outline-none focus:ring-2 focus:ring-[#4A6B57] focus:border-transparent text-sm text-[#4A6B57] bg-white"
                      >
                        <option value="name">Sort by Name</option>
                        <option value="price">Sort by Price</option>
                      </select>
                      <button
                        onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                        className="p-2 rounded-lg bg-[#F0E6D2] text-[#4A6B57] hover:bg-[#E8D9B5] transition-colors"
                      >
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {showFilters && (
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#F0E6D2] rounded-lg">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-[#4A6B57]">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                          <button
                            key={category.id}
                            onClick={() => {
                              setSelectedCategories(prev =>
                                prev.includes(category.id)
                                  ? prev.filter(id => id !== category.id)
                                  : [...prev, category.id]
                              )
                            }}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
                              selectedCategories.includes(category.id)
                                ? 'bg-[#4A6B57] text-white'
                                : 'bg-white text-[#4A6B57] hover:bg-[#E8D9B5]'
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-[#4A6B57]">Price Range</h3>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                          className="w-20 px-2 py-1 rounded-lg border border-[#E8D5B5] text-sm text-[#4A6B57] bg-white"
                          placeholder="Min"
                        />
                        <span className="text-[#4A6B57]">to</span>
                        <input
                          type="number"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                          className="w-20 px-2 py-1 rounded-lg border border-[#E8D5B5] text-sm text-[#4A6B57] bg-white"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Categories and Menu Items */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-playfair font-semibold text-[#4A6B57] mb-4 sm:mb-6">Menu</h2>
              <div className="space-y-3 sm:space-y-4">
                {sortedCategories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="flex items-center justify-between w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#F0E6D2] hover:bg-[#E8D9B5] transition-colors"
                    >
                      <span className="text-base sm:text-lg font-medium text-[#4A6B57]">{category.name}</span>
                      {expandedCategories[category.id] ? (
                        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A6B57]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A6B57]" />
                      )}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-150 ease-in-out ${
                        expandedCategories[category.id] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pl-3 sm:pl-4 space-y-2">
                        {filteredMenuItems
                          .filter(item => item.category_id === category.id)
                          .map(item => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-[#F0E6D2] transition-colors"
                            >
                              <div>
                                <h3 className="text-sm sm:text-base font-medium text-[#4A6B57]">{item.name}</h3>
                                <p className="text-xs sm:text-sm text-[#4A6B57]/70">{item.description}</p>
                              </div>
                              <div className="flex items-center gap-3 sm:gap-4">
                                <span className="text-sm sm:text-base text-[#4A6B57] font-medium">₹{item.price}</span>
                                <button
                                  onClick={() => toggleWishlist(item)}
                                  className="p-1 rounded-full hover:bg-[#E8D9B5]"
                                >
                                  <Heart
                                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                                      wishlist.some(i => i.id === item.id)
                                        ? 'text-red-500 fill-red-500'
                                        : 'text-[#4A6B57]'
                                    }`}
                                  />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showBackToTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 p-2 sm:p-3 rounded-full bg-[#4A6B57] text-white shadow-lg hover:bg-[#4A6B57]/90 transition-colors duration-200"
          aria-label="Scroll to top"
        >
          <UpIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}
    </div>
  )
}