import { NextResponse } from 'next/server';
import { MenuItemModel } from '@/lib/models';

export async function GET() {
  try {
    const menuItems = await MenuItemModel.findAll();
    console.log('Fetched menu items:', menuItems);
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic'; // Ensure dynamic fetching
