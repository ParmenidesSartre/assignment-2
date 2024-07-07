import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  // Uncomment the following lines if authentication and role checking are required
  // if (!auth(req, res)) return;

  // if (!role(['admin', 'doctor'])(req, res)) return;

  try {
    // Fetch patients
    const patients = await prisma.user.findMany({
      where: { role: 'Patient' },
    });
    return NextResponse.json(patients);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
