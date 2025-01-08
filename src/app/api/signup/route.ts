import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserSchema from '@/models/user';
import bcrypt from 'bcrypt';
import { userMiddleware } from '@/middlewares/userMiddleware';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Cache the body once
    const body = await req.json();

    // Middleware validation with cached body
    const validationError = await userMiddleware(body);
    if (validationError) {
      return NextResponse.json(
        { message: 'Validation error', error: validationError },
        { status: 400 }
      );
    }

    const { username, name, email, password, phoneNumber, role = 'user' } = body;

    // Database connection
    await dbConnect();

    // Check for duplicate email
    const existingEmail = await UserSchema.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 }
      );
    }

    // Check for duplicate username
    const existingUsername = await UserSchema.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new UserSchema({
      username,
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // Return success response
    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup Error:', error);

    // Catch validation errors for missing or invalid fields
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { message: 'Invalid user data', error: error.message },
        { status: 400 }
      );
    }

    // General server error
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}