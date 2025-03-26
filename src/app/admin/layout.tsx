'use client'

import { supabase } from '@/lib/supabase'
import { Coffee, Folder, LogOut, Menu, Settings, Table, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/login')
      }
    }
    checkSession()
  }, [router])

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.replace('/login')
      toast.success('Logged out successfully!')
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Error logging out')
      } else {
        toast.error('Error logging out')
      }
    }
  }

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-[#D1E9F6]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-white border-r border-[#EECAD5]">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-[#EECAD5]">
            <Coffee className="w-8 h-8 text-[#F1D3CE]" />
            <span className="ml-3 text-xl font-playfair font-bold text-[#2C3E50]">Admin Panel</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <Link
              href="/admin"
              className={`flex items-center px-4 py-3 text-sm font-inter rounded-lg transition-colors duration-200 ${
                pathname === '/admin'
                  ? 'bg-[#F6EACB] text-[#2C3E50] shadow-sm'
                  : 'text-[#2C3E50] hover:bg-[#F6EACB]/50'
              }`}
            >
              <Settings className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link
              href="/admin/menu-items"
              className={`flex items-center px-4 py-3 text-sm font-inter rounded-lg transition-colors duration-200 ${
                pathname === '/admin/menu-items'
                  ? 'bg-[#F6EACB] text-[#2C3E50] shadow-sm'
                  : 'text-[#2C3E50] hover:bg-[#F6EACB]/50'
              }`}
            >
              <Menu className="w-5 h-5 mr-3" />
              Menu Items
            </Link>
            <Link
              href="/admin/categories"
              className={`flex items-center px-4 py-3 text-sm font-inter rounded-lg transition-colors duration-200 ${
                pathname === '/admin/categories'
                  ? 'bg-[#F6EACB] text-[#2C3E50] shadow-sm'
                  : 'text-[#2C3E50] hover:bg-[#F6EACB]/50'
              }`}
            >
              <Folder className="w-5 h-5 mr-3" />
              Categories
            </Link>
            <Link
              href="/admin/table-qrs"
              className={`flex items-center px-4 py-3 text-sm font-inter rounded-lg transition-colors duration-200 ${
                pathname === '/admin/table-qrs'
                  ? 'bg-[#F6EACB] text-[#2C3E50] shadow-sm'
                  : 'text-[#2C3E50] hover:bg-[#F6EACB]/50'
              }`}
            >
              <Table className="w-5 h-5 mr-3" />
              Table QR Codes
            </Link>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-[#EECAD5]">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-inter text-[#2C3E50] rounded-lg hover:bg-[#F6EACB]/50 transition-colors duration-200"
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
          <div className="flex items-center justify-between h-16 px-4 border-b border-[#EECAD5]">
            <div className="flex items-center">
              <Coffee className="w-8 h-8 text-[#F1D3CE]" />
              <span className="ml-2 text-xl font-playfair font-bold text-[#2C3E50]">Admin Panel</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-md text-[#2C3E50] hover:bg-[#F6EACB]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <Link
              href="/admin"
              className={`flex items-center px-4 py-3 text-base font-inter rounded-lg ${
                pathname === '/admin'
                  ? 'bg-[#F6EACB] text-[#2C3E50]'
                  : 'text-[#2C3E50] hover:bg-[#F6EACB]/50'
              }`}
            >
              <Settings className="w-6 h-6 mr-3" />
              Dashboard
            </Link>
            <Link
              href="/admin/menu-items"
              className={`flex items-center px-4 py-3 text-base font-inter rounded-lg ${
                pathname === '/admin/menu-items'
                  ? 'bg-[#F6EACB] text-[#2C3E50]'
                  : 'text-[#2C3E50] hover:bg-[#F6EACB]/50'
              }`}
            >
              <Menu className="w-6 h-6 mr-3" />
              Menu Items
            </Link>
            <Link
              href="/admin/categories"
              className={`flex items-center px-4 py-3 text-base font-inter rounded-lg ${
                pathname === '/admin/categories'
                  ? 'bg-[#F6EACB] text-[#2C3E50]'
                  : 'text-[#2C3E50] hover:bg-[#F6EACB]/50'
              }`}
            >
              <Folder className="w-6 h-6 mr-3" />
              Categories
            </Link>
            <Link
              href="/admin/table-qrs"
              className={`flex items-center px-4 py-3 text-base font-inter rounded-lg ${
                pathname === '/admin/table-qrs'
                  ? 'bg-[#F6EACB] text-[#2C3E50]'
                  : 'text-[#2C3E50] hover:bg-[#F6EACB]/50'
              }`}
            >
              <Table className="w-6 h-6 mr-3" />
              Table QR Codes
            </Link>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-[#EECAD5]">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-base font-inter text-[#2C3E50] rounded-lg hover:bg-[#F6EACB]/50"
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
        <div className="sticky top-0 z-30 bg-white border-b border-[#EECAD5]">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-[#2C3E50] hover:bg-[#F6EACB]"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="ml-2 text-lg font-playfair font-semibold text-[#2C3E50]">
                {pathname === '/admin' && 'Dashboard'}
                {pathname === '/admin/menu-items' && 'Menu Items'}
                {pathname === '/admin/categories' && 'Categories'}
                {pathname === '/admin/table-qrs' && 'Table QR Codes'}
              </h1>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-inter text-[#2C3E50]">Welcome, Admin</span>
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