import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Artwork from '@/models/artworks';
import { uploadFileToDrive } from '@/utils/googleDrive';

// Ensure database connection
async function ensureDbConnection() {
    await dbConnect();
}

ensureDbConnection();

/**
 * Handle GET request: Fetch all artworks.
 */
export async function GET() {
    try {
        const artworks = await Artwork.find();
        return NextResponse.json(artworks, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to fetch artworks', error: error.message },
            { status: 500 }
        );
    }
}

/**
 * Handle POST request: Add a new artwork.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json(); // Parse JSON from the request body
        const { name, type, price, description, featured, image } = body;

        if (!name || !type || !price || !description || !image) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        // Convert base64 image to Buffer
        const base64Data = image.split(';base64,').pop();
        const fileBuffer = Buffer.from(base64Data, 'base64');

        // Upload image to Google Drive
        const fileUrl = await uploadFileToDrive(`${name}.jpg`, fileBuffer);

        // Save artwork details in MongoDB
        const newArtwork = new Artwork({
            name,
            type,
            price,
            description,
            featured,
            image: fileUrl,
        });

        const savedArtwork = await newArtwork.save();
        return NextResponse.json(savedArtwork, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to add artwork', error: error.message },
            { status: 500 }
        );
    }
}