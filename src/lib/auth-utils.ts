import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

type Handler = (request: Request, params?: any) => Promise<NextResponse>;

export function requireAdmin(handler: Handler) {
  return async (request: Request, params?: any) => {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check if user is admin (adjust this based on your user role checking logic)
    if (session.user.role !== 'admin') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    return handler(request, params);
  };
}
