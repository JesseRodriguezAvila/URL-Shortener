import { Response, Request, NextFunction } from 'express';
import { HttpSuccessResponse } from '../types/response.type';

export const homeHandler = (req: Request, res: Response<HttpSuccessResponse>, next: NextFunction) => {
    return res.status(200).json({
        success: true,
        status_code: 200,
        status_message: `Welcome to Url Shortener Api`
    });
};