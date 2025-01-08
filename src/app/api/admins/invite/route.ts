import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/dbConnect';
import PendingInvite from '@/models/pendingInvite';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
        }

        await dbConnect();

        // Check if invite already exists
        const existingInvite = await PendingInvite.findOne({ email });
        if (existingInvite) {
            return NextResponse.json(
                { error: 'An invitation has already been sent to this email.' },
                { status: 400 }
            );
        }

        // Save invite to database
        await PendingInvite.create({ email });

        // Send invitation email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.NEXT_PUBLIC_GMAIL_USER,
                pass: process.env.NEXT_PUBLIC_GMAIL_PASS,
            },
        });

        const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/register-admin?email=${encodeURIComponent(
            email
        )}`;

        await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_GMAIL_USER,
            to: email,
            subject: 'Admin Invitation',
            text: `You have been invited to become an admin. Click the link to register: ${inviteLink}`,
        });

        return NextResponse.json(
            { message: 'Invitation sent successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending invite:', error);
        return NextResponse.json(
            { error: 'Failed to send invitation.' },
            { status: 500 }
        );
    }
}

// OPTIONS (Optional, for CORS preflight requests)
export function OPTIONS() {
    return NextResponse.json(
        { message: 'Allowed methods: POST' },
        { status: 200 }
    );
}