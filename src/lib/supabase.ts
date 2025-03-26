import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()

// Database types
export type Category = {
  id: string
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  category_id: string
  image_url?: string
  is_available: boolean
  created_at: string
  updated_at: string
  category?: Category
}

export type TableQR = {
  id: string
  table_number: number
  qr_code_url: string
  is_active: boolean
  created_at: string
  updated_at: string
} 