import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserSchema from '@/models/user';
import bcrypt from 'bcrypt';
import { userMiddleware } from '@/middlewares/userMiddleware';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Incoming request body:', body); // Debug log

    const validationError = await userMiddleware(body);
    if (validationError) {
      console.error('Validation error:', validationError); // Debug log
      return NextResponse.json(
        { message: validationError.message, errors: validationError.errors },
        { status: 400 }
      );
    }

    const { username, name, email, phoneNumber, password, role = 'user' } = body;

    await dbConnect();

    const existingEmail = await UserSchema.findOne({ email });
    console.log('Existing email check:', existingEmail); // Debug log
    if (existingEmail) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 }
      );
    }

    const existingUsername = await UserSchema.findOne({ username });
    console.log('Existing username check:', existingUsername); // Debug log
    if (existingUsername) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserSchema({
      username,
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup Error:', error); // Debug log

    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { message: 'Invalid user data', error: error.message },
        { status: 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { message: 'Internal Server Error', error: errorMessage },
      { status: 500 }
    );
  }
};