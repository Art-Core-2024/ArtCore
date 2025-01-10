import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/admin';
import { NextRequest, NextResponse } from 'next/server';

const adminAuth = async (req: NextRequest) => {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload & { role: string, email: string };

        if (decoded.role === 'super-admin') {
            if (
                decoded.email === process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL
            ) {
                return NextResponse.next();
            }
        } else if (decoded.role === 'admin') {
            await dbConnect();
            const admin = await Admin.findOne({ email: decoded.email });
            if (admin) {
                return NextResponse.next();
            }
        }

        return NextResponse.json({ message: 'Forbidden: Invalid role or credentials' }, { status: 403 });
    } catch {
        return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }
};

export default adminAuth;