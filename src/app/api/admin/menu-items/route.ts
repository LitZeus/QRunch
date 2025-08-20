import { NextResponse } from 'next/server';
import { MenuItemModel } from '@/lib/models';
import { requireAdmin } from '@/lib/auth';

// GET /api/admin/menu-items
export async function GET() {
  try {
    const menuItems = await MenuItemModel.findAll();
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

// POST /api/admin/menu-items
export const POST = requireAdmin(async (request: Request) => {
  try {
    const data = await request.json();
    const newMenuItem = await MenuItemModel.create(data);
    return NextResponse.json(newMenuItem, { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json(
      { error: 'Failed to create menu item' },
      { status: 500 }
    );
  }
});
