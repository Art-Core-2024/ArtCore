import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/orders';

export const dynamic = 'force-dynamic';

export async function GET() {
    await dbConnect();

    try {
        const orders = await Order.find().populate('userId', 'name email');
        return NextResponse.json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
};