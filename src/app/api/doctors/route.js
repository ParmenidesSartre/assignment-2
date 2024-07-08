import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const doctors = await prisma.user.findMany({
      where: { role: 'Doctor' },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(doctors);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
