import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET_KEY || "asdafagajgpaijgpa2^%@#%"


export interface AuthenticatedRequest extends Request {
    userId?: string;
}

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ success: false, message: 'Unauthorized. Missing token.' });
            return;
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET) as {userId: string};

        req.userId = decoded.userId;

        next()
    } catch (error) {
        res.status(401).json({ success: false, message: 'Unauthorized. Invalid or expired token.' });
    }
};