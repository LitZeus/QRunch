'use client'

import { Coffee, Folder, Menu, Plus, Table } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-[#EECAD5]">
        <h1 className="text-2xl font-playfair font-bold text-[#2C3E50] mb-2">
          Welcome to The Grand Plate
        </h1>
        <p className="text-[#2C3E50]/80 font-inter">
          Welcome to your cafe&apos;s admin dashboard
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/admin/menu-items"
          className="bg-white rounded-xl shadow-lg p-6 border border-[#EECAD5] hover:shadow-[#EECAD5]/50 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-[#F6EACB] group-hover:bg-[#F1D3CE] transition-colors duration-300">
              <Menu className="w-6 h-6 text-[#2C3E50]" />
            </div>
            <Plus className="w-5 h-5 text-[#F1D3CE]" />
          </div>
          <h3 className="text-lg font-playfair font-semibold text-[#2C3E50] mb-2">
            Menu Items
          </h3>
          <p className="text-sm text-[#2C3E50]/80 font-inter">
            Manage your cafe&apos;s menu items
          </p>
        </Link>

        <Link
          href="/admin/categories"
          className="bg-white rounded-xl shadow-lg p-6 border border-[#EECAD5] hover:shadow-[#EECAD5]/50 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-[#F6EACB] group-hover:bg-[#F1D3CE] transition-colors duration-300">
              <Folder className="w-6 h-6 text-[#2C3E50]" />
            </div>
            <Plus className="w-5 h-5 text-[#F1D3CE]" />
          </div>
          <h3 className="text-lg font-playfair font-semibold text-[#2C3E50] mb-2">
            Categories
          </h3>
          <p className="text-sm text-[#2C3E50]/80 font-inter">
            Organize your menu items into categories
          </p>
        </Link>

        <Link
          href="/admin/table-qrs"
          className="bg-white rounded-xl shadow-lg p-6 border border-[#EECAD5] hover:shadow-[#EECAD5]/50 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-[#F6EACB] group-hover:bg-[#F1D3CE] transition-colors duration-300">
              <Table className="w-6 h-6 text-[#2C3E50]" />
            </div>
            <Plus className="w-5 h-5 text-[#F1D3CE]" />
          </div>
          <h3 className="text-lg font-playfair font-semibold text-[#2C3E50] mb-2">
            Table QR Codes
          </h3>
          <p className="text-sm text-[#2C3E50]/80 font-inter">
            Generate QR codes for your cafe&apos;s tables
          </p>
        </Link>

        <Link
          href="/admin/menu-items/new"
          className="bg-white rounded-xl shadow-lg p-6 border border-[#EECAD5] hover:shadow-[#EECAD5]/50 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-[#F6EACB] group-hover:bg-[#F1D3CE] transition-colors duration-300">
              <Plus className="w-6 h-6 text-[#2C3E50]" />
            </div>
            <Coffee className="w-5 h-5 text-[#F1D3CE]" />
          </div>
          <h3 className="text-lg font-playfair font-semibold text-[#2C3E50] mb-2">
            Add New Item
          </h3>
          <p className="text-sm text-[#2C3E50]/80 font-inter">
            Create a new menu item quickly
          </p>
        </Link>
      </div>

      {/* Quick Tips */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-[#EECAD5]">
        <h2 className="text-xl font-playfair font-bold text-[#2C3E50] mb-4">
          Quick Tips
        </h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-[#F6EACB] mr-3">
              <Coffee className="w-5 h-5 text-[#2C3E50]" />
            </div>
            <div>
              <h3 className="text-sm font-playfair font-semibold text-[#2C3E50] mb-1">
                Keep Menu Fresh
              </h3>
              <p className="text-sm text-[#2C3E50]/80 font-inter">
                Regularly update your menu items and prices to keep your offerings current and competitive.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-[#F6EACB] mr-3">
              <Menu className="w-5 h-5 text-[#2C3E50]" />
            </div>
            <div>
              <h3 className="text-sm font-playfair font-semibold text-[#2C3E50] mb-1">
                Organize Categories
              </h3>
              <p className="text-sm text-[#2C3E50]/80 font-inter">
                Use clear and logical categories to help customers find what they're looking for easily.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-[#F6EACB] mr-3">
              <Table className="w-5 h-5 text-[#2C3E50]" />
            </div>
            <div>
              <h3 className="text-sm font-playfair font-semibold text-[#2C3E50] mb-1">
                QR Code Management
              </h3>
              <p className="text-sm text-[#2C3E50]/80 font-inter">
                Keep your table QR codes up to date and ensure they're properly assigned to tables.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 