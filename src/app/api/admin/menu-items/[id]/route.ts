import { NextResponse } from 'next/server';
import { MenuItemModel } from '@/lib/models';
import { requireAdmin } from '@/lib/auth-utils';

// GET /api/admin/menu-items/[id]
export const GET = requireAdmin(async (req, { params }) => {
  try {
    const menuItem = await MenuItemModel.findById(params.id);
    if (!menuItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }
    return NextResponse.json(menuItem);
  } catch (error) {
    console.error(`Error fetching menu item ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch menu item' }, { status: 500 });
  }
});

// PUT /api/admin/menu-items/[id]
export const PUT = requireAdmin(async (req, { params }) => {
  try {
    const id = params.id;
    const body = await req.json();
    const menuItem = await MenuItemModel.findById(id);
    if (!menuItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }
    const updatedMenuItem = await MenuItemModel.update(id, body);
    return NextResponse.json(updatedMenuItem);
  } catch (error) {
    console.error(`Error updating menu item ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 });
  }
});

// DELETE /api/admin/menu-items/[id]
export const DELETE = requireAdmin(async (req, { params }) => {
  try {
    const id = params.id;
    const menuItem = await MenuItemModel.findById(id);
    if (!menuItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }
    await MenuItemModel.delete(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(`Error deleting menu item ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
  }
});
