import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    const userId = decoded.id;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');

    if (!role) {
      return NextResponse.json({ error: 'Role is required.' }, { status: 400 });
    }

    let whereClause = {};

    if (role === 'doctor') {
      whereClause = {
        doctorId: parseInt(userId),
      };
    } else if (role === 'patient') {
      whereClause = {
        patientId: parseInt(userId),
      };
    } else {
      return NextResponse.json({ error: 'Invalid user role.' }, { status: 400 });
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        patient: true,
        doctor: true,
      },
    });

    return NextResponse.json(appointments, { status: 200 });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
