import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json(
                { message: 'Token is required' },
                { status: 400 }
            );
        }

        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

        return NextResponse.json(
            { message: 'Token is valid', role: decoded.role },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Invalid or expired token' },
            { status: 401 }
        );
    }
}