import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/orders';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { status } = await req.json();

    if (!status || !['Pending', 'Processing', 'Delivered'].includes(status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    await dbConnect();

    try {
        const order = await Order.findByIdAndUpdate(
            params.id,
            { status },
            { new: true }
        );
        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
    }
};