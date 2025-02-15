import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).send({ error: 'Access denied. No token provided.' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET!, (err, userInfo) => {
            if (err) {
                return res.status(StatusCodes.UNAUTHORIZED).send({ error: 'Invalid token.' });
            }
            req.body.userId = userInfo;
            next();
        });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send({ error: 'Invalid token.' });
    }
};

export default authenticationMiddleware;