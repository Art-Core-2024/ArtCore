import { google } from 'googleapis';
import { Readable } from 'stream';

// Google Drive Folder ID where images will be uploaded
const FOLDER_ID = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID;

if (!FOLDER_ID) {
    throw new Error('Please define the NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID in your .env.local file');
}

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// Decode the Base64 string and parse it into a service account key object
const serviceAccountKey = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_KEY
    ? JSON.parse(Buffer.from(process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_KEY, 'base64').toString('utf-8'))
    : null;

if (!serviceAccountKey) {
    throw new Error('Please define the SERVICE_ACCOUNT_KEY in your .env.local file');
}

// Authenticate Google API client
const auth = new google.auth.GoogleAuth({
    credentials: serviceAccountKey,
    scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

/**
 * Uploads a file to Google Drive
 * @param fileName - The name of the file
 * @param fileBuffer - The file's binary data
 * @returns The public URL of the uploaded file
 */
export async function uploadFileToDrive(fileName: string, fileBuffer: Buffer): Promise<string> {
    const fileMetadata = {
        name: fileName,
        parents: [FOLDER_ID],
    };

    const media = {
        mimeType: 'image/jpeg', // Change this if your images are in other formats
        body: Readable.from(fileBuffer),
    };

    const response = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id',
    });

    const fileId = response.data.id;

    // Make the file publicly accessible
    await drive.permissions.create({
        fileId,
        requestBody: {
            role: 'reader',
            type: 'anyone',
        },
    });

    // Get the public URL of the uploaded file
    const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
    return fileUrl;
}

/**
 * Deletes a file from Google Drive by its file ID.
 * @param fileId - The ID of the file to delete.
 */
export async function deleteFileFromDrive(fileId: string): Promise<void> {
    try {
        await drive.files.delete({ fileId });
    } catch (error) {
        console.error(`Failed to delete file: ${fileId}`, error);
        throw new Error('Failed to delete file from Google Drive.');
    }
}