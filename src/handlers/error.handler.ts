
import { Response, Request, NextFunction } from 'express';
import { HttpErrorResponse } from '../types/response.type';
import ExpressError from '../utils/ExpressError';

export const errorHandler = (error: Error, req: Request, res: Response<HttpErrorResponse>, next: NextFunction) => {
    const status_code : number = (error instanceof ExpressError) ? error.status : 500;
    const status_message : string = error.message || 'SERVER_ERROR'
    const stack = error.stack;
    return res.status(200).json({
        success: false,
        status_code,
        status_message,
        stack,
    });
};