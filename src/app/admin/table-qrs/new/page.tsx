'use client'

import { ArrowLeft, QrCode } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function NewTablePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    table_number: '',
    capacity: '',
    location: '',
    is_active: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/table-qrs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          capacity: parseInt(formData.capacity),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to add table')
      }

      toast.success('Table added successfully!')
      router.push('/admin/table-qrs')
    } catch (error: any) {
      console.error('Error adding table:', error)
      toast.error(error.message || 'Error adding table')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg bg-[#F0E6D2] text-[#4A6B57] hover:bg-[#F0E6D2]/80 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-playfair font-bold text-[#4A6B57] ml-4">Add New Table</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E8D5B5]">
          <div className="space-y-4">
            <div>
              <label htmlFor="table_number" className="block text-sm font-inter font-medium text-[#4A6B57] mb-1">
                Table Number
              </label>
              <input
                type="number"
                id="table_number"
                name="table_number"
                value={formData.table_number}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 rounded-lg border border-[#E8D5B5] focus:outline-none focus:ring-2 focus:ring-[#4A6B57] focus:border-transparent"
                placeholder="Enter table number"
              />
            </div>

            <div>
              <label htmlFor="capacity" className="block text-sm font-inter font-medium text-[#4A6B57] mb-1">
                Capacity
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 rounded-lg border border-[#E8D5B5] focus:outline-none focus:ring-2 focus:ring-[#4A6B57] focus:border-transparent"
                placeholder="Enter table capacity"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-inter font-medium text-[#4A6B57] mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-[#E8D5B5] focus:outline-none focus:ring-2 focus:ring-[#4A6B57] focus:border-transparent"
                placeholder="Enter table location (e.g., 'Near Window', 'Garden View')"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 rounded border-[#E8D5B5] text-[#4A6B57] focus:ring-[#4A6B57]"
              />
              <label htmlFor="is_active" className="ml-2 text-sm font-inter text-[#4A6B57]">
                Active
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-3 bg-[#4A6B57] text-white rounded-lg hover:bg-[#4A6B57]/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              <>
                <QrCode className="w-5 h-5 mr-2" />
                Add Table
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
} 