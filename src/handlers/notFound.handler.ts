
import { Response, Request, NextFunction } from 'express';
import ExpressError from '../utils/ExpressError';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(new ExpressError(404, 'Route not found'));
};