'use client'

import { Category } from '@/types'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

interface PageParams {
  id: string
}

export default function EditCategory({ params }: { params: { id: string } }) {
  const router = useRouter()
    const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const fetchCategory = useCallback(async () => {
    if (!params.id) return

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/categories/${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch category')
      }
      const data: Category = await response.json()
      setCategory(data)
      setName(data.name)
      setDescription(data.description || '')
    } catch (error) {
      console.error('Error fetching category:', error)
      toast.error('Failed to load category data.')
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    fetchCategory()
  }, [fetchCategory])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/categories/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update category')
      }

      toast.success('Category updated successfully')
      router.push('/admin/categories')
    } catch (error: any) {
      console.error('Error updating category:', error)
      toast.error(error.message || 'Failed to update category')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A6B57]"></div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="text-center py-8">
        <p className="text-[#4A6B57]">Category not found</p>
        <Link
          href="/admin/categories"
          className="mt-4 inline-block text-sm font-inter text-[#4A6B57] hover:text-[#4A6B57]/80"
        >
          Back to Categories
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/categories"
          className="p-2 rounded-lg hover:bg-[#F0E6D2] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#4A6B57]" />
        </Link>
        <div>
          <h1 className="text-2xl font-playfair font-bold text-[#4A6B57]">Edit Category</h1>
          <p className="mt-1 text-sm font-inter text-[#4A6B57]/70">
            Update category details
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8D5B5] p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-inter font-medium text-[#4A6B57]">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57]/20"
              placeholder="Enter category name"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-inter font-medium text-[#4A6B57]">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57]/20"
              placeholder="Enter category description"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Link
              href="/admin/categories"
              className="px-4 py-2 text-sm font-inter text-[#4A6B57] bg-white border border-[#E8D5B5] rounded-lg hover:bg-[#F5F5F5] transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-inter text-white bg-[#4A6B57] rounded-lg hover:bg-[#4A6B57]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}