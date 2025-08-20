export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface MenuItem extends BaseEntity {
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category_id: string;
  is_available: boolean;
  // Joined fields from category
  category_name: string;
  category?: Category; // Optional category object for type safety
}

export interface Category extends BaseEntity {
  name: string;
  description: string | null;
  // Additional fields for UI
  is_expanded?: boolean;
}

export interface MenuItemWithCategory extends MenuItem {
  category_name: string;
}

export interface MenuFilters {
  searchQuery: string;
  selectedCategories: string[];
  priceRange: [number, number];
  sortBy: 'name' | 'price';
  sortOrder: 'asc' | 'desc';
}

export interface MenuState {
  menuItems: MenuItem[];
  categories: Category[];
  wishlist: MenuItem[];
  loading: boolean;
  error: string | null;
  filters: MenuFilters;
}