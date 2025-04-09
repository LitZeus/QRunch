export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image_url: string | null
  category_id: string
  is_available: boolean
  created_at: string
  updated_at: string
  categories?: {
    name: string
  }
}

export interface Category {
  id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
} 