import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import PendingInvite from '@/models/pendingInvite';

interface Context {
    params: Promise<{
        id: string;
    }>;
}

export async function DELETE(req: NextRequest, context: Context) {
    try {
        const { id } = await context.params; // Extract ID from the dynamic route

        if (!id) {
            return NextResponse.json({ error: 'Invite ID is required.' }, { status: 400 });
        }

        await dbConnect();

        // Find and delete the invite
        const invite = await PendingInvite.findByIdAndDelete(id);

        if (!invite) {
            return NextResponse.json({ error: 'Invite not found.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Invite deleted successfully.' }, { status: 200 });
    } catch {
        return NextResponse.json({ error: 'An error occurred while deleting the invite.' }, { status: 500 });
    }
}