import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/admin';

const adminAuth = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role === 'super-admin') {
            if (
                decoded.email === process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL
            ) {
                return next();
            }
        } else if (decoded.role === 'admin') {
            await dbConnect();
            const admin = await Admin.findOne({ email: decoded.email });
            if (admin) {
                return next();
            }
        }

        return res.status(403).json({ message: 'Forbidden: Invalid role or credentials' });
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

export default adminAuth;