import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(req) {
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

    const { date, doctorId } = await req.json();

    if (!date ||  !doctorId) {
      return NextResponse.json({ error: 'All required fields must be provided.' }, { status: 400 });
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        patient: {
          connect: { id: userId },
        },
        doctor: {
          connect: { id: doctorId },
        }
      },
    });

    return NextResponse.json(newAppointment, { status: 201 });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
