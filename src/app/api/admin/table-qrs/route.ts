import { NextResponse } from 'next/server';
import { TableQRModel } from '@/lib/models';
import { requireAdmin } from '@/lib/auth';

// GET /api/admin/table-qrs
export async function GET() {
  try {
    const tableQRs = await TableQRModel.findAll();
    return NextResponse.json(tableQRs);
  } catch (error) {
    console.error('Error fetching table QRs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch table QRs' },
      { status: 500 }
    );
  }
}

// POST /api/admin/table-qrs
export const POST = requireAdmin(async (request: Request) => {
  try {
    const data = await request.json();
    // Generate QR code URL (you might want to implement this)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      `${process.env.NEXTAUTH_URL}/menu?table=${data.table_number}`
    )}`;
    
    const newTableQR = await TableQRModel.create({
      ...data,
      qr_code_url: qrCodeUrl,
      is_active: true
    });
    
    return NextResponse.json(newTableQR, { status: 201 });
  } catch (error) {
    console.error('Error creating table QR:', error);
    return NextResponse.json(
      { error: 'Failed to create table QR' },
      { status: 500 }
    );
  }
});
