import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/admin';

// Delete an admin by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();

        // Find and delete the admin by ID
        const admin = await Admin.findByIdAndDelete(params.id);

        if (!admin) {
            return NextResponse.json(
                { error: 'Admin not found.' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Admin deleted successfully.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting admin:', error);
        return NextResponse.json(
            { error: 'Failed to delete admin.' },
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