import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Artwork from '@/models/artworks';
import { deleteFileFromDrive } from '@/utils/googleDrive';

interface Context {
    params: Promise<{
        id: string;
    }>;
}

// Ensure database connection
dbConnect();

/**
 * Handle PUT request: Update artwork details by ID.
 */
export async function PUT(req: NextRequest, context: Context) {
    try {
        const { id } = await context.params; // Extract ID from the dynamic route
        const { name, type, price, description, featured, image } = await req.json();

        await dbConnect();

        const artwork = await Artwork.findById(id);
        if (!artwork) {
            return NextResponse.json({ message: 'Artwork not found' }, { status: 404 });
        }

        artwork.name = name;
        artwork.type = type;
        artwork.price = price;
        artwork.description = description;
        artwork.featured = featured;
        artwork.image = image;

        await artwork.save();

        return NextResponse.json({ message: 'Artwork updated successfully', artwork }, { status: 200 });
    } catch (error) {
        const errorMessage = (error as Error).message;
        return NextResponse.json({ message: 'Failed to update artwork', error: errorMessage }, { status: 500 });
    }
}

/**
 * Handle DELETE request: Delete artwork by ID.
 */
export async function DELETE(req: NextRequest, context: Context) {
    try {
        const { id } = await context.params; // Extract ID from the dynamic route

        if (!id) {
            return NextResponse.json({ error: 'Artwork ID is required.' }, { status: 400 });
        }

        await dbConnect();

        // Find the artwork by ID
        const artwork = await Artwork.findById(id);

        if (!artwork) {
            return NextResponse.json({ error: 'Artwork not found.' }, { status: 404 });
        }

        // Delete the associated file from the drive
        const fileId = artwork.image.split('id=')[1]; // Extract file ID from the URL
        if (fileId) {
            await deleteFileFromDrive(fileId);
        }

        // Delete the artwork from MongoDB
        await artwork.deleteOne();
        return NextResponse.json({ message: 'Artwork deleted successfully' }, { status: 200 });
    } catch (error) {
        const errorMessage = (error as Error).message;
        return NextResponse.json({ message: 'Failed to delete artwork', error: errorMessage }, { status: 500 });
    }
}