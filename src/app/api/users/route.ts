import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserSchema from '@/models/user';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();
        const users = await UserSchema.find({}, '-password'); // Exclude password for security
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error('Fetch Users Error:', error);
        return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        await dbConnect();

        const user = await UserSchema.findByIdAndDelete(id);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Delete User Error:', error);
        return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
    }
}