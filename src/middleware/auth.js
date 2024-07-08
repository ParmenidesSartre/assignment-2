import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    const response = NextResponse.next();
    response.headers.set('x-user-id', decoded.id);
    return response;
  } catch (err) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/medical-record', '/api/users/:path*'],
};
