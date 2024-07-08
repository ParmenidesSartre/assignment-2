import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const authenticateUser = async (email, password) => {
  try {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { user, token };

  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error during authentication:', error.message);

    // Customize error messages for different error types
    if (error.message === 'Invalid email or password') {
      throw new Error(error.message);
    } else {
      throw new Error('An error occurred during authentication. Please try again later.');
    }
  }
};

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const { user,  token } = await authenticateUser(email, password);
    return NextResponse.json({ user, token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
