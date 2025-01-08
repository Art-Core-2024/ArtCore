import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!,
});

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { artworkId, quantity, email, address, amount } = await req.json();

        if (!artworkId || !quantity || !address || !email || !amount) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create Razorpay order
        const paymentOrder = await razorpay.orders.create({
            amount, // Amount passed from frontend (in paise)
            currency: 'INR',
            receipt: `receipt_${artworkId}`,
        });

        return NextResponse.json({
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Send Razorpay Key ID to frontend
            orderId: paymentOrder.id,
            amount: paymentOrder.amount,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
    }
}