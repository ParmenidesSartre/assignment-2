import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function PUT(req) {
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

    const {
      id,
      date,
      doctorId,
      patientId,
      diagnosis,
      treatmentPlan,
      medications,
      followUp,
      notes,
      allergies
    } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Appointment ID is required.' }, { status: 400 });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: {
        ...(date && { date: new Date(date) }),
        ...(doctorId && { doctorId: parseInt(doctorId) }),
        ...(patientId && { patientId: parseInt(patientId) }),
        ...(diagnosis && { diagnosis }),
        ...(treatmentPlan && { treatmentPlan }),
        ...(medications && { medications }),
        ...(followUp && { followUp: new Date(followUp) }),
        ...(notes && { notes }),
        ...(allergies && { allergies }),
      },
    });

    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
