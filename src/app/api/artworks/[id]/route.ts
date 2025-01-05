import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Artwork from '@/models/artworks';
import { deleteFileFromDrive } from '@/utils/googleDrive';

// Ensure database connection
dbConnect();

/**
 * Handle PUT request: Update artwork details by ID.
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const { name, type, price, description, featured, image } = await req.json();

        const artwork = await Artwork.findById(id);
        if (!artwork) {
            return NextResponse.json({ message: 'Artwork not found' }, { status: 404 });
        }

        // If a new image is provided, delete the old one
        if (image && artwork.image) {
            const oldFileId = artwork.image.split('id=')[1]; // Extract file ID from the URL
            await deleteFileFromDrive(oldFileId);
        }

        // Update artwork details
        artwork.name = name ?? artwork.name;
        artwork.type = type ?? artwork.type;
        artwork.price = price ?? artwork.price;
        artwork.description = description ?? artwork.description;
        artwork.featured = featured ?? artwork.featured;
        if (image) {
            artwork.image = image;
        }

        const updatedArtwork = await artwork.save();
        return NextResponse.json(updatedArtwork, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update artwork', error: error.message }, { status: 500 });
    }
}

/**
 * Handle DELETE request: Delete artwork by ID.
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        const artwork = await Artwork.findById(id);
        if (!artwork) {
            return NextResponse.json({ message: 'Artwork not found' }, { status: 404 });
        }

        // Delete the image from Google Drive
        if (artwork.image) {
            const fileId = artwork.image.split('id=')[1]; // Extract file ID from the URL
            await deleteFileFromDrive(fileId);
        }

        // Delete the artwork from MongoDB
        await artwork.deleteOne();
        return NextResponse.json({ message: 'Artwork deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete artwork', error: error.message }, { status: 500 });
    }
}