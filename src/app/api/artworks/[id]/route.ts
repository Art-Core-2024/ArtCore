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
        const { id } = await context.params;
        if (!id) {
            return NextResponse.json({ message: 'Artwork ID is required.' }, { status: 400 });
        }

        const body = await req.json();

        // Log the incoming payload for debugging
        console.log('Incoming Payload:', body);

        const { name, type, price, description, featured, minOrderQuantity } = body;

        // Check if all required fields are present
        if (!name || !type || !price || !description || minOrderQuantity === undefined) {
            console.error('Validation Failed: Missing required fields.');
            return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
        }

        await dbConnect();

        // Log before querying the database
        console.log('Looking for Artwork with ID:', id);

        const artwork = await Artwork.findById(id);
        if (!artwork) {
            console.error('Artwork Not Found:', id);
            return NextResponse.json({ message: 'Artwork not found.' }, { status: 404 });
        }

        // Update artwork
        artwork.name = name;
        artwork.type = type;
        artwork.price = price;
        artwork.description = description;
        artwork.featured = featured;
        artwork.minOrderQuantity = minOrderQuantity;

        // Log before saving the document
        console.log('Updating Artwork:', artwork);

        await artwork.save();

        return NextResponse.json({ message: 'Artwork updated successfully', artwork }, { status: 200 });
    } catch (error) {
        console.error('Error in PUT /api/artworks/[id]:', error);
        return NextResponse.json({ message: 'Failed to update artwork.', error: (error as Error).message }, { status: 500 });
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