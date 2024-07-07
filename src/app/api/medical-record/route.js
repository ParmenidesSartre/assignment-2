import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const medicalRecords = await prisma.medicalRecord.findMany({
    include: {
      patient: true,
      doctor: true,
    },
  });

  return NextResponse.json(medicalRecords);
}
