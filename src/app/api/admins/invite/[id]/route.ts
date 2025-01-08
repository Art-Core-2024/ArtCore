import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import PendingInvite from '@/models/pendingInvite';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params; // Extract ID from the dynamic route

        if (!id) {
            return NextResponse.json({ error: 'Invite ID is required.' }, { status: 400 });
        }

        await dbConnect();

        // Find and delete the invite
        const deletedInvite = await PendingInvite.findByIdAndDelete(id);
        if (!deletedInvite) {
            return NextResponse.json({ error: 'Invite not found.' }, { status: 404 });
        }

        return NextResponse.json(
            { message: 'Invite canceled successfully.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting invite:', error);
        return NextResponse.json(
            { error: 'Failed to cancel invite.' },
            { status: 500 }
        );
    }
}

// OPTIONS (Optional, for CORS preflight requests)
export function OPTIONS() {
    return NextResponse.json(
        { message: 'Allowed methods: DELETE' },
        { status: 200 }
    );
}