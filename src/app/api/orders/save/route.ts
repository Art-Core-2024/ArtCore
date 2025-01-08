import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/orders';
import User from '@/models/user';
import nodemailer from 'nodemailer';

async function sendOrderEmail(userEmail: string, adminEmail: string, orderDetails: any) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NEXT_PUBLIC_GMAIL_USER,
            pass: process.env.NEXT_PUBLIC_GMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.NEXT_PUBLIC_GMAIL_USER,
        to: [userEmail, adminEmail], // Send to both user and admin
        subject: `Order Confirmation - ${orderDetails._id}`,
        text: `
        Hello,

        Here are the details of your order:

        Order ID: ${orderDetails._id}
        Artwork ID: ${orderDetails.artworkId}
        Quantity: ${orderDetails.quantity}
        Total Amount: ₹${orderDetails.amount / 100}
        Address: ${orderDetails.address}
        Payment ID: ${orderDetails.paymentId}
        Status: ${orderDetails.status}

        Thank you for shopping with us!

        Regards,
        Art Core
        `,
    };

    await transporter.sendMail(mailOptions);
}

export async function POST(req: Request) {
    const { paymentId, address, artworkId, quantity, email, status, amount } = await req.json();

    if (!paymentId || !artworkId || !email || (!address && !quantity)) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const newOrder = await Order.create({
            userId: user._id,
            artworkId,
            quantity,
            address,
            paymentId,
            status,
            amount
        });

        await sendOrderEmail(user.email, process.env.NEXT_PUBLIC_GMAIL_USER!, newOrder);

        return NextResponse.json({ message: 'Order saved successfully', order: newOrder });
    } catch (error) {
        console.error('Error saving order:', error);
        return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
    }
}