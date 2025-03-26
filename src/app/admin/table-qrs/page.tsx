'use client'

import { TableQR, supabase } from '@/lib/supabase'
import { Edit, Plus, QrCode, Search, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function TableQRsPage() {
  const [tableQRs, setTableQRs] = useState<TableQR[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchTableQRs()
  }, [])

  const fetchTableQRs = async () => {
    try {
      const { data, error } = await supabase
        .from('table_qrs')
        .select('*')
        .order('table_number')

      if (error) throw error
      setTableQRs(data || [])
    } catch (error) {
      console.error('Error fetching table QR codes:', error)
      toast.error('Failed to fetch table QR codes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this table QR code?')) return

    try {
      const { error } = await supabase
        .from('table_qrs')
        .delete()
        .eq('id', id)

      if (error) throw error

      setTableQRs(tableQRs.filter((qr) => qr.id !== id))
      toast.success('Table QR code deleted successfully')
    } catch (error) {
      console.error('Error deleting table QR code:', error)
      toast.error('Failed to delete table QR code')
    }
  }

  const filteredTableQRs = tableQRs.filter((qr) =>
    qr.table_number.toString().includes(searchQuery)
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
            Table QR Codes
          </h1>
          <p className="text-[#2C3E50]/80 font-inter">
            Generate and manage QR codes for your tables
          </p>
        </div>
        <Link
          href="/admin/table-qrs/new"
          className="inline-flex items-center px-4 py-2 bg-[#F6EACB] text-[#2C3E50] rounded-lg hover:bg-[#F1D3CE] transition-colors duration-300 font-inter"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New QR Code
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#F1D3CE]" />
        <input
          type="text"
          placeholder="Search QR codes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-[#EECAD5] text-[#2C3E50] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F1D3CE] focus:border-transparent placeholder-[#F1D3CE] font-inter"
        />
      </div>

      {/* QR Codes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTableQRs.map((qr) => (
          <div
            key={qr.id}
            className="bg-white rounded-xl shadow-lg p-6 border border-[#EECAD5] group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-[#F6EACB] group-hover:bg-[#F1D3CE] transition-colors duration-300">
                <QrCode className="w-6 h-6 text-[#2C3E50]" />
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  href={`/admin/table-qrs/${qr.id}/edit`}
                  className="p-2 text-[#2C3E50] hover:bg-[#F6EACB] rounded-lg transition-colors duration-300"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(qr.id)}
                  className="p-2 text-[#2C3E50] hover:bg-[#F6EACB] rounded-lg transition-colors duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-playfair font-semibold text-[#2C3E50] mb-2">
              Table {qr.table_number}
            </h3>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs px-2 py-1 rounded-full ${
                qr.is_active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-[#F6EACB] text-[#2C3E50]'
              } font-inter`}>
                {qr.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            {qr.qr_code_url && (
              <div className="mt-4 flex justify-center">
                <Image
                  src={qr.qr_code_url}
                  alt={`Table ${qr.table_number} QR Code`}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTableQRs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#2C3E50] font-inter">No QR codes found matching your search.</p>
        </div>
      )}
    </div>
  )
} 