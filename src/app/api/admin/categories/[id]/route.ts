import { NextResponse } from 'next/server';
import { CategoryModel } from '@/lib/models';
import { requireAdmin } from '@/lib/auth-utils';

// GET /api/admin/categories/[id]
export const GET = requireAdmin(async (req, { params }) => {
  try {
    const category = await CategoryModel.findById(params.id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error) {
    console.error(`Error fetching category ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
});

// PUT /api/admin/categories/[id]
export const PUT = requireAdmin(async (req, { params }) => {
  try {
    const id = params.id;
    const body = await req.json();
    const category = await CategoryModel.findById(id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    const updatedCategory = await CategoryModel.update(id, body);
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error(`Error updating category ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
});

// DELETE /api/admin/categories/[id]
export const DELETE = requireAdmin(async (req, { params }) => {
  try {
    const id = params.id;
    const category = await CategoryModel.findById(id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    await CategoryModel.delete(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(`Error deleting category ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
});
