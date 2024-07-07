import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const {
      patientId,
      doctorId,
      diagnosis,
      treatmentPlan,
      medications,
      followUp,
      notes,
      allergies,
    } = await req.json();

    // Parse patientId and doctorId to integers
    const parsedPatientId = parseInt(patientId, 10);
    const parsedDoctorId = parseInt(doctorId, 10);

    const newRecord = await prisma.medicalRecord.create({
      data: {
        patientId: parsedPatientId,
        doctorId: parsedDoctorId,
        diagnosis,
        treatmentPlan,
        medications,
        followUp: followUp ? new Date(followUp) : null,
        notes,
        allergies,
      },
    });

    return NextResponse.json(newRecord);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
