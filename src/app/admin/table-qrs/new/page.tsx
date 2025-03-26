'use client'

import { supabase } from '@/lib/supabase'
import { ArrowLeft } from 'lucide-react'
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
      const { error } = await supabase
        .from('tables')
        .insert([{
          ...formData,
          capacity: parseInt(formData.capacity),
        }])

      if (error) throw error

      toast.success('Table added successfully!')
      router.push('/admin/table-qrs')
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Error adding table')
        console.error('Error:', error.message)
      } else {
        toast.error('Error adding table')
        console.error('Error:', error)
      }
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
    <div className="min-h-screen bg-[#D1E9F6] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#2C3E50] hover:text-[#F1D3CE] transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-playfair font-bold text-[#2C3E50] mb-6">
            Add New Table
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="table_number" className="block text-sm font-inter text-[#2C3E50] mb-2">
                Table Number
              </label>
              <input
                type="text"
                id="table_number"
                name="table_number"
                value={formData.table_number}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-[#EECAD5] focus:outline-none focus:ring-2 focus:ring-[#F1D3CE] font-inter text-sm text-[#2C3E50]"
                placeholder="Enter table number"
              />
            </div>

            <div>
              <label htmlFor="capacity" className="block text-sm font-inter text-[#2C3E50] mb-2">
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
                className="w-full px-4 py-2 rounded-lg border border-[#EECAD5] focus:outline-none focus:ring-2 focus:ring-[#F1D3CE] font-inter text-sm text-[#2C3E50]"
                placeholder="Enter table capacity"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-inter text-[#2C3E50] mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-[#EECAD5] focus:outline-none focus:ring-2 focus:ring-[#F1D3CE] font-inter text-sm text-[#2C3E50]"
                placeholder="Enter table location (e.g., 'Indoor', 'Outdoor', 'Bar')"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 text-[#F1D3CE] border-[#EECAD5] rounded focus:ring-[#F1D3CE]"
              />
              <label htmlFor="is_active" className="ml-2 text-sm font-inter text-[#2C3E50]">
                Active
              </label>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 rounded-lg border border-[#EECAD5] text-[#2C3E50] font-inter font-medium hover:bg-[#F6EACB] transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 rounded-lg bg-[#F1D3CE] text-[#2C3E50] font-inter font-medium hover:bg-[#F6EACB] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Add Table'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 