import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NEXT_PUBLIC_GMAIL_USER, // Gmail address
                pass: process.env.NEXT_PUBLIC_GMAIL_PASS, // Gmail App Password
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.NEXT_PUBLIC_GMAIL_USER,
            subject: `Contact Form: ${subject}`,
            text: `You have a new message from ${name} (${email}):\n\n${message}`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email.' },
            { status: 500 }
        );
    }
}