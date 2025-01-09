import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/admin';
import PendingInvite from '@/models/pendingInvite';

// POST /api/admins/register
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, password, confirmPassword } = body;

        // Validate request body
        if (!name || !email || !phone || !password || !confirmPassword) {
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            );
        }

        if (password !== confirmPassword) {
            return NextResponse.json(
                { error: 'Passwords do not match.' },
                { status: 400 }
            );
        }

        // Connect to the database
        await dbConnect();

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return NextResponse.json(
                { error: 'Admin with this email already exists.' },
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const newAdmin = new Admin({
            name,
            email,
            phone,
            password: hashedPassword,
        });

        await newAdmin.save();

        // Remove the corresponding pending invite
        const deletedInvite = await PendingInvite.findOneAndDelete({ email });
        if (!deletedInvite) {
            console.warn(`No pending invite found for email: ${email}`);
        }

        return NextResponse.json(
            { message: 'Admin registered successfully!' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error registering admin:', error);
        return NextResponse.json(
            { error: 'Failed to register admin.' },
            { status: 500 }
        );
    }
}