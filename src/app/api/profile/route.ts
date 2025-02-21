import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';

// Connect to the database before handling any requests
dbConnect();

/**
 * Handle GET requests to fetch user details.
 */
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    try {
        const user = await User.findOne({ email }); // Find user by email
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Failed to fetch user', error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'Failed to fetch user', error: 'Unknown error' }, { status: 500 });
    }
}

/**
 * Handle PUT requests to update user details.
 */
export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { id, ...updatedFields } = body;

    if (!id) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true, runValidators: true } // Return updated document
        );

        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Return a response after updating the user
        return NextResponse.json({ message: 'User updated successfully', user: updatedUser }, { status: 200 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Failed to update user', error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'Failed to update user', error: 'Unknown error' }, { status: 500 });
    }
}

/**
 * Handle DELETE requests to delete a user.
 */
export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const { id } = body;

    if (!id) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // ✅ Return a response after deleting the user
        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Failed to delete user', error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'Failed to delete user', error: 'Unknown error' }, { status: 500 });
    }
}