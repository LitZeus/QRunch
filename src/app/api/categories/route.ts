import { NextResponse } from 'next/server';
import { CategoryModel } from '@/lib/models';

export async function GET() {
  try {
    const categories = await CategoryModel.findAll();
    console.log('Fetched categories:', categories);
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic'; // Ensure dynamic fetching
