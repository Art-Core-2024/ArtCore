import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/orders';

interface Context {
    params: Promise<{
        id: string;
    }>;
}

export async function PUT(req: Request, context: Context) {
    const { id } = await context.params; // Extract ID from the dynamic route
    const { status } = await req.json();

    if (!status || !['Pending', 'Processing', 'Delivered'].includes(status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    await dbConnect();

    try {
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Order updated successfully', order }, { status: 200 });
    } catch (error) {
        const errorMessage = (error as Error).message;
        return NextResponse.json({ message: 'Failed to update order', error: errorMessage }, { status: 500 });
    }
}