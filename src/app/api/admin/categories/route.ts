import { NextResponse } from 'next/server';
import { CategoryModel } from '@/lib/models';
import { requireAdmin } from '@/lib/auth-utils';
import { auth } from '@/lib/auth';

// GET /api/admin/categories
export const GET = requireAdmin(async () => {
  try {
    const categories = await CategoryModel.findAll();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
});

// POST /api/admin/categories
export const POST = requireAdmin(async (request: Request) => {
  try {
    const session = await auth();
    const data = await request.json();
    const newCategory = await CategoryModel.create({
      ...data,
      created_by: session!.user!.id,
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
});
