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
      name,
      email,
      dateOfBirth,
      phoneNumber,
      address,
      city,
      state,
      postalCode,
      emergencyContactName,
      emergencyContactPhone,
    } = await req.json();

    // Ensure dateOfBirth is a valid ISO-8601 string or null
    let formattedDateOfBirth = null;
    if (dateOfBirth) {
      const parsedDate = new Date(dateOfBirth);
      if (!isNaN(parsedDate)) {
        formattedDateOfBirth = parsedDate.toISOString();
      } else {
        return NextResponse.json({ error: 'Invalid dateOfBirth format.' }, { status: 400 });
      }
    }

    const updateData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(formattedDateOfBirth && { dateOfBirth: formattedDateOfBirth }),
      ...(phoneNumber && { phoneNumber }),
      ...(address && { address }),
      ...(city && { city }),
      ...(state && { state }),
      ...(postalCode && { postalCode }),
      ...(emergencyContactName && { emergencyContactName }),
      ...(emergencyContactPhone && { emergencyContactPhone }),
    };

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid fields provided for update.' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: updateData,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error updating user:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
