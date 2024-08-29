import { Request, Response, NextFunction } from 'express';
import { HttpSuccessResponse } from '../types/response.type';
import Url from '../models/Url.model';
import ExpressError from '../utils/ExpressError';

export const createShortUrl = async (req: Request, res: Response<HttpSuccessResponse>, next: NextFunction) => {
    try {
        // Simple validation
        const url: string | undefined = req.body.url;
        if (!url) return next(new ExpressError(404, 'Missing body url'));

        // Get url document from mongodb
        const new_url = await Url.findOneByOriginalUrlOrCreate(url);

        return res.status(201).json({
            success: true,
            status_code: 201,
            status_message: 'Shortened url',
            data: {
                shortUrl: `${new_url.fullShortPath}`
            }
        });
    } catch(err) {
        next(err);
    }
}; 

export const redirectToTrueUrl = async (req: Request, res: Response, next: NextFunction) => {
    const { shortPath } = req.params;
    try {
        const url_document = await Url.findOneByShortPath(shortPath);
        if (!url_document) return next(new ExpressError(404, "Not_found: Url not in database"));
        return res.redirect(url_document.original_url);
    } catch(err) {
        next(err);
    }
};