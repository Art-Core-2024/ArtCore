import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';
import Admin from '@/models/admin';

export async function POST(req: NextRequest) {
    try {
        const { email, password, role } = await req.json();

        await dbConnect();

        if (role === 'super-admin') {
            // Validate super-admin credentials from .env
            if (
                email === process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL &&
                password === process.env.NEXT_PUBLIC_SUPER_ADMIN_PASSWORD
            ) {
                const token = jwt.sign(
                    { email, role: 'super-admin' },
                    process.env.NEXT_PUBLIC_JWT_SECRET,
                    { expiresIn: '1h' }
                );

                return NextResponse.json(
                    {
                        message: 'Login successful',
                        user: { email, role: 'super-admin' },
                        token,
                    },
                    { status: 200 }
                );
            } else {
                return NextResponse.json(
                    { message: 'Invalid super-admin credentials' },
                    { status: 401 }
                );
            }
        }

        if (role === 'admin') {
            // Admin login logic
            const admin = await Admin.findOne({ email });
            if (!admin) {
                return NextResponse.json(
                    { message: 'Admin not found' },
                    { status: 401 }
                );
            }

            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                return NextResponse.json(
                    { message: 'Invalid password' },
                    { status: 401 }
                );
            }

            const token = jwt.sign(
                { email: admin.email, role: 'admin' },
                process.env.NEXT_PUBLIC_JWT_SECRET,
                { expiresIn: '1h' }
            );

            return NextResponse.json(
                {
                    message: 'Login successful',
                    user: {
                        name: admin.name,
                        email: admin.email,
                        role: 'admin',
                    },
                    token,
                },
                { status: 200 }
            );
        }

        // Keep user login logic as it was
        const user = await User.findOne({ email, role });
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
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
};