import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/dbConnect';
import UserSchema from '@/models/user';

export async function POST(req: NextRequest) {
    try {
        const { email, password, role } = await req.json();
        await dbConnect();

        const user = await UserSchema.findOne({ email, role });
        if (!user) {
            return NextResponse.json({ message: 'Invalid email or role' }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
        }

        return NextResponse.json(
            {
                message: 'Login successful',
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 200 }
        );

        
    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}