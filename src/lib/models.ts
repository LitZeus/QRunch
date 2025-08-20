import { queryRows, queryRow, insert, update, remove } from './db';

// Category model
export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export const CategoryModel = {
  async findAll(): Promise<Category[]> {
    return queryRows<Category>('SELECT * FROM categories ORDER BY name');
  },

  async findById(id: string): Promise<Category | null> {
    return queryRow<Category>('SELECT * FROM categories WHERE id = $1', [id]);
  },

  async create(data: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category> {
    return insert('categories', data, '*');
  },

  async update(id: string, data: Partial<Category>): Promise<Category> {
    return update('categories', id, data);
  },

  async delete(id: string): Promise<boolean> {
    return remove('categories', id);
  },
};

// Menu Item model
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  image_url?: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export const MenuItemModel = {
  async findAll(): Promise<MenuItem[]> {
    const query = `
      SELECT m.*, c.name as category_name 
      FROM menu_items m
      JOIN categories c ON m.category_id = c.id
      ORDER BY c.name, m.name
    `;
    return queryRows<MenuItem>(query);
  },

  async findById(id: string): Promise<(MenuItem & { category_name: string }) | null> {
    const query = `
      SELECT m.*, c.name as category_name 
      FROM menu_items m
      JOIN categories c ON m.category_id = c.id
      WHERE m.id = $1
    `;
    return queryRow<MenuItem & { category_name: string }>(query, [id]);
  },

  async create(data: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>): Promise<MenuItem> {
    return insert('menu_items', data, '*');
  },

  async update(id: string, data: Partial<MenuItem>): Promise<MenuItem> {
    return update('menu_items', id, data);
  },

  async delete(id: string): Promise<boolean> {
    return remove('menu_items', id);
  },
};

// Table QR model
export interface TableQR {
  id: string;
  table_number: number;
  qr_code_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const TableQRModel = {
  async findAll(): Promise<TableQR[]> {
    return queryRows<TableQR>('SELECT * FROM table_qrs ORDER BY table_number');
  },

  async findById(id: string): Promise<TableQR | null> {
    return queryRow<TableQR>('SELECT * FROM table_qrs WHERE id = $1', [id]);
  },

  async create(data: Omit<TableQR, 'id' | 'created_at' | 'updated_at'>): Promise<TableQR> {
    return insert('table_qrs', data, '*');
  },

  async update(id: string, data: Partial<TableQR>): Promise<TableQR> {
    return update('table_qrs', id, data);
  },

  async delete(id: string): Promise<boolean> {
    return remove('table_qrs', id);
  },
};
