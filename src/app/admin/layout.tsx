'use client'

import { supabase } from '@/lib/supabase'
import { FolderPlus, LogOut, Menu, Settings, Utensils, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: Settings,
      current: pathname === '/admin'
    },
    {
      name: 'Menu Items',
      href: '/admin/menu-items',
      icon: Utensils,
      current: pathname.startsWith('/admin/menu-items')
    },
    {
      name: 'Categories',
      href: '/admin/categories',
      icon: FolderPlus,
      current: pathname.startsWith('/admin/categories')
    }
  ]

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-white border-r border-[#E8D5B5]">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-[#E8D5B5]">
            <Utensils className="w-8 h-8 text-[#4A6B57]" />
            <span className="ml-3 text-xl font-playfair font-bold text-[#4A6B57]">Admin Panel</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-inter rounded-lg transition-colors duration-200 ${
                  item.current
                    ? 'bg-[#F0E6D2] text-[#4A6B57] shadow-sm'
                    : 'text-[#4A6B57] hover:bg-[#F0E6D2]'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-[#E8D5B5]">
            <button
              onClick={() => {
                supabase.auth.signOut()
                window.location.href = '/login'
              }}
              className="flex items-center w-full px-4 py-3 text-sm font-inter text-[#4A6B57] rounded-lg hover:bg-[#F0E6D2]/50 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:hidden`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-[#E8D5B5]">
            <div className="flex items-center">
              <Utensils className="w-8 h-8 text-[#4A6B57]" />
              <span className="ml-2 text-xl font-playfair font-bold text-[#4A6B57]">Admin Panel</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-md text-[#4A6B57] hover:bg-[#F0E6D2]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-base font-inter rounded-lg transition-colors duration-200 ${
                  item.current
                    ? 'bg-[#F0E6D2] text-[#4A6B57]'
                    : 'text-[#4A6B57] hover:bg-[#F0E6D2]'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="w-6 h-6 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-[#E8D5B5]">
            <button
              onClick={() => {
                supabase.auth.signOut()
                window.location.href = '/login'
              }}
              className="flex items-center w-full px-4 py-3 text-base font-inter text-[#4A6B57] rounded-lg hover:bg-[#F0E6D2]/50"
            >
              <LogOut className="w-6 h-6 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-[#E8D5B5]">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-[#4A6B57] hover:bg-[#F0E6D2]"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="ml-2 text-lg font-playfair font-semibold text-[#4A6B57]">
                {navigation.find(item => item.current)?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-inter text-[#4A6B57]">Welcome, Admin</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
} 