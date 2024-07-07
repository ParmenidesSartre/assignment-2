import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const { id, patientId, doctorId, diagnosis, treatmentPlan, medications } = await req.json();

    const updatedRecord = await prisma.medicalRecord.update({
      where: { id },
      data: {
        patientId,
        doctorId,
        diagnosis,
        treatmentPlan,
        medications,
      },
    });

    return NextResponse.json(updatedRecord);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}