import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Artwork from '@/models/artworks';
import { uploadFileToDrive } from '@/utils/googleDrive';

/**
 * Handle GET request: Fetch all artworks.
 */
export async function GET() {
    try {
        await dbConnect(); // Ensure database connection

        const artworks = await Artwork.find();
        return NextResponse.json(artworks, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error('GET /api/artworks error:', error.stack);
        } else {
            console.error('GET /api/artworks error:', error);
        }
        return NextResponse.json(
            { message: 'Failed to fetch artworks', error: (error as Error).message },
            { status: 500 }
        );
    }
}

/**
 * Handle POST request: Add a new artwork.
 */
export async function POST(req: Request) {
    try {
        await dbConnect(); // Ensure database connection

        const body = await req.json(); // Parse JSON from the request body
        const { name, type, price, description, featured, image } = body;

        // Validate required fields
        if (!name || !type || !price || !description || !image) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        // Validate base64 image format
        const base64Pattern = /^data:image\/(png|jpeg|jpg);base64,/;
        if (!base64Pattern.test(image)) {
            return NextResponse.json({ message: 'Invalid image format' }, { status: 400 });
        }

        // Convert base64 image to Buffer
        const base64Data = image.split(';base64,').pop();
        const fileBuffer = Buffer.from(base64Data!, 'base64'); // `!` ensures non-null

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
        if (error instanceof Error) {
            console.error('POST /api/artworks error:', error.stack);
            return NextResponse.json(
                { message: 'Failed to add artwork', error: error.message },
                { status: 500 }
            );
        } else {
            console.error('POST /api/artworks error:', error);
            return NextResponse.json(
                { message: 'Failed to add artwork', error: String(error) },
                { status: 500 }
            );
        }
        { status: 500 }
    }
}