import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/admin';

interface Context {
    params: Promise<{
        id: string;
    }>;
}

// Delete an admin by ID
export async function DELETE(req: Request, context: Context) {
    try {
        await dbConnect();

        // Ensure params.id is correctly extracted and used
        const { id } = await context.params;
        const admin = await Admin.findByIdAndDelete(id);

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
    } catch {
        return NextResponse.json(
            { error: 'An error occurred while deleting the admin.' },
            { status: 500 }
        );
    }
}